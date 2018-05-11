// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","../../../../../core/tsSupport/declareExtendsHelper","../../../../../core/tsSupport/decorateHelper","../../../../../core/tsSupport/assignHelper","dojo/has","../../../../../geometry","../../../../../core/Error","../../../../../core/Logger","../../../../../core/promiseUtils","../../../../../core/promiseUtils","../../../../../core/accessorSupport/decorators","../../../../../geometry/support/spatialReferenceUtils","../../../../../layers/graphics/data/FeatureSetReader","../../../../../layers/graphics/data/FeatureStore","../../../../../layers/support/FeatureProcessing","../../../../../tasks/operations/query","../../../../../tasks/support/QuantizationParameters","../../../../../tasks/support/Query","../../../ViewState","./BaseController","../../../tiling/TileInfoView","../../../tiling/TileQueue"],function(e,t,r,o,i,s,n,a,u,l,c,p,f,d,h,y,m,g,v,_,x,b,S){Object.defineProperty(t,"__esModule",{value:!0});var F=u.getLogger("esri.views.2d.layers.features.controllers.OnDemandController"),Q=s("esri-featurelayer-webgl"),I=s("esri-mobile"),w={maxDrillLevel:Q&&"object"==typeof Q&&null!=Q.maxDrillLevel?Q.maxDrillLevel:I?1:4,maxRecordCountFactor:Q&&"object"==typeof Q&&null!=Q.maxRecordCountFactor?Q.maxRecordCountFactor:I?1:3},O=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.type="on-demand",t._queryInfoHash=null,t._processingInMainThread=!1,t._promises=new Map,t._readers=new Map,t}return r(t,e),t.prototype.initialize=function(){var e=this;this._tileQueue=new S({tileInfoView:new b(this.tileStore.tileInfo),process:function(t){return e._fetchFeatureSet(t)}}),this.handles.add(this.watch("processor",this._switchProcessor.bind(this)))},t.prototype.destroy=function(){this._promises.forEach(function(e){return e.cancel()}),this._promises.clear(),this.store&&(this.store.destroy(),this._set("store",null)),this._readers.clear()},Object.defineProperty(t.prototype,"processing",{get:function(){return y.fromWorker(this.configuration.processing)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return this._promises.size>0},enumerable:!0,configurable:!0}),t.prototype.setViewState=function(e){this._tileQueue.pause(),this._tileQueue.state=_.fromJSON(e),this._tileQueue.resume()},t.prototype.queryFeatures=function(e){return this.store.executeQuery(v.fromJSON(e))},t.prototype.queryFeatureCount=function(e){return this.store.executeQueryForCount(v.fromJSON(e))},t.prototype.queryObjectIds=function(e){return this.store.executeQueryForIds(v.fromJSON(e))},t.prototype.queryExtent=function(e){return this.store.executeQueryForExtent(v.fromJSON(e))},t.prototype.tileAdded=function(e){this._fetchTile(e)},t.prototype.tileRemoved=function(e){var t=this._promises.get(e),r=this._readers.get(e);this._readers.delete(e),t&&(t.cancel(),this._promises.delete(e),this.notifyChange("updating")),r&&this.store.unload(r)},t.prototype._switchProcessor=function(e,t){this.handles.remove("processor");var r=e.queryInfo,o=r.orderByFields,i=r.outFields,s=r.definitionExpression,n=r.gdbVersion,a=r.historicMoment;i&&i.sort(),o&&o.sort();var u=JSON.stringify({definitionExpression:s,outFields:i,orderByFields:o,gdbVersion:n,historicMoment:a});this._tileQueue.pause(),this._queryInfoHash!==u&&(this._readers.clear(),this.store&&this.store.destroy(),this._set("store",new h.default({definitionExpression:s,fields:this.service.fields,geometryType:this.service.geometryType,objectIdField:this.service.objectIdField,hasM:!1,hasZ:!1,spatialReference:this.spatialReference,cacheSpatialQueries:!0,gdbVersion:n,historicMoment:null!=a&&new Date(a)})),this._queryInfoHash=u),this._tileQueue.reset();for(var l=0,c=this.tileStore.tiles;l<c.length;l++){var p=c[l];this._tileQueue.has(p.key)||this._fetchTile(p)}this._tileQueue.resume()},t.prototype._fetchTile=function(e){var t=this,r=this._tileQueue.push(e.key).then(function(r){t._cleanupPromise(e),t.processor.featureSetReady(e,r)}).catch(function(r){return t._cleanupPromise(e),"cancel"!==r.dojoType&&(t.processor.featureSetReady(e,null,r.message),F.error("query-error",{error:r})),c.reject(r)});this._promises.set(e,r),this.notifyChange("updating")},t.prototype._fetchFeatureSet=function(e){var t=this,r=this.tileStore.findByKey(e),o=this._getQuantizationParameters(r),i=this.processor.queryInfo,s=i.pixelBuffer*r.resolution,n=r.bounds.slice(),a=new Set,u={geometryType:null,features:null,fields:null,transform:null,spatialReference:null};return n[0]-=s,n[1]-=s,n[2]+=s,n[3]+=s,this._readers.has(r)?this.store.executeQuery(this._createQuery(n,o,i)):this._drillQuery(u,a,n,i,o).then(function(e){var t=i.orderByFields;if(t){var r=t[0].split(" "),o=r[0];"DESC"===r[1]&&e.features.sort(function(e,t){return t.attributes[o]-e.attributes[o]})}return e}).then(function(e){return t._wrapPoints(e,i)}).then(function(e){return e.features.length?e:null}).then(function(e){var s=e?d.createFeatureSetReader(e):null;s&&t.store.load(s),t._readers.set(r,s);var a=t.service.objectIdField;if(e&&i.returnCentroid){var u=new Map,l=t._createQuery(n,o,i);l.objectIds=[];for(var c=0,p=e.features;c<p.length;c++){var f=p[c];if(!f.centroid){var h=f.attributes[a];u.set(h,f),l.objectIds.push(h)}}return l.objectIds.length?t.store.executeQuery(l).then(function(t){for(var r=0,o=t.features;r<o.length;r++){var i=o[r];u.get(i.attributes[a]).centroid=i.centroid}return e}):e}return e})},t.prototype._drillQuery=function(e,t,r,o,i,s){var n=this;return void 0===s&&(s=0),this._query(r,o,i,s>=w.maxDrillLevel).then(function(a){if(!e.geometryType){if(e.fields=a.fields,e.geometryType=a.geometryType,e.objectIdFieldName=a.objectIdFieldName,e.transform=a.transform,e.spatialReference=a.spatialReference,!a.exceededTransferLimit)return void(e.features=a.features);e.features=[]}if(s<w.maxDrillLevel&&a.exceededTransferLimit){s++;var u=(r[2]-r[0])/2,c=(r[3]-r[1])/2,p=[r[0],r[1]+c,r[2]-u,r[3]],f=[r[0]+u,r[1]+c,r[2],r[3]],d=[r[0],r[1],r[2]-u,r[3]-c],h=[r[0]+u,r[1],r[2],r[3]-c];return l.all([n._drillQuery(e,t,p,o,i,s),n._drillQuery(e,t,f,o,i,s),n._drillQuery(e,t,d,o,i,s),n._drillQuery(e,t,h,o,i,s)])}if("esriGeometryPoint"!==a.geometryType)for(var y=n.service.objectIdField,m=0,g=a.features;m<g.length;m++){var v=g[m],_=v.attributes[y];t.has(_)||(t.add(_),e.features.push(v))}else e.features=e.features.concat(a.features.concat())}).then(function(){return e})},t.prototype._query=function(e,t,r,o){var i=this;void 0===o&&(o=!0);var s=this._createQuery(e,r,t,o);return m.executeQuery(this.service.source,s).then(function(e){return e.data}).then(function(e){return i._applyProcessing(e,s)})},t.prototype._createQuery=function(e,t,r,o){void 0===o&&(o=!0);var i=new v,s=this.processor.queryInfo.historicMoment;return i.maxRecordCountFactor=w.maxRecordCountFactor,i.gdbVersion=this.processor.queryInfo.gdbVersion,i.historicMoment=null!=s?new Date(s):null,i.outFields=this.processor.queryInfo.outFields,i.where=this.processor.queryInfo.definitionExpression||"1=1",i.geometry=n.Extent.fromJSON({xmin:e[0],ymin:e[1],xmax:e[2],ymax:e[3],spatialReference:this.spatialReference}),this.service.capabilities.query.supportsQuantization?(i.quantizationParameters=t,"esriGeometryPolyline"===this.service.geometryType&&(i.maxAllowableOffset=t.tolerance)):i.maxAllowableOffset=t.tolerance,i.resultType="tile",i.returnExceededLimitFeatures=o,i.returnGeometry=!0,i.returnCentroid=r.returnCentroid,i.orderByFields=r.orderByFields,i},t.prototype._applyProcessing=function(e,t){var r=this.processing;if(!r)return e;if(this._processingInMainThread)return this.remoteClient.invoke("executeProcessing",{query:t.toJSON(),featureSet:JSON.stringify(e)}).then(function(e){return JSON.parse(e)});try{var o=r.process(e,t,r.options);return o||c.reject(new a("FeatureLayer","invalid processing.process() method, returns nothing"))}catch(r){return this._processingInMainThread=!0,this.remoteClient.invoke("executeProcessing",{query:t.toJSON(),featureSet:JSON.stringify(e)}).then(function(e){return JSON.parse(e)})}},t.prototype._getQuantizationParameters=function(e){return g.default.fromJSON({mode:"view",originPosition:"upperLeft",tolerance:e.resolution,extent:{xmin:e.bounds[0],ymin:e.bounds[1],xmax:e.bounds[2],ymax:e.bounds[3],spatialReference:this.spatialReference}})},t.prototype._wrapPoints=function(e,t){if(0===e.features.length)return e;var r=t.returnCentroid,o=t.pixelBuffer,s=e.geometryType,n=e.spatialReference,a=e.transform;if("esriGeometryPoint"!==s&&"esriGeometryMultipoint"!==s&&!r||!f.isWrappable(n))return e;var u=e.features,l=f.getInfo(n),c=Math.round((l.valid[1]-l.valid[0])/a.scale[0]);if(512===c){for(var p=[],d=0,h=u;d<h.length;d++){var y=h[d],m=y.geometry,g=y.attributes;if(m)if(m.x<o){var v={geometry:i({},m),attributes:g};v.geometry.x+=c,p.push(v)}else if(m.x>512-o){var v={geometry:i({},m),attributes:g};v.geometry.x-=c,p.push(v)}}u.push.apply(u,p)}else for(var _=0,x=u;_<x.length;_++){var m=x[_].geometry;m&&(m.x<-o?m.x+=c:m.x>512+o&&(m.x-=c))}return e},t.prototype._cleanupPromise=function(e){this._promises.delete(e),this.notifyChange("updating")},o([p.property()],t.prototype,"configuration",void 0),o([p.property({readOnly:!0,dependsOn:["configuration"]})],t.prototype,"processing",null),o([p.property({readOnly:!0})],t.prototype,"store",void 0),o([p.property()],t.prototype,"updating",null),t=o([p.subclass()],t)}(p.declared(x.default));t.default=O});