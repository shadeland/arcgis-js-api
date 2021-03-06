// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["./GridDataUtil"],function(e){var t={};return t.fitContentInsideCell=function(t){var i=e.getFieldInfo(t);if(i&&t.content){var n=t.content,r=t.parentGrid,o=t[r.hasRealBorders?"getContentWidth":"getWidth"](),s=t[r.hasRealBorders?"getContentHeight":"getHeight"]();i.isChart?n.resize(o,s):i.isImage||i.isShape?n.resize({w:o,h:s},t.getFullStyle()):i.isReportSection?(n.setResizedHeight(s,{resizeContentProportionally:!0}),n.setWidth(o,{resizeContentProportionally:!0})):i.isInfographic&&n.resize(o,s)}},t});