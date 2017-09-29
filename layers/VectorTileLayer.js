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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/_base/lang","../core/accessorSupport/decorators","../core/Error","../core/MultiOriginJSONSupport","../core/urlUtils","../core/promiseUtils","../core/lang","../request","../geometry/Extent","../geometry/SpatialReference","../portal/support/jsonContext","./TiledLayer","./mixins/OperationalLayer","./mixins/PortalLayer","./mixins/ScaleRangeLayer","./mixins/ArcGISCachedService","./support/TileInfo","./support/vectorTileLayerLoader","../views/vectorTiles/style/StyleRepository","../views/vectorTiles/SchemaHelper"],function(e,r,t,o,i,l,n,p,a,s,y,u,c,d,f,v,h,m,g,I,S,T,U,b){var O=function(e){function r(r,t){var o=e.call(this)||this;return o.currentStyleInfo=null,o.fullExtent=null,o.operationalLayerType="VectorTileLayer",o.tileInfo=null,o.type="vector-tile",o.url=null,o}return t(r,e),r.prototype.normalizeCtorArgs=function(e,r){return"string"==typeof e?i.mixin({},{url:e},r):e},r.prototype.load=function(){var e=this,r=this.loadFromPortal({supportedTypes:["Vector Tile Service"],supportsData:!1}).then(function(){if(e.portalItem&&e.portalItem.id){var r=e.portalItem.itemUrl+"/resources/styles/root.json",t={query:{f:"json"}};return u(r,t).then(function(t){t.data&&e.read({url:r},f.createForItem(e.portalItem))})}}).always(function(){return e.loadStyle()});return this.addResolvingPromise(r),this},Object.defineProperty(r.prototype,"attributionDataUrl",{get:function(){var e=this.currentStyleInfo,r=e&&e.serviceUrl&&a.urlToObject(e.serviceUrl);return r?this._getDefaultAttribution(r.path):null},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"serviceUrl",{get:function(){return this.currentStyleInfo&&this.currentStyleInfo.serviceUrl||null},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"spatialReference",{get:function(){return this.tileInfo&&this.tileInfo.spatialReference||null},enumerable:!0,configurable:!0}),Object.defineProperty(r.prototype,"styleUrl",{get:function(){return this.currentStyleInfo&&this.currentStyleInfo.styleUrl||null},enumerable:!0,configurable:!0}),r.prototype.writeStyleUrl=function(e,r){e&&a.isProtocolRelative(e)&&(e="https:"+e),e&&!y.endsWith(e,"root.json")&&(e=a.join(e,"root.json")),r.styleUrl=e},r.prototype.readTileIndexType=function(e,r){return r.type},r.prototype.readTileIndexUrl=function(e,r){return a.join(this.serviceUrl,r.tileMap)},r.prototype.readTileServers=function(e,r){var t=this,o=r.tiles;return this.serviceUrl&&o.forEach(function(e,r,o){o[r]=a.join(t.serviceUrl,e)}),o},r.prototype.readVersion=function(e,r){return r.version?parseFloat(r.version):parseFloat(r.currentVersion)},r.prototype.readCompatibleTileInfo256=function(e,r){return S.fromJSON(b.create256x256CompatibleTileInfo(r.tileInfo))},r.prototype.readCompatibleTileInfo512=function(e,r){return S.fromJSON(b.create512x512CompatibleTileInfo(r.tileInfo))},r.prototype.loadStyle=function(e){var r=e||this.url;if(this._loadingPromise&&"string"==typeof r&&this.url===r)return this._loadingPromise;var t=this._loadingPromise;return this._loadingPromise=this._getSourceAndStyle(r),t&&!t.isFulfilled()&&t.cancel(),this._loadingPromise},r.prototype.getTileUrl=function(e,r,t){var o=this.tileServers[r%this.tileServers.length];return o=o.replace(/\{z\}/gi,e.toString()).replace(/\{y\}/gi,r.toString()).replace(/\{x\}/gi,t.toString())},r.prototype.write=function(e,r){return r&&r.origin&&!this.styleUrl?(r.messages&&r.messages.push(new n("vectortilelayer:unsupported","VectorTileLayer ("+this.title+", "+this.id+") with style defined by JSON only are not supported",{layer:this})),null):this.inherited(arguments,[e,r])},r.prototype._getSourceAndStyle=function(e){var r=this;return e?T.loadMetadata(e).then(function(e){r._set("currentStyleInfo",{serviceUrl:e.serviceUrl,styleUrl:e.styleUrl,spriteUrl:e.spriteUrl,glyphsUrl:e.glyphsUrl,style:e.style,layerDefinition:e.layerDefinition}),r._set("styleRepository",new U(e.style,e)),r.read(e.layerDefinition)}):s.reject(new Error("invalid style!"))},r.prototype._getDefaultAttribution=function(e){var r=e.match(/^https?:\/\/(basemaps|basemapsbeta)\.arcgis\.com(\/[^\/]+)?\/arcgis\/rest\/services\/([^\/]+(\/[^\/]+)*)\/vectortileserver/i),t=["World_Basemap","World_Basemap_WGS84"];if(r){var o=r[3]&&r[3].toLowerCase();if(o)for(var i=r[2]||"",l=0,n=t;l<n.length;l++){var p=n[l];if(p.toLowerCase().indexOf(o)>-1)return a.normalize("//static.arcgis.com/attribution/Vector"+i+"/"+p)}}},o([l.shared({"2d":"../views/2d/layers/VectorTileLayerView2D","3d":"../views/3d/layers/VectorTileLayerView3D"})],r.prototype,"viewModulePaths",void 0),o([l.property({readOnly:!0,dependsOn:["currentStyleInfo"]})],r.prototype,"attributionDataUrl",null),o([l.property({readOnly:!0})],r.prototype,"currentStyleInfo",void 0),o([l.property({type:c,readOnly:!0})],r.prototype,"fullExtent",void 0),o([l.property({readOnly:!0,dependsOn:["currentStyleInfo"]})],r.prototype,"serviceUrl",null),o([l.property({type:d,dependsOn:["tileInfo"],readOnly:!0})],r.prototype,"spatialReference",null),o([l.property({readOnly:!0})],r.prototype,"styleRepository",void 0),o([l.property({readOnly:!0,dependsOn:["currentStyleInfo"],json:{write:{ignoreOrigin:!0}}})],r.prototype,"styleUrl",null),o([l.writer("styleUrl")],r.prototype,"writeStyleUrl",null),o([l.property({readOnly:!0})],r.prototype,"tileIndexType",void 0),o([l.reader("tileIndexType",["tileIndexType","type"])],r.prototype,"readTileIndexType",null),o([l.property({readOnly:!0})],r.prototype,"tileIndexUrl",void 0),o([l.reader("tileIndexUrl",["tileIndexUrl","tileMap"])],r.prototype,"readTileIndexUrl",null),o([l.property({readOnly:!0,type:S})],r.prototype,"tileInfo",void 0),o([l.property({readOnly:!0})],r.prototype,"tileServers",void 0),o([l.reader("tileServers",["tiles"])],r.prototype,"readTileServers",null),o([l.property({json:{read:!1},readOnly:!0,value:"vector-tile"})],r.prototype,"type",void 0),o([l.property({json:{origins:{webDocument:{read:{source:"styleUrl"}},portalItem:{read:{source:"url"}}},write:!1,read:!1}})],r.prototype,"url",void 0),o([l.property({readOnly:!0})],r.prototype,"version",void 0),o([l.reader("version",["version","currentVersion"])],r.prototype,"readVersion",null),o([l.property({readOnly:!0})],r.prototype,"compatibleTileInfo256",void 0),o([l.reader("compatibleTileInfo256",["tileInfo"])],r.prototype,"readCompatibleTileInfo256",null),o([l.property({readOnly:!0})],r.prototype,"compatibleTileInfo512",void 0),o([l.reader("compatibleTileInfo512",["tileInfo"])],r.prototype,"readCompatibleTileInfo512",null),r=o([l.subclass("esri.layers.VectorTileLayer")],r)}(l.declared(v,h,m,g,p,I));return O});