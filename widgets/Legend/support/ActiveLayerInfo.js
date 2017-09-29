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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","dojo/_base/lang","dojo/io-query","../../../core/Accessor","../../../core/Collection","../../../core/HandleRegistry","../../../core/Logger","../../../core/promiseUtils","../../../core/watchUtils","../../../layers/FeatureLayer","../../../layers/WMSLayer","../../../layers/WMTSLayer","../../../layers/MapImageLayer","../../../layers/support/ExportImageParameters","../../../renderers/SimpleRenderer","../../../renderers/ClassBreaksRenderer","../../../renderers/UniqueValueRenderer","../../../renderers/PointCloudClassBreaksRenderer","../../../renderers/PointCloudRenderer","../../../renderers/PointCloudStretchRenderer","../../../renderers/PointCloudUniqueValueRenderer","../../../symbols/SimpleMarkerSymbol","../../../Color","../../../request","./colorRampUtils","./sizeRampUtils","../../../core/arrayUtils","../../../core/accessorSupport/decorators","../../../renderers/support/jsonUtils","../../../symbols/support/symbolPreview","../../../symbols/support/gfxUtils"],function(e,t,n,r,l,o,a,i,s,u,c,d,y,p,f,h,m,g,b,v,_,S,L,E,R,w,F,C,I,O,T,x,A,V){function z(e){return e.isInstanceOf(g)}function M(e){return e.isInstanceOf(b)}function P(e){return e.isInstanceOf(v)}function k(e){return e.isInstanceOf(_)}function U(e){return e.isInstanceOf(L)}function W(e){return e.isInstanceOf(E)}function q(e){return z(e)||M(e)||P(e)||k(e)||U(e)||W(e)}function j(e){return e.isInstanceOf(p)}function B(e){return e.isInstanceOf(f)}function D(e){return e.isInstanceOf(h)}function N(e){return e.isInstanceOf&&e.isInstanceOf(y)}var H=u.getLogger("esri.widgets.Legend.support.ActiveLayerInfo"),J="https://utility.arcgis.com/sharing/tools/legend",G="esri.layers.ImageryLayer",Q=new R({size:6,outline:{color:[128,128,128,.5],width:.5}}),$=function(e){function t(t){var n=e.call(this,t)||this;return n._handles=new s,n._hasColorRamp=!1,n._hasOpacityRamp=!1,n._hasSizeRamp=!1,n._legendResponse={},n._webStyleSymbolCache=new Map,n.children=new i,n.layer=null,n.legendElements=[],n.parent=null,n.scale=null,n.title=null,n}return n(t,e),t.prototype.initialize=function(){var e=this,t=function(){return e.notifyChange("ready")};this._handles.add([d.on(this,"children","change",function(n){var r=n.added,l=n.removed,o=e._handles;r.map(function(e){var n="activeLayerInfo-ready-watcher-"+e.layer.uid;o.add(d.init(e,"ready",t),n)}),l.forEach(function(e){return o.remove(e.layer.uid)}),t()})])},t.prototype.destroy=function(){this._handles.destroy(),this._handles=null,this._legendResponse=null,this._webStyleSymbolCache=null},Object.defineProperty(t.prototype,"ready",{get:function(){return null===this.layer?!0:this.children.length>0?this._isGroupActive():this.legendElements.length>0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"version",{get:function(){return this._get("version")+1},enumerable:!0,configurable:!0}),t.prototype.buildLegendElementsForFeatureCollections=function(e){var t=this;this.legendElements=[],e.forEach(function(e){if(N(e))t._buildRendererLegendElements(e.renderer,e.title,"append");else if(e.featureSet&&e.featureSet.features.length){var n=e.layerDefinition,r=n&&n.drawingInfo,l=r&&x.fromJSON(r.renderer);if(!l)return void H.warn("drawingInfo not available!");t._buildRendererLegendElements(l,e.name,"append")}})},t.prototype.buildLegendElementsForRenderer=function(){this._buildRendererLegendElements(this.layer.renderer,null,"replace")},t.prototype.buildLegendElementsForTools=function(){var e=this,t=this.layer;B(t)?this._constructLegendElementsForWMTSlayer():j(t)?this._constructLegendElementsForWMSSublayers():D(t)?this._constructLegendElementsForSublayers():(this._handles.remove("imageryLayers-watcher"),this._getLegendLayers().then(function(n){e.legendElements=[],n.forEach(function(n){if(e.layer.declaredClass===G){var r=t.watch("renderingRule, bandIds",function(){e._legendResponse["default"]=null,e.buildLegendElementsForTools()});e._handles.add(r,"imageryLayers-watcher")}var l=e._generateSymbolTableElementForLegendLayer(n);l&&l.infos.length&&e.legendElements.push(l),e.notifyChange("ready")}),e.notifyChange("ready")}).otherwise(function(e){H.warn("Request to server for legend has failed!",e)}))},t.prototype._isGroupActive=function(){var e=this.children;return e.length?e.some(function(e){return e.ready}):!1},t.prototype._buildRendererLegendElements=function(e,t,n){var r=this;this._getRendererLegendElements(e,t).then(function(e){"append"===n?Array.prototype.push.apply(r.legendElements,e):r.legendElements=e,r.notifyChange("ready")}).otherwise(function(e){H.warn("error while building legend for layer!",e)})},t.prototype._constructLegendElementsForWMTSlayer=function(){this.legendElements=[],this._handles.remove("wmts-activeLayer-watcher");var e=this.layer,t=e.activeLayer;if(this._handles.add(d.watch(this.layer,"activeLayer",this._constructLegendElementsForWMTSlayer.bind(this)),"wmts-activeLayer-watcher"),t.styleId&&t.styles){var n=null;t.styles.some(function(e){return t.styleId===e.id?(n=e.legendUrl,!0):void 0}),n&&(this.legendElements=[{type:"symbol-table",title:t.title,infos:[{src:n,opacity:e.opacity}]}])}this.notifyChange("ready")},t.prototype._constructLegendElementsForWMSSublayers=function(){this.legendElements=[],this._handles.remove("wms-sublayers-watcher");var e=this.layer,t=null;(e.customParameters||e.customLayerParameters)&&(t=l.clone(e.customParameters||{}),l.mixin(t,e.customLayerParameters||{})),this._handles.add(d.watch(this.layer,"sublayers",this._constructLegendElementsForWMSSublayers.bind(this)),"wms-sublayers-watcher"),this.legendElements=this._generateLegendElementsForWMSSublayers(e.sublayers,t),this.notifyChange("ready")},t.prototype._generateLegendElementsForWMSSublayers=function(e,t){var n=this,r=[];return this._handles.add(e.on("change",this._constructLegendElementsForWMSSublayers.bind(this)),"wms-sublayers-watcher"),e.forEach(function(e){var l=e.watch("title, visible, legendEnabled",function(){return n._constructLegendElementsForWMSSublayers()});if(n._handles.add(l,"wms-sublayers-watcher"),e.visible&&e.legendEnabled){var o=n._generateSymbolTableElementForWMSSublayer(e,t);o&&o.infos.length&&r.unshift(o)}}),r},t.prototype._generateSymbolTableElementForWMSSublayer=function(e,t){if(!e.legendUrl&&e.sublayers){var n=this._generateLegendElementsForWMSSublayers(e.sublayers,t).filter(function(e){return e});return{type:"symbol-table",title:e.title,infos:n}}return this._generateSymbolTableElementForLegendUrl(e,t)},t.prototype._generateSymbolTableElementForLegendUrl=function(e,t){var n=e.legendUrl;if(n){var r={type:"symbol-table",title:e.title||e.name||e.id&&e.id+"",infos:[]};return t&&(n+="?"+o.objectToQuery(t)),r.infos.push({src:n,opacity:e.layer&&e.layer.opacity}),r}},t.prototype._getLegendLayers=function(e){var t=this,n=e&&e.hasDynamicLayers,r=n?e.dynamicLayers:null,l=r||"default",o=this._legendResponse&&this._legendResponse[l];return o?c.resolve(o):this._legendRequest(r).then(function(e){var n=e.layers;return t._legendResponse[l]=n,n})},t.prototype._legendRequest=function(e){var t=this.layer,n={f:"json",dynamicLayers:e};t.declaredClass===G&&(t.renderingRule&&(n.renderingRule=JSON.stringify(t.renderingRule.toJSON())),t.bandIds&&(n.bandIds=t.bandIds.join()));var r=t.url.replace(/(\/)+$/,"");if(t.version>=10.01){var l=r.indexOf("?");l>-1?r=r.substring(0,l)+"/legend"+r.substring(l):r+="/legend",t.token&&(r+="?token="+t.token)}else{var o=r.toLowerCase().indexOf("/rest/"),a=r.substring(0,o)+r.substring(o+5,r.length);r=J+"?soapUrl="+encodeURI(a)+"&returnbytes=true"}return F(r,{query:n,callbackParamName:"callback"}).then(function(e){return e.data})},t.prototype._constructLegendElementsForSublayers=function(){var e=this;this.legendElements=[],this._handles.remove("sublayers-watcher");var t=this.layer,n=new m({layer:t});this._getLegendLayers(n).then(function(n){var r={};n.forEach(function(e){r[e.layerId]=e}),e._handles.add(d.watch(t,"sublayers",e._constructLegendElementsForSublayers.bind(e)),"sublayers-watcher"),e.legendElements=e._generateLegendElementsForSublayers(t.sublayers,r,t.opacity),e.notifyChange("ready")}).otherwise(function(e){H.warn("Request to server for legend has failed!",e)}).then(function(){return n.destroy()}),this.notifyChange("ready")},t.prototype._generateLegendElementsForSublayers=function(e,t,n){var r=this,l=[];return this._handles.add(e.on("change",this._constructLegendElementsForSublayers.bind(this)),"sublayers-watcher"),e.forEach(function(e){var o=e.watch("renderer, opacity, title, visible",function(){return r._constructLegendElementsForSublayers()});if(r._handles.add(o,"sublayers-watcher"),e.visible&&e.legendEnabled){var a=e&&null!=e.opacity?e.opacity:null,i=null!=a?a*n:n,s=r._generateSymbolTableElementForSublayer(e,t,i);s&&s.infos.length&&l.unshift(s)}}),l},t.prototype._generateSymbolTableElementForSublayer=function(e,t,n){var r=t[e.id];if(!r&&e.sublayers){var l=this._generateLegendElementsForSublayers(e.sublayers,t,n).filter(function(e){return e});return{type:"symbol-table",title:e.title,infos:l}}return this._generateSymbolTableElementForLegendLayer(r,e,n)},t.prototype._generateSymbolTableElementForLegendLayer=function(e,t,n){var r=this;if(e){var l=t&&t.renderer,o=t&&t.title||e.layerName;if(l){var a=t&&t.title||this._getRendererTitle(l,t);a&&(o&&(a.title=o),o=a)}var i={type:"symbol-table",title:o,infos:[]};if(e.legendType&&(i.legendType=e.legendType),e.legend&&this._isLegendLayerInScale(e,t)){var s=t?this._sanitizeLegendForSublayer(e.legend.slice(),t):e.legend;i.infos=s.map(function(t){var l=t.url;if(t.imageData&&t.imageData.length>0)l="data:image/png;base64,"+t.imageData;else{if(0===l.indexOf("http"))return null;l=r.layer.url+"/"+e.layerId+"/images/"+l;var o=r.layer.token;o&&(l+="?token="+o)}return{label:t.label,src:l,opacity:n,width:t.width,height:t.height}}).filter(function(e){return!!e})}return i.infos.length?i:null}},t.prototype._isLegendLayerInScale=function(e,t){var n=t||this.layer,r=null,l=null,o=!0;return!n.minScale&&0!==n.minScale||!n.maxScale&&0!==n.maxScale?(0===e.minScale&&n.tileInfo&&(r=n.tileInfo.lods[0].scale),0===e.maxScale&&n.tileInfo&&(l=n.tileInfo.lods[n.tileInfo.lods.length-1].scale)):(r=Math.min(n.minScale,e.minScale)||n.minScale||e.minScale,l=Math.max(n.maxScale,e.maxScale)),(r>0&&r<this.scale||l>this.scale)&&(o=!1),o},t.prototype._sanitizeLegendForSublayer=function(e,t){if(this.layer.version<10.1||0===e.length)return e;var n=t.renderer,r=e.some(function(e){return e.values}),l=null,o=null;return r&&e.some(function(e,t){return e.values||(l=t,o=e,o.label||(o.label="others")),null!=o}),n?"unique-value"===n.type?o&&(e.splice(l,1),e.push(o)):"class-breaks"===n.type&&(o&&e.splice(l,1),e.reverse(),o&&e.push(o)):o&&(e.splice(l,1),e.push(o)),e},t.prototype._getRendererLegendElements=function(e,t){return q(e)?e.isInstanceOf(S)?this._constructPointCloudRendererLegendElements(e,t):this._constructRendererLegendElements(e,t):(H.warn("Renderer not supported!"),c.resolve([]))},t.prototype._constructPointCloudRendererLegendElements=function(e,t){var n=this,r=this.layer.opacity,l=[],o=null,a=null;if(k(e))o={type:"symbol-table",title:t||e.field,infos:[]},e.colorClassBreakInfos.forEach(function(e){o.infos.unshift({label:e.label||e.minValue+" - "+e.maxValue,value:[e.minValue,e.maxValue],symbol:n._getAppliedCloneSymbol(Q,e.color,r)})});else if(U(e)){var i=e.stops,s=null;if(i.length&&(1===i.length&&(s=i[0].color),!s)){var u=i[0].value,d=i[i.length-1].value;if(null!=u&&null!=d){var y=u+(d-u)/2;s=C.getColorFromPointCloudStops(y,i)}}o={type:"symbol-table",title:null,infos:[{label:null,value:null,symbol:this._getAppliedCloneSymbol(Q,s||Q.color,r)}]},a={type:"color-ramp",title:t||e.field,borderColor:V.getStroke(Q).color,overlayColor:C.getRampOverlayColor(r),infos:C.getRampStopsForPointCloud(e.stops)}}else W(e)&&(o={type:"symbol-table",title:t||e.field,infos:[]},e.colorUniqueValueInfos.forEach(function(e){o.infos.push({label:e.label||e.values.join(", "),value:e.values.join(", "),symbol:n._getAppliedCloneSymbol(Q,e.color,r)})}));o&&o.infos.length&&l.push(o),a&&a.infos.length&&l.push(a);var p=l.reduce(function(e,t){return e.concat(t.infos)},[]).filter(function(e){return!!e.symbol}).map(function(e){return n._getSymbolPreview(e)});return c.eachAlways(p).then(function(){return l})},t.prototype._constructRendererLegendElements=function(e,t){var n=this;return this._loadRenderer(e).then(function(e){n._hasColorRamp=!1,n._hasOpacityRamp=!1,n._hasSizeRamp=!1;var r=n._getVisualVariableLegendElements(e)||[],l={type:"symbol-table",title:t||n._getRendererTitle(e),infos:[]},o=null;if(P(e)){var a=e.field;e.uniqueValueInfos.forEach(function(e){e.symbol&&l.infos.push({label:e.label||n._getDomainName(a,e.value)||e.value,value:e.value,symbol:e.symbol})})}else if(M(e)){o=n._isUnclassedRenderer(e);var i=!o||!n._hasSizeRamp;i&&(e.classBreakInfos.forEach(function(e){e.symbol&&l.infos.unshift({label:e.label||(o?null:e.minValue+" - "+e.maxValue),value:[e.minValue,e.maxValue],symbol:e.symbol})}),o&&(l.title=null))}else z(e)&&e.symbol&&!n._hasSizeRamp&&l.infos.push({label:e.label,symbol:e.symbol});var s=!1,u=e.defaultLabel,d=e.defaultSymbol;d&&!o&&(l.infos.push({label:u||"others",symbol:d}),s=!0),s||z(e)||o&&!n._hasColorRamp&&!n._hasSizeRamp&&!n._hasOpacityRamp||r.push({type:"symbol-table",infos:[{label:e.defaultLabel,symbol:e.defaultSymbol}]}),l.infos.length&&r.unshift(l);var y=n._getSymbolConfig(e.visualVariables),p=r.reduce(function(e,t){return e.concat(t.infos)},[]).filter(function(e){return!!e.symbol}).map(function(e){return n._getSymbolPreview(e,y)});return e=null,c.eachAlways(p).then(function(){return r})})},t.prototype._getSymbolConfig=function(e){var t=!1,n=!1;if(e)for(var r=0;r<e.length&&(!t||!n);r++){var l=e[r];"size"===l.type&&("height"===l.axis&&(t=!0),"width-and-depth"===l.axis&&(n=!0))}return t&&n?"tall":null},t.prototype._getSymbolPreview=function(e,t){return A.renderPreviewHTML(e.symbol,{size:e.size,opacity:this.layer.opacity,symbolConfig:t}).then(function(t){return e.preview=t,e}).otherwise(function(){return e.preview=null,e})},t.prototype._loadRenderer=function(e){var t=this,n=[];e=e.clone();var r=this._getMedianColor(e),l=this.layer.opacity;if(M(e)||P(e)){var o=e.classBreakInfos||e.uniqueValueInfos,a=o.map(function(e){return t._fetchSymbol(e.symbol,r,l).then(function(t){e.symbol=t}).otherwise(function(){e.symbol=null})});Array.prototype.push.apply(n,a)}return n.push(this._fetchSymbol(e.symbol||e.defaultSymbol,e.defaultSymbol?null:r,l).then(function(n){t._applySymbolToRenderer(e,n,z(e))}).otherwise(function(){t._applySymbolToRenderer(e,null,z(e))})),c.eachAlways(n).then(function(){return e})},t.prototype._applySymbolToRenderer=function(e,t,n){n?e.symbol=t:e.defaultSymbol=t},t.prototype._getMedianColor=function(e){if(!e.visualVariables)return null;var t=O.find(e.visualVariables,function(e){return"color"===e.type});if(!t)return null;var n=null,r=null;if(t.colors)n=t.minDataValue,r=t.maxDataValue;else if(t.stops){if(1===t.stops.length)return t.stops[0].color;n=t.stops[0].value,r=t.stops[t.stops.length-1].value}if(null!=n&&null!=r){var l=n+(r-n)/2;return e.getColor(l,{colorInfo:t})}},t.prototype._fetchSymbol=function(e,t,n){var r=this;if(!e)return c.reject();if("web-style"===e.type){var l=e.portal,o=l&&l.url,a=l&&l.user&&l.user.username,i=e.name+"-"+e.styleName+"-"+e.styleUrl+"-"+o+"-"+a,s=this._webStyleSymbolCache;return s.has(i)||s.set(i,e.fetchSymbol()),s.get(i).then(function(e){return r._getAppliedCloneSymbol(e,t,n)}).otherwise(function(){return H.warn("Fetching web-style failed!"),c.reject()})}return c.resolve(this._getAppliedCloneSymbol(e,t,n))},t.prototype._getAppliedCloneSymbol=function(e,t,n){if(!e)return e;var r=e.clone(),l=r.type,o=l.indexOf("3d")>-1,a=t&&t.toRgba();if(o)this._applyColorTo3dSymbol(r,a,n);else{r.color&&(r.color=this._getOpacityAppliedColor(a||r.color.toRgba(),n));var i=r.outline;i&&i.color&&(i.color=this._getOpacityAppliedColor(i.color.toRgba(),n))}return r},t.prototype._applyColorTo3dSymbol=function(e,t,n){var r=this;e.symbolLayers.forEach(function(e){e&&(t&&(e.material||(e.material={}),e.material.color=new w(t)),null!=n&&(e.material&&e.material.color&&(e.material.color=r._getOpacityAppliedColor(e.material.color.toRgba(),n)),e.outline&&e.outline.color&&(e.outline.color=r._getOpacityAppliedColor(e.outline.color.toRgba(),n))))})},t.prototype._getOpacityAppliedColor=function(e,t){return e[3]=e[3]*t,e},t.prototype._getVisualVariableLegendElements=function(e){var t=this,n=e.visualVariables,r=[],l=[],o=[],a=this.layer.opacity;if(!n)return null;n.forEach(function(e){"color"===e.type?r.push(e):"size"===e.type?l.push(e):"opacity"===e.type&&o.push(e)});var i,s,u=r.concat(l,o);if(0===r.length&&e.isInstanceOf(b)&&e.classBreakInfos&&1===e.classBreakInfos.length){var c=e.classBreakInfos[0];i=c&&c.symbol}if(0===r.length&&e.isInstanceOf(g)&&(i=e.symbol),i){if(i.type.indexOf("3d")>-1){var d=i.symbolLayers.getItemAt(0);d.get("material.color")&&(s=d.material.color)}else i.url||(s=i.color);s&&(s=s.toRgba())}return u.map(function(n){if(!n.legendOptions||n.legendOptions.showLegend!==!1){var r=t._getRampTitle(n,t.layer),l=C.getRampBorderColor(e),o=C.getRampOverlayColor(a),i=null;return"color"===n.type?(i={type:"color-ramp",title:r,borderColor:l,overlayColor:o,infos:C.getRampStops(e,n)},t._hasColorRamp||(t._hasColorRamp=!(null==i.infos||!i.infos.length))):"size"===n.type?(i={type:"size-ramp",title:r,infos:I.getRampStops(e,n,t._getMedianColor(e),t.scale)},t._hasSizeRamp||(t._hasSizeRamp=!(null==i.infos||!i.infos.length))):"opacity"===n.type&&(i={type:"opacity-ramp",title:r,borderColor:l,overlayColor:o,infos:C.getRampStops(e,n,s)},t._hasOpacityRamp||(t._hasOpacityRamp=!(null==i.infos||!i.infos.length))),i.infos&&i}}).filter(function(e){return!!e})},t.prototype._getDomainName=function(e,t){if(!l.isFunction(e)){var n=this.layer,r=n.getField&&n.getField(e),o=r&&n.getFieldDomain?n.getFieldDomain(r.name):null;return o&&o.codedValues?o.getName(t):null}return null},t.prototype._getRampTitle=function(e,t){var n=e.field,r=e.normalizationField,o=!1,a=!1,i=!1,s=null;n=l.isFunction(n)?null:n,r=l.isFunction(r)?null:r;var u=e.legendOptions&&e.legendOptions.title;if(void 0!==u)s=e.legendOptions.title;else if(e.valueExpressionTitle)s=e.valueExpressionTitle;else{if(t.renderer.authoringInfo&&t.renderer.authoringInfo.visualVariables)for(var c=t.renderer.authoringInfo.visualVariables,d=0;d<c.length;d++){var y=c[d];if("colorInfo"===y.type){if("ratio"===y.style){o=!0;break}if("percent"===y.style){a=!0;break}if("percentTotal"===y.style){i=!0;break}}}s={field:n&&this._getFieldAlias(n,t),normField:r&&this._getFieldAlias(r,t),ratio:o,ratioPercent:a,ratioPercentTotal:i}}return s},t.prototype._getRendererTitle=function(e,t){var n=e;if(n.legendOptions&&n.legendOptions.title)return n.legendOptions.title;if(n.valueExpressionTitle)return n.valueExpressionTitle;var r=this.layer,o=n.field,a=null,i=null;n instanceof b&&(a=n.normalizationField,i="percent-of-total"===n.normalizationType),o=l.isFunction(o)?null:o,a=l.isFunction(a)?null:a;var s=null;return(o||a)&&(s={field:t?o:o&&this._getFieldAlias(o,r),normField:t?a:a&&this._getFieldAlias(a,r),normByPct:i}),s},t.prototype._getFieldAlias=function(e,t){var n=t.popupTemplate,r=n&&n.fieldInfos,o=l.isFunction(e)?null:t.getField&&t.getField(e),a=null;r&&r.some(function(t){return e===t.fieldName?(a=t,!0):void 0});var i=a||o,s=null;return i&&(s=a&&a.label||o&&o.alias||i.name||i.fieldName),s},t.prototype._isUnclassedRenderer=function(e){var t=e.visualVariables,n=e.isInstanceOf(b)&&e.classBreakInfos&&1===e.classBreakInfos.length,r=!1;return n&&t&&(r=e.field?t.some(function(t){return!(!t||e.field!==t.field||(e.normalizationField||t.normalizationField)&&e.normalizationField!==t.normalizationField)}):!!t.length),r},r([T.property()],t.prototype,"children",void 0),r([T.property()],t.prototype,"layer",void 0),r([T.property()],t.prototype,"legendElements",void 0),r([T.property()],t.prototype,"parent",void 0),r([T.property({readOnly:!0})],t.prototype,"ready",null),r([T.property()],t.prototype,"scale",void 0),r([T.property()],t.prototype,"title",void 0),r([T.property({dependsOn:["ready"],readOnly:!0,value:0})],t.prototype,"version",null),t=r([T.subclass("esri.widgets.Legend.support.ActiveLayerInfo")],t)}(T.declared(a));return $});