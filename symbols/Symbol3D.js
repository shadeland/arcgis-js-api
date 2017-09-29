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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/Collection","../core/Logger","../core/collectionUtils","../core/Warning","../core/urlUtils","./Symbol","./Symbol3DLayer","./IconSymbol3DLayer","./ObjectSymbol3DLayer","./LineSymbol3DLayer","./PathSymbol3DLayer","./FillSymbol3DLayer","./ExtrudeSymbol3DLayer","./TextSymbol3DLayer","./support/Thumbnail","./support/StyleOrigin","../portal/Portal","../core/accessorSupport/decorators"],function(e,r,t,o,l,y,a,s,n,i,p,m,c,b,u,d,f,S,g,L,h,w){var v={icon:m,object:c,line:b,path:u,fill:d,extrude:f,text:S},O=l.ofType({base:p,key:"type",typeMap:v}),D=y.getLogger("esri.symbols.Symbol3D"),_=function(e){function r(r){var t=e.call(this)||this;return t.styleOrigin=null,t.thumbnail=null,t.type=null,t._set("symbolLayers",t._createSymbolLayersCollection()),t}return t(r,e),Object.defineProperty(r.prototype,"symbolLayers",{set:function(e){var r=this._get("symbolLayers");r?(r.removeAll(),r.addMany(e)):(r=this._createSymbolLayersCollection(e),this._set("symbolLayers",r))},enumerable:!0,configurable:!0}),r.prototype.readSymbolLayers=function(e,r,t){for(var o=this._createSymbolLayersCollection(),l=0;l<e.length;l++){var y=e[l],a=p.typeJSONDictionary.read(y.type),n=v[a];if(n){var i=new n;i.read(e[l],t),o.add(i)}else D.warn("Unknown symbol layer type: "+a),t&&t.messages&&t.messages.push(new s("symbol-layer:unsupported","Symbol layers of type '"+(a||"unknown")+"' are not supported",{definition:y,context:t}))}return o},r.prototype.readStyleOrigin=function(e,r,t){if(e.styleUrl&&e.name){var o=n.read(e.styleUrl,t);return new L({styleUrl:o,name:e.name})}return e.styleName&&e.name?new L({portal:t&&t.portal||h.getDefault(),styleName:e.styleName,name:e.name}):void(t&&t.messages&&t.messages.push(new s("symbol3d:incomplete-style-origin","Style origin requires either a 'styleUrl' or 'styleName' and a 'name' property",{context:t,definition:e})))},r.prototype.writeStyleOrigin=function(e,r,t,o){if(e.styleUrl&&e.name){var l=n.write(e.styleUrl,o);n.isAbsolute(l)&&(l=n.normalize(l)),r.styleOrigin={styleUrl:l,name:e.name}}else e.styleName&&e.name&&(e.portal&&o&&o.portal&&!n.hasSamePortal(e.portal.restUrl,o.portal.restUrl)?o&&o.messages&&o.messages.push(new s("symbol:cross-portal","The symbol style origin cannot be persisted because it refers to an item on a different portal than the one being saved to.",{symbol:this})):r.styleOrigin={styleName:e.styleName,name:e.name})},r.prototype.normalizeCtorArgs=function(e){return e instanceof p||e&&v[e.type]?{symbolLayers:this._createSymbolLayersCollection([e])}:Array.isArray(e)?{symbolLayers:this._createSymbolLayersCollection(e)}:e},r.prototype._createSymbolLayersCollection=function(e){var r=this,t=new O(e);return t.on("before-add",function(e){return r._onSymbolLayersBeforeAdd(e)}),t},r.prototype._onSymbolLayersBeforeAdd=function(e){this._allowedLayerTypes.indexOf(e.item.type)<0&&(D.error("Symbol layer of type '"+e.item.type+"' is not allowed for symbol of type '"+this.type+"'"),e.preventDefault())},o([w.property({json:{write:!1}})],r.prototype,"color",void 0),o([w.property({type:O,json:{write:!0}}),w.cast(a.castForReferenceSetter)],r.prototype,"symbolLayers",null),o([w.reader("symbolLayers")],r.prototype,"readSymbolLayers",null),o([w.property({type:L})],r.prototype,"styleOrigin",void 0),o([w.reader("styleOrigin")],r.prototype,"readStyleOrigin",null),o([w.writer("styleOrigin")],r.prototype,"writeStyleOrigin",null),o([w.property({type:g["default"],json:{read:!1}})],r.prototype,"thumbnail",void 0),o([w.property({type:String,readOnly:!0,json:{read:!1}})],r.prototype,"type",void 0),o([w.shared([])],r.prototype,"_allowedLayerTypes",void 0),r=o([w.subclass("esri.symbols.Symbol3D")],r)}(w.declared(i));return _});