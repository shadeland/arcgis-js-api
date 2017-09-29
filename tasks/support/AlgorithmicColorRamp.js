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

define(["../../Color","./ColorRamp"],function(o,r){var l=r.createSubclass({declaredClass:"esri.tasks.support.AlgorithmicColorRamp",properties:{algorithm:null,fromColor:{value:null,type:o},toColor:{value:null,type:o},type:"algorithmic"},toJSON:function(){var r;switch(this.algorithm.toLowerCase()){case"cie-lab":r="esriCIELabAlgorithm";break;case"hsv":r="esriHSVAlgorithm";break;case"lab-lch":r="esriLabLChAlgorithm"}var l={type:"algorithmic",algorithm:r};return l.fromColor=o.toJSON(this.fromColor),l.toColor=o.toJSON(this.toColor),l}});return l});