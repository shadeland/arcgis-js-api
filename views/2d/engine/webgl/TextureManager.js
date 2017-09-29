// COPYRIGHT © 2017 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.5/esri/copyright.txt for details.

define(["require","exports","dojo/Deferred","../../../../core/promiseUtils","../../../3d/support/imageUtils","./SpriteMosaic","./Utils","./CIMSymbolHelper","./SDFHelper","./GlyphSource","./GlyphMosaic"],function(e,t,r,i,s,a,n,o,h,p,u){var l=[],c=function(){function e(){this._rasterizeQueue=new Map,this._spriteMosaic=new a(1024,1024,250),this._glyphSource=new p("https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/resources/fonts/{fontstack}/{range}.pbf"),this._glyphMosaic=new u(1024,1024,this._glyphSource)}return Object.defineProperty(e.prototype,"sprites",{get:function(){return this._spriteMosaic},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"glyphs",{get:function(){return this._glyphMosaic},enumerable:!0,configurable:!0}),e.prototype.processItems=function(e){var t=this;if(e.done)return!1;for(;this._spriteMosaic.hasItemsToProcess();)this._spriteMosaic.processNextItem();this._rasterizeQueue.forEach(function(r,i){if(e.done)return!1;var s=t._rasterizeJSON(i);r.resolve(s),l.push(i)});for(var r=0,i=l;r<i.length;r++){var s=i[r];this._rasterizeQueue["delete"](s)}return l.length=0,!0},e.prototype.rasterizeItem=function(e,t){return void 0===t&&(t=null),e?e.type&&"text"===e.type?this._rasterizeTextSymbol(e,t).then(function(e){return{glyphMosaicItems:e}}):this._rasterizeSpriteSymbol(e).then(function(e){return{spriteMosaicItem:e}}):i.resolve(null)},e.prototype.bindSpritePage=function(e,t,r,i){i||(i=9729),this._spriteMosaic.bind(e,i,t,r)},e.prototype.bindGlyphsPage=function(e,t,r){this._glyphMosaic.bind(e,9729,t,r)},e.prototype._rasterizeTextSymbol=function(e,t){return this._glyphMosaic.getGlyphItems(e,t)},e.prototype._rasterizeSpriteSymbol=function(e){var t=this;return!n.isFillSymbol(e)&&!n.isLineSymbol(e)||"solid"!==e.style&&"none"!==e.style?this._spriteMosaic.has(e)?i.resolve(this._spriteMosaic.getSpriteItem(e)):e.url?s.requestImage(e.url).then(function(r){return t._rasterizeResource(r).then(function(r){return t._addItemToMosaic(e,r.size,r.anchor,r.image,!n.isMarkerSymbol(e),r.sdf)})}):this._rasterizeResource(e).then(function(r){return t._addItemToMosaic(e,r.size,r.anchor,r.image,!n.isMarkerSymbol(e),r.sdf)}):i.resolve(null)},e.prototype._rasterizeResource=function(e){var t=this;if(this._rasterizeQueue.has(e))return this._rasterizeQueue.get(e).promise;var i=new r(function(){t._rasterizeQueue.has(e)&&t._rasterizeQueue["delete"](e)});if(e instanceof HTMLImageElement){this._rasterizationCanvas||(this._rasterizationCanvas=document.createElement("canvas"));var s=e;this._rasterizationCanvas.width=s.width,this._rasterizationCanvas.height=s.height;var a=this._rasterizationCanvas.getContext("2d");a.drawImage(s,0,0,s.width,s.height);for(var n=a.getImageData(0,0,s.width,s.height),o=new Uint8Array(n.data),h=void 0,p=0;p<o.length;p+=4)h=o[p+3]/255,o[p]=o[p]*h,o[p+1]=o[p+1]*h,o[p+2]=o[p+2]*h;i.resolve({size:[s.width,s.height],anchor:[0,0],image:new Uint32Array(o.buffer),sdf:!1})}else{var u=this._rasterizeJSON(e);i.resolve(u)}return i.promise},e.prototype._addItemToMosaic=function(e,t,r,i,s,a){return this._spriteMosaic.addSpriteItem(e,t,r,i,s,a)},e.prototype._rasterizeJSON=function(e){if(this._rasterizationCanvas||(this._rasterizationCanvas=document.createElement("canvas")),"simple-fill"===e.type){var t=o.SymbolHelper.rasterizeSimpleFill(this._rasterizationCanvas,e.style),r=t[0],i=t[1],s=t[2];return{size:[i,s],anchor:[0,0],image:new Uint32Array(r.buffer),sdf:!1}}if("simple-line"===e.type){var a=o.SymbolHelper.rasterizeSimpleLine(this._rasterizationCanvas,e.style),r=a[0],i=a[1],s=a[2];return{size:[i,s],anchor:[0,0],image:new Uint32Array(r.buffer),sdf:!0}}var n,p;if("simple-marker"===e.type?(n=o.CIMSymbolHelper.fromSimpleMarker(e),p=!0):(n=e,p=h.SDFHelper.checkSDF(n)),p){var u=new h.SDFHelper,l=u.buildSDF(n),r=l[0],c=l[1],f=l[2];return{size:[c,f],anchor:[0,0],image:new Uint32Array(r.buffer),sdf:!0}}var m=o.CIMSymbolHelper.rasterize(this._rasterizationCanvas,n),r=m[0],i=m[1],s=m[2],y=m[3],_=m[4];return{size:[i,s],anchor:[y,_],image:new Uint32Array(r.buffer),sdf:!1}},e}();return c});