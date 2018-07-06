!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e(require("three"),require("three.texttexture")):"function"==typeof define&&define.amd?define(["three","three.texttexture"],e):(t.THREE=t.THREE||{},t.THREE.TextSprite=e(t.THREE,t.THREE.TextTexture))}(this,function(p,s){"use strict";s=s&&s.hasOwnProperty("default")?s.default:s;var o=new p.Vector3,d=new p.Vector3,h=new p.Vector3;return function(n){function t(t){void 0===t&&(t={});var e=t.textSize;void 0===e&&(e=1);var r=t.redrawInterval;void 0===r&&(r=1);var i=t.maxFontSize;void 0===i&&(i=1/0);var a=t.material;void 0===a&&(a={});var o=t.texture;void 0===o&&(o={}),n.call(this,new p.SpriteMaterial(Object.assign({},a,{map:new s(o)}))),this.textSize=e,this.redrawInterval=r,this.maxFontSize=i,this.lastRedraw=0}n&&(t.__proto__=n),(t.prototype=Object.create(n&&n.prototype)).constructor=t;var e={isTextSprite:{configurable:!0}};return e.isTextSprite.get=function(){return!0},t.prototype.onBeforeRender=function(t,e,r){this.redraw(t,r)},t.prototype.updateScale=function(){this.scale.set(this.material.map.aspect,1,1).multiplyScalar(this.textSize*this.material.map.paddingBoxHeight)},t.prototype.updateMatrix=function(){for(var t=[],e=arguments.length;e--;)t[e]=arguments[e];return this.updateScale(),n.prototype.updateMatrix.apply(this,t)},t.prototype.redraw=function(t,e){var r=this;this.lastRedraw+this.redrawInterval<Date.now()&&(this.redrawInterval?setTimeout(function(){r.redrawNow(t,e)},1):this.redrawNow(t,e))},t.prototype.redrawNow=function(t,e){this.updateScale(),this.material.map.fontSize=Math.min(p.Math.ceilPowerOfTwo(function(t,e,r){if(e.domElement.width&&e.domElement.height&&t.material.map.lines.length){var i=t.getWorldPosition(o).distanceTo(r.getWorldPosition(d));if(i){var a=t.getWorldScale(h).y*e.domElement.height/i;if(a)return Math.round(a/t.material.map.paddingBoxHeight)}}return 0}(this,t,e)),this.maxFontSize),this.material.map.autoRedraw||this.material.map.redraw(),this.lastRedraw=Date.now()},t.prototype.dispose=function(){this.material.map.dispose(),this.material.dispose()},Object.defineProperties(t.prototype,e),t}(p.Sprite)});
