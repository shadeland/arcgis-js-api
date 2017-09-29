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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/accessorSupport/decorators","../../../../core/throttle","../../../../geometry/Point","../../lib/glMatrix","../earthUtils","../mathUtils","./PointOfInterest","./PropertiesPool"],function(e,t,r,a,i,n,s,c,o,u,d,l){Object.defineProperty(t,"__esModule",{value:!0});var f=function(e){function t(t){var r=e.call(this,t)||this;return r.propertiesPool=new l["default"]({location:s,renderLocation:Array},r),r.currentSurfaceAltitude=0,r.latestSurfaceAltitude=0,r.distance=0,r.renderLocation=[0,0,0],r}return r(t,e),d=t,t.prototype.initialize=function(){this.measureSurfaceAltitudeThrottle=n.throttle(this.measureSurfaceAltitude,this.altitudeEstimationInterval,this),this.handles.add(this.measureSurfaceAltitudeThrottle),this.measureSurfaceAltitude()},Object.defineProperty(t.prototype,"location",{get:function(){var e=this.propertiesPool.get("location");return this.renderCoordsHelper.fromRenderCoords(this.renderLocation,e,this.viewState.spatialReference),e},enumerable:!0,configurable:!0}),t.prototype.update=function(e){this.measureSurfaceAltitudeThrottle(),this.updateCenterOnSurface()},t.prototype.forceUpdate=function(){this.measureSurfaceAltitudeThrottle.forceUpdate(),this.updateCenterOnSurface()},t.prototype.hasPendingUpdates=function(){return this.measureSurfaceAltitudeThrottle.hasPendingUpdates()},Object.defineProperty(t.prototype,"estimatedSurfaceAltitude",{get:function(){return this.latestSurfaceAltitude},enumerable:!0,configurable:!0}),t.prototype.measureSurfaceAltitude=function(){this.latestSurfaceAltitude=this.estimateSurfaceAltitudeAtCenter(),this.updateCenterOnSurface()},t.prototype.updateCenterOnSurface=function(){var e=p,t=this.calculateSurfaceIntersection(this.currentSurfaceAltitude,e),r=this.currentSurfaceAltitude!==this.latestSurfaceAltitude;!t&&r&&(t=this.calculateSurfaceIntersection(this.latestSurfaceAltitude,e),t&&(this.currentSurfaceAltitude=this.latestSurfaceAltitude));var a=h;if(t&&this.latestSurfaceAltitudeChangesDistanceSignificantly(e,a)&&(c.vec3d.set(a,e),this.currentSurfaceAltitude=this.latestSurfaceAltitude),t){var i=c.vec3d.dist(this.viewState.camera.eye,e);i!==this._get("distance")&&this._set("distance",i)}else{var n=this.viewState.camera;c.vec3d.add(c.vec3d.scale(n.viewForward,this._get("distance"),e),n.eye)}var s=this._get("renderLocation");(s[0]!==e[0]||s[1]!==e[1]||s[2]!==e[2])&&this._set("renderLocation",c.vec3d.set(e,this.propertiesPool.get("renderLocation")))},t.prototype.calculateSurfaceIntersection=function(e,t){var r=this.viewState.camera;if(!this.renderCoordsHelper.intersectManifold(r.eye,r.viewForward,e,t))return!1;if(this.viewState.isGlobal){var a=o.earthRadius+e,i=c.vec3d.length2(r.eye),n=a*a>i,s=c.vec3d.dist(r.eye,t);if(n&&s>o.earthRadius/4){var d=a-Math.sqrt(i);return c.vec3d.add(c.vec3d.scale(r.viewForward,d,t),r.eye),!0}}else{var l=this.surface.ready&&this.surface.extent;l&&(t[0]=u.clamp(t[0],l[0],l[2]),t[1]=u.clamp(t[1],l[1],l[3]))}return!0},t.prototype.latestSurfaceAltitudeChangesDistanceSignificantly=function(e,t){if(this.latestSurfaceAltitude===this.currentSurfaceAltitude||null==e)return!1;if(this.calculateSurfaceIntersection(this.latestSurfaceAltitude,t)){var r=this.viewState.camera.eye,a=c.vec3d.dist(r,e),i=c.vec3d.dist(r,t),n=Math.abs(i-a);if(n/a>d.RELATIVE_ALTITUDE_CHANGE_THRESHOLD)return!0}return!1},t.RELATIVE_ALTITUDE_CHANGE_THRESHOLD=.05,a([i.property({constructOnly:!0})],t.prototype,"altitudeEstimationInterval",void 0),a([i.property({readOnly:!0})],t.prototype,"distance",void 0),a([i.property({constructOnly:!0})],t.prototype,"estimateSurfaceAltitudeAtCenter",void 0),a([i.property({readOnly:!0,dependsOn:["renderLocation"]})],t.prototype,"location",null),a([i.property({readOnly:!0})],t.prototype,"renderLocation",void 0),t=d=a([i.subclass("esri.views.3d.support.CenterOnSurface")],t);var d}(i.declared(d.PointOfInterest));t.CenterOnSurface=f;var p=c.vec3d.create(),h=c.vec3d.create();t["default"]=f});