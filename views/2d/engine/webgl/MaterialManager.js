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

define(["require","exports","../../../webgl/ShaderVariations","./shaders/textShaderSnippets","./shaders/iconShaderSnippets","./shaders/fillShaderSnippets","./shaders/lineShaderSnippets","./MaterialInfoUtils","./enums"],function(V,_,I,e,i,S,T,E,a){var n=function(){function V(){this._programRep=new Map,this.isInitialize=!1}return V.prototype.initialize=function(V){if(!this.isInitialize){var _=new I("icon",["iconVS","iconFS"],[],e,V);_.addDefine("ID","ID",[!1,!1],"ID"),_.addDefine("HIGHLIGHT","HIGHLIGHT",[!1,!1],"HIGHLIGHT"),_.addDefine("SDF","SDF",[!1,!1],"SDF"),_.addDefine("VV_SIZE_MIN_MAX_VALUE","VV_SIZE_MIN_MAX_VALUE",[!1,!1],"VV_SIZE_MIN_MAX_VALUE"),_.addDefine("VV_SIZE_SCALE_STOPS","VV_SIZE_SCALE_STOPS",[!1,!1],"VV_SIZE_SCALE_STOPS"),_.addDefine("VV_SIZE_FIELD_STOPS","VV_SIZE_FIELD_STOPS",[!1,!1],"VV_SIZE_FIELD_STOPS"),_.addDefine("VV_SIZE_UNIT_VALUE","VV_SIZE_UNIT_VALUE",[!1,!1],"VV_SIZE_UNIT_VALUE"),_.addDefine("VV_COLOR","VV_COLOR",[!1,!1],"VV_COLOR"),_.addDefine("VV_ROTATION","VV_ROTATION",[!1,!1],"VV_ROTATION"),_.addDefine("VV_OPACITY","VV_OPACITY",[!1,!1],"VV_OPACITY"),_.addDefine("VERTEX_VISIBILITY","VERTEX_VISIBILITY",[!1,!1],"VERTEX_VISIBILITY"),_.addDefine("PATTERN","PATTERN",[!1,!1],"PATTERN"),_.addDefine("HEATMAP","HEATMAP",[!1,!1],"HEATMAP");var E=new I("icon",["iconVS","iconFS"],[],i,V);E.addDefine("ID","ID",[!0,!0],"ID"),E.addDefine("HIGHLIGHT","HIGHLIGHT",[!0,!0],"HIGHLIGHT"),E.addDefine("SDF","SDF",[!0,!0],"SDF"),E.addDefine("VV_SIZE_MIN_MAX_VALUE","VV_SIZE_MIN_MAX_VALUE",[!0,!1],"VV_SIZE_MIN_MAX_VALUE"),E.addDefine("VV_SIZE_SCALE_STOPS","VV_SIZE_SCALE_STOPS",[!0,!1],"VV_SIZE_SCALE_STOPS"),E.addDefine("VV_SIZE_FIELD_STOPS","VV_SIZE_FIELD_STOPS",[!0,!1],"VV_SIZE_FIELD_STOPS"),E.addDefine("VV_SIZE_UNIT_VALUE","VV_SIZE_UNIT_VALUE",[!0,!1],"VV_SIZE_UNIT_VALUE"),E.addDefine("VV_COLOR","VV_COLOR",[!0,!1],"VV_COLOR"),E.addDefine("VV_ROTATION","VV_ROTATION",[!0,!1],"VV_ROTATION"),E.addDefine("VV_OPACITY","VV_OPACITY",[!0,!1],"VV_OPACITY"),E.addDefine("VERTEX_VISIBILITY","VERTEX_VISIBILITY",[!1,!1],"VERTEX_VISIBILITY"),E.addDefine("PATTERN","PATTERN",[!0,!0],"PATTERN"),E.addDefine("HEATMAP","HEATMAP",[!0,!0],"HEATMAP");var a=new I("fill",["fillVS","fillFS"],[],S,V);a.addDefine("ID","ID",[!0,!0],"ID"),a.addDefine("HIGHLIGHT","HIGHLIGHT",[!0,!0],"HIGHLIGHT"),a.addDefine("SDF","SDF",[!1,!1],"SDF"),a.addDefine("VV_SIZE_MIN_MAX_VALUE","VV_SIZE_MIN_MAX_VALUE",[!1,!1],"VV_SIZE_MIN_MAX_VALUE"),a.addDefine("VV_SIZE_SCALE_STOPS","VV_SIZE_SCALE_STOPS",[!1,!1],"VV_SIZE_SCALE_STOPS"),a.addDefine("VV_SIZE_FIELD_STOPS","VV_SIZE_FIELD_STOPS",[!1,!1],"VV_SIZE_FIELD_STOPS"),a.addDefine("VV_SIZE_UNIT_VALUE","VV_SIZE_UNIT_VALUE",[!1,!1],"VV_SIZE_UNIT_VALUE"),a.addDefine("VV_COLOR","VV_COLOR",[!0,!1],"VV_COLOR"),a.addDefine("VV_ROTATION","VV_ROTATION",[!1,!1],"VV_ROTATION"),a.addDefine("VV_OPACITY","VV_OPACITY",[!0,!1],"VV_OPACITY"),a.addDefine("VERTEX_VISIBILITY","VERTEX_VISIBILITY",[!1,!1],"VERTEX_VISIBILITY"),a.addDefine("PATTERN","PATTERN",[!0,!0],"PATTERN"),a.addDefine("HEATMAP","HEATMAP",[!1,!1],"HEATMAP");var n=new I("line",["lineVS","lineFS"],[],T,V);n.addDefine("ID","ID",[!0,!0],"ID"),n.addDefine("HIGHLIGHT","HIGHLIGHT",[!0,!0],"HIGHLIGHT"),n.addDefine("SDF","SDF",[!0,!0],"SDF"),n.addDefine("VV_SIZE_MIN_MAX_VALUE","VV_SIZE_MIN_MAX_VALUE",[!0,!1],"VV_SIZE_MIN_MAX_VALUE"),n.addDefine("VV_SIZE_SCALE_STOPS","VV_SIZE_SCALE_STOPS",[!0,!1],"VV_SIZE_SCALE_STOPS"),n.addDefine("VV_SIZE_FIELD_STOPS","VV_SIZE_FIELD_STOPS",[!0,!1],"VV_SIZE_FIELD_STOPS"),n.addDefine("VV_SIZE_UNIT_VALUE","VV_SIZE_UNIT_VALUE",[!0,!1],"VV_SIZE_UNIT_VALUE"),n.addDefine("VV_COLOR","VV_COLOR",[!0,!1],"VV_COLOR"),n.addDefine("VV_ROTATION","VV_ROTATION",[!0,!1],"VV_ROTATION"),n.addDefine("VV_OPACITY","VV_OPACITY",[!0,!1],"VV_OPACITY"),n.addDefine("VERTEX_VISIBILITY","VERTEX_VISIBILITY",[!1,!1],"VERTEX_VISIBILITY"),n.addDefine("PATTERN","PATTERN",[!0,!0],"PATTERN"),n.addDefine("HEATMAP","HEATMAP",[!1,!1],"HEATMAP"),this._textShaderVariations=_,this._fillShaderVariations=a,this._iconShaderVariations=E,this._lineShaderVariations=n,this.isInitialize=!0}},V.prototype.getProgram=function(V,_,I){if(V|=_===a.WGLDrawPhase.HITTEST?4:0,V|=_===a.WGLDrawPhase.HIGHLIGHT?8:0,this._programRep[V])return this._programRep[V];if(!this._iconShaderVariations||!this._fillShaderVariations||!this._lineShaderVariations)return null;var e,i=E.getMaterialVariations(V);switch(i.geometryType){case a.WGLGeometryType.MARKER:e=this._iconShaderVariations.getProgram(i.variations,null,null,I);break;case a.WGLGeometryType.TEXT:e=this._textShaderVariations.getProgram(i.variations,null,null,I);break;case a.WGLGeometryType.FILL:e=this._fillShaderVariations.getProgram(i.variations,null,null,I);break;case a.WGLGeometryType.LINE:e=this._lineShaderVariations.getProgram(i.variations,null,null,I)}return e&&(this._programRep[V]=e),e},V}();return n});