import {
	Math as THREE_Math,
	Sprite,
	SpriteMaterial,
} from 'three';
import TextTexture from 'three.texttexture';

import getOptimalFontSize from './getOptimalFontSize';

export default class extends Sprite {
	constructor({
		material = {},
		maxFontSize = Infinity,
		minFontSize = 0,
		redrawInterval = 1,
		textSize = 1,
		texture = {},
	} = {}) {
		super(new SpriteMaterial({
			...material,
			map: new TextTexture(texture),
		}));
		this.lastRedraw = 0;
		this.maxFontSize = maxFontSize;
		this.minFontSize = minFontSize;
		this.redrawInterval = redrawInterval;
		this.textSize = textSize;
	}

	get isTextSprite() {
		return true;
	}

	onBeforeRender(renderer, scene, camera) {
		this.redraw(renderer, camera);
	}

	updateScale() {
		this.scale
			.set(this.material.map.imageAspect, 1, 1)
			.multiplyScalar(this.textSize * this.material.map.imageHeight);
	}

	updateMatrix(...args) {
		this.updateScale();
		return super.updateMatrix(...args);
	}

	redraw(renderer, camera) {
		if (this.lastRedraw + this.redrawInterval < Date.now()) {
			if (this.redrawInterval) {
				setTimeout(() => {
					this.redrawNow(renderer, camera);
				}, 1);
			} else {
				this.redrawNow(renderer, camera);
			}
		}
	}

	redrawNow(renderer, camera) {
		this.updateScale();
		this.material.map.autoRedraw = true;
		this.material.map.fontSize = THREE_Math.clamp(
			THREE_Math.ceilPowerOfTwo(
				getOptimalFontSize(this, renderer, camera)
			),
			this.minFontSize,
			this.maxFontSize,
		);
		this.lastRedraw = Date.now();
	}

	dispose() {
		this.material.map.dispose();
		this.material.dispose();
	}
}
