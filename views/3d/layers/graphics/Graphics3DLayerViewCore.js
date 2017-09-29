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

define(["require","exports","../../../../core/HandleRegistry","../../../../core/watchUtils","../../../../core/promiseUtils","../../../../core/Collection","../../../../tasks/support/Query","../../../../Graphic","./Graphics3DCore","./Graphics3DLabeling","./Graphics3DScaleVisibility","./Graphics3DFrustumVisibility","./Graphics3DElevationAlignment","./Graphics3DSpatialIndex","./Graphics3DVerticalScale","./Graphics3DHighlights","../support/attributeUtils"],function(i,t,e,s,n,a,r,l,h,o,u,d,p,c,g,y,f){var b=function(){function i(i){var t=this;if(this._handles=new e,this.layer=i.layer,this.owner=i.owner,this.updateClippingExtent=i.updateClippingExtent,this.updateSuspendResumeExtent=i.updateSuspendResumeExtent,this.getGraphicsInExtent=i.getGraphicsInExtent,this.graphicsCore=new h(i.elevationFeatureExpressionEnabled),i.spatialIndexRequired&&(this.spatialIndex=new c),i.frustumVisibilityEnabled){this.frustumVisibility=new d;var n=this.owner.view.basemapTerrain;this._handles.add([this.owner.view.on("resize",function(){return t.frustumVisibility.viewChange()}),this.owner.view.navigation.on("currentViewChanged",function(){return t.frustumVisibility.viewChange()}),n.on("elevation-bounds-change",function(){return t.frustumVisibility.elevationBoundsChange()})]),"local"===this.owner.view.viewingMode?this.frustumVisibility.isVisibleBelowSurface=!0:this._handles.add(s.init(n,["opacity","wireframe"],function(){return t.frustumVisibility.isVisibleBelowSurface=n.isSeeThrough()}))}i.scaleVisibilityEnabled&&(i.spatialIndexRequired?(this.scaleVisibility=new u,this._handles.add(this.layer.watch("minScale,maxScale",function(){return t.scaleVisibility.layerMinMaxScaleChangeHandler()}))):console.warn("scaleVisibility requires a spatialIndex")),i.elevationAlignmentEnabled&&(this.elevationAlignment=new p,this._handles.add(this.layer.watch("elevationInfo",function(){return t.graphicsCore.elevationInfoChange()}))),i.labelingEnabled&&(this.labeling=new o,this._handles.add(this.layer.watch("labelsVisible",function(){return t.labeling.labelVisibilityChanged()})),this._handles.add(this.layer.watch("labelingInfo",function(){return t.labeling.updateLabelingInfo()}))),i.verticalScaleEnabled&&(this.verticalScale=new g({sourceSpatialReference:this.layer.spatialReference,destSpatialReference:this.owner.view.spatialReference})),i.highlightsEnabled&&(this.highlights=new y)}return i.prototype.initialize=function(){var i=this;return this.whenSpatialIndexLoaded().then(function(){return i.deferredInitialize()})},i.prototype.whenSpatialIndexLoaded=function(){return this.spatialIndex?this.spatialIndex.whenLoaded():n.resolve()},i.prototype.deferredInitialize=function(){var i=this;this.spatialIndex&&this.spatialIndex.initialize(this.owner,this.layer,this.owner.view.spatialReference,this.graphicsCore),this.frustumVisibility&&this.frustumVisibility.initialize(this.owner);var t=this.owner.view.basemapTerrain,e=this.owner.view.elevationProvider;if(this.scaleVisibility&&this.scaleVisibility.initialize(this.owner,this.layer,this.spatialIndex,this.graphicsCore,t),this.elevationAlignment&&this.elevationAlignment.initialize(this.owner,function(t,e,s){return i._getGraphicsInExtent(t,e,s)},this.graphicsCore,e),this.labeling){var s=this.layer;this.labeling.initialize(this.owner,s,this.spatialIndex,this.graphicsCore,this.scaleVisibility)}return this.highlights&&this.highlights.initialize(this.graphicsCore),this.graphicsCore.initialize(this.owner,this.layer,this.elevationAlignment,this.scaleVisibility,this.spatialIndex,this.labeling,this.highlights,function(){i.updateSuspendResumeExtent&&i._updateSuspendResumeExtent(i.updateSuspendResumeExtent())},function(t){return i.verticalScale?i.verticalScale.adjust(t):t},t),this._handles.add([this.layer.watch("renderer",function(t){return i.graphicsCore.rendererChange(t)}),this.owner.watch("fullOpacity",function(){return i.graphicsCore.opacityChange()})]),this._handles.add(this.layer.on("graphic-update",function(t){return i.graphicsCore.graphicUpdateHandler(t)})),this.owner.view.resourceController.registerIdleFrameWorker(this,{needsUpdate:this._needsIdleUpdate,idleFrame:this._idleUpdate}),this.updateClippingExtent&&(this._handles.add(this.owner.view.watch("clippingArea",function(){return i._updateClippingExtent()})),this._updateClippingExtent()),this.labeling?this.labeling.updateLabelingInfo():void 0},i.prototype.destroy=function(){this.owner&&this.owner.view.resourceController.deregisterIdleFrameWorker(this),this._handles&&(this._handles.destroy(),this._handles=null),this.frustumVisibility&&(this.frustumVisibility.destroy(),this.frustumVisibility=null),this.scaleVisibility&&(this.scaleVisibility.destroy(),this.scaleVisibility=null),this.elevationAlignment&&(this.elevationAlignment.destroy(),this.elevationAlignment=null),this.labeling&&(this.labeling.destroy(),this.labeling=null),this.graphicsCore&&(this.graphicsCore.destroy(),this.graphicsCore=null),this.spatialIndex&&(this.spatialIndex.destroy(),this.spatialIndex=null),this.highlights&&(this.highlights.destroy(),this.highlights=null),this.layer=null,this.owner=null},i.prototype.highlight=function(i,t,e){var s=this;if(i instanceof r){var n=this.highlights.acquireSet(t,e),h=n.set,o=n.handle;return this.owner.queryObjectIds(i).then(function(i){return s.highlights.setObjectIds(h,i)}),o}if("number"==typeof i)return this.highlight([i],t,e);if(i instanceof l)return this.highlight([i],t,e);if(i instanceof a&&(i=i.toArray()),Array.isArray(i)&&i.length>0){if(i[0]instanceof l){var u=i;if(!e||!u[0].attributes||null===f.attributeLookup(u[0].attributes,e)){var d=u.map(function(i){return i.uid}),p=this.highlights.acquireSet(t,null),c=p.set,o=p.handle;return this.highlights.setUids(c,d),o}i=u.map(function(i){return f.attributeLookup(i.attributes,e)})}if("number"==typeof i[0]){var g=i,y=this.highlights.acquireSet(t,e),c=y.set,o=y.handle;return this.highlights.setObjectIds(c,g),o}}return{remove:function(){}}},i.prototype.canResume=function(){return(!this.frustumVisibility||this.frustumVisibility.canResume())&&(!this.scaleVisibility||this.scaleVisibility.canResume())},i.prototype._needsIdleUpdate=function(){return this.frustumVisibility&&this.frustumVisibility.needsIdleUpdate()?!0:this.scaleVisibility&&this.scaleVisibility.needsIdleUpdate()?!0:this.elevationAlignment&&this.elevationAlignment.needsIdleUpdate()?!0:this.graphicsCore&&this.graphicsCore.needsIdleUpdate()?!0:!1},i.prototype._idleUpdate=function(i){this.frustumVisibility&&this.frustumVisibility.idleUpdate(i),this.scaleVisibility&&this.scaleVisibility.idleUpdate(i),this.elevationAlignment&&this.elevationAlignment.idleUpdate(i),this.graphicsCore&&this.graphicsCore.idleUpdate(i)},i.prototype._updateSuspendResumeExtent=function(i){this.frustumVisibility&&this.frustumVisibility.setExtent(i),this.scaleVisibility&&this.scaleVisibility.setExtent(i)},i.prototype._updateClippingExtent=function(){var i=this.owner.view.clippingArea;this.graphicsCore.setClippingExtent(i,this.owner.view.spatialReference)&&(this.updateClippingExtent(i)||this.graphicsCore.recreateAllGraphics())},i.prototype._getGraphicsInExtent=function(i,t,e){this.getGraphicsInExtent?this.getGraphicsInExtent(i,t,e):this.spatialIndex&&this.spatialIndex.intersects(i,t,e)},i}();return b});