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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../request","../core/Error","../core/promiseUtils","../core/accessorSupport/decorators","./Layer"],function(e,r,t,a,n,o,c,i,s){return function(r){function s(){return null!==r&&r.apply(this,arguments)||this}return t(s,r),s.prototype.getImageUrl=function(e,r,t,a){throw new o("dynamiclayer:getImageUrl-not-implemented","getImageUrl() is not implemented")},s.prototype.fetchImage=function(e,r,t,a){var i=this.getImageUrl(e,r,t,a),s={responseType:"image",allowImageDataAccess:a&&a.allowImageDataAccess||!1};a&&a.timestamp&&(s.query={_ts:a.timestamp});var l,u;return"string"==typeof i?(l=i,u=n(i,s)):u=i.then(function(e){return l=e,n(l,s)}),u.then(function(e){return e.data}).catch(function(e){return e&&"cancel"===e.dojoType?c.reject(e):l?c.reject(new o("dynamiclayer:image-fetch-error","Unable to load image: "+l,{error:e})):c.reject(new o("dynamiclayer:getImageUrl-error","Unable to create image url",{error:e}))})},s.prototype.importLayerViewModule=function(r){switch(r.type){case"2d":return c.create(function(r){return e(["../views/2d/layers/MapImageLayerView2D"],r)});case"3d":return c.create(function(r){return e(["../views/3d/layers/MapImageLayerView3D"],r)})}},s=a([i.subclass("esri.layers.DynamicLayer")],s)}(i.declared(s))});