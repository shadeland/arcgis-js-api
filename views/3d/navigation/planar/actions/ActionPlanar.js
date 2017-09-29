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

define(["../../Action","../../../lib/glMatrix"],function(n,a){var e=a.vec3d,t=a.vec4d,i=n.createSubclass({declaredClass:"esri.views.3d.navigation.planar.actions.ActionPlanar",constructor:function(){this._plane=t.create()},updatePlane:function(n,a){t.set4(a[0],a[1],a[2],-e.dot(a,n),this._plane)}});return i});