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

define(["require","exports"],function(e,i){function a(e,i){return null!==e&&e>0&&8e7>e||i>1e3}var t=function(){function e(){this._scaleRangeActive=!1,this.layerScaleRangeVisibility=!0,this.layerScaleRangeVisibilityDirty=!0,this.layerScaleRangeVisibilityQuery=!1,this.scaleChangeEventHandle=null,this.layerView=null,this.layer=null,this.spatialIndex=null,this.extent=null,this.graphicsCore=null,this.basemapTerrain=null}return e.prototype.initialize=function(e,i,a,t,l){this.layerView=e,this.layer=i,this.spatialIndex=a,this.graphicsCore=t,this.basemapTerrain=l,this.updateScaleRangeActive()},e.prototype.destroy=function(){this.scaleChangeEventHandle&&(this.scaleChangeEventHandle.remove(),this.scaleChangeEventHandle=null),this.layerView=null,this.extent=null,this.spatialIndex=null,this.graphicsCore=null},e.prototype.needsIdleUpdate=function(){return this.layerView.view.basemapTerrain&&this.layerScaleRangeVisibilityDirty},e.prototype.canResume=function(){return this.layerScaleRangeVisibility},e.prototype.setExtent=function(e){this.extent=e,this.layerScaleRangeVisibilityDirty=!0},e.prototype.idleUpdate=function(e){this.layerView.view.basemapTerrain&&(e.done()||this.layerScaleRangeVisibilityDirty&&(this.updateSuspendScaleVisible(),this.layerScaleRangeVisibilityDirty=!1))},e.prototype.scaleRangeActive=function(){return this._scaleRangeActive},e.prototype.updateScaleRangeActive=function(){var e=this;if(!this.spatialIndex)return this._scaleRangeActive=!1,!1;var i=this.layer,t=!1;i.labelingInfo&&(t=t||i.labelingInfo.some(function(e){return e&&a(e.minScale,e.maxScale)})),t=t||a(i.minScale,i.maxScale);var l=this._scaleRangeActive!==t;return this._scaleRangeActive=t,t&&!this.scaleChangeEventHandle&&this.basemapTerrain?this.scaleChangeEventHandle=this.basemapTerrain.on("scale-change",function(i){return e.scaleUpdateHandler(i)}):!t&&this.scaleChangeEventHandle&&(this.scaleChangeEventHandle.remove(),this.scaleChangeEventHandle=null),l},e.prototype.updateSuspendScaleVisibleFinish=function(e){this.layerScaleRangeVisibilityQuery=!1,this.layerScaleRangeVisibility!==e&&(this.layerScaleRangeVisibility=e,this.layerView._notifySuspendedChange())},e.prototype.updateSuspendScaleVisible=function(){var e=this,i=this.layerView.view.basemapTerrain;this.extent&&i&&this._scaleRangeActive?this.layerScaleRangeVisibilityQuery||(this.layerScaleRangeVisibilityQuery=!0,i.queryVisibleScaleRange(this.extent,this.layer.minScale,this.layer.maxScale,function(i){return e.updateSuspendScaleVisibleFinish(i)})):this.updateSuspendScaleVisibleFinish(!0)},e.prototype.visibleAtScale=function(e,i,a){return null==e?!0:e>a&&(!i||i>e)},e.prototype.visibleAtLayerScale=function(e){return this.visibleAtScale(e,this.layer.minScale,this.layer.maxScale)},e.prototype.visibleAtLabelScale=function(e,i){return this.visibleAtScale(e,i.minScale,i.maxScale)},e.prototype.graphicScale=function(e,i){var a;if(i.centroid?a=i.centroid:"point"===e.geometry.type&&(a=e.geometry),a){var t=this.layerView.view.basemapTerrain,l=t?this.layerView.view.basemapTerrain.getScale(a):1;return l}return null},e.prototype.graphicVisible=function(e,i){var a=this.graphicScale(e,i);return this.visibleAtLayerScale(a)},e.prototype.updateGraphicScaleVisibility=function(e,i){if(this._scaleRangeActive){i.addedToSpatialIndex||this.spatialIndex.addGraphicToSpatialIndex(e,i);var a=this.graphicVisible(e,i);return i.setVisibilityFlag(1,a)}return!1},e.prototype.updateGraphicLabelScaleVisibility=function(e,i){if(!this._scaleRangeActive)return!1;if(!i._labelGraphics||0===i._labelGraphics.length)return!1;i.addedToSpatialIndex||this.spatialIndex.addGraphicToSpatialIndex(e,i);var a=this.graphicScale(e,i),t=this.updateLabelScaleVisibility(i,a);return t&&this.layerView.view.deconflictor.setDirty(),t},e.prototype.updateLabelScaleVisibility=function(e,i){if(!e._labelGraphics||0===e._labelGraphics.length)return!1;e._labelGraphics.length>1&&console.warn("Multiple label classes are not supported");var a=e._labelGraphics[0],t=a._labelClass;if(t&&null!=t.minScale&&null!=t.maxScale){var l=this.visibleAtLabelScale(i,t);if(e.setVisibilityFlag(1,l,1))return!0}return!1},e.prototype.scaleUpdateHandler=function(e){var i=this;if(!this.layerView.suspended&&this.spatialIndex.hasGraphics()){var a=e.extent,t=e.scale;this.spatialIndex.intersects(a,e.spatialReference,function(e,l){for(var n=i.visibleAtLayerScale(t),r=!1,s=!1,c=0;l>c;c++){var h=e[c],p=i.graphicsCore.getGraphics3DGraphicById(h);if(p){var o=p.centroid;if(o&&(a[0]>o.x||a[1]>o.y||a[2]<o.x||a[3]<o.y))continue;var y=!1;p.setVisibilityFlag(1,n)&&(y=!0),i.updateLabelScaleVisibility(p,t)&&(y=!0),y&&(s=!0,p.isDraped()&&(r=!0))}}s&&i.layerView.view.deconflictor.setDirty(),r&&i.layerView._notifyDrapedDataChange()})}this.layerScaleRangeVisibilityDirty=!0},e.prototype.layerMinMaxScaleChangeHandler=function(){var e=this.updateScaleRangeActive();e&&(this._scaleRangeActive?this.graphicsCore.updateAllGraphicsVisibility():this.graphicsCore.forEachGraphics3DGraphic(function(e){return e.setVisibilityFlag(1,void 0)})),this.layerScaleRangeVisibilityDirty=!0},e}();return t});