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

define(["require","exports","../lib/Renderer","../lib/SSAOHelperObscurance","../lib/ShadowMap","../lib/NearFarCalc","../lib/Util","../lib/gl-matrix","../lib/RenderPass","../lib/HighlightHelper","../lib/OffscreenRenderingHelper"],function(e,t,s,a,r,i,n,o,d,h,p){var l=o.vec3d,_=o.mat4d,u=n.assert,g=function(){function e(e,t,n,o){this._drawShadowMapDebugQuad=!1,this._drawSSAOMapDebugQuad=!1,this._needsRender=!0,this._content={},this._rctx=o,this._renderer=new s(e,t,n,this._rctx,!1),this._programRep=e,this._shadowMap=new r(e,this._rctx),this._ssaoHelper=new a(e,n,this._rctx,this.setNeedsRender.bind(this)),this._nearFarCalc=new i,this._highlightHelper=new h(e,n,this._rctx),this._offscreenRenderingHelper=new p(e,this._rctx)}return e.prototype.getCombinedStats=function(){return this._renderer.getCombinedStats()},e.prototype.dispose=function(){this._renderer.dispose(),this._shadowMap.getEnableState()&&this._shadowMap.setEnableState(!1),this._shadowMap.dispose(),this._ssaoHelper.getEnableState()&&this._ssaoHelper.setEnableState(!1),this._ssaoHelper.dispose(),this._highlightHelper.getEnableState()&&this._highlightHelper.setEnableState(!1),this._offscreenRenderingHelper.getEnableState()&&this._offscreenRenderingHelper.setEnableState(!1)},e.prototype.setLighting=function(e){this._renderer.setLighting(e)},e.prototype.getViewParams=function(e){var t=e||{};return(!e||e.pixelRatio)&&(t.pixelRatio=this._renderer.getPixelRatio()),t},e.prototype.setViewParams=function(e){null!=e.pixelRatio&&this._renderer.setPixelRatio(e.pixelRatio)},e.prototype.setRenderParams=function(e){void 0!==e.shadowMapResolution&&this._shadowMap.getEnableState()===!1&&this._shadowMap.setTextureResolution(e.shadowMapResolution),void 0!==e.shadowMap&&e.shadowMap!==this._shadowMap.getEnableState()&&this._shadowMap.setEnableState(e.shadowMap),void 0!==e.shadowMapMaxCascades&&this._shadowMap.setMaxNumCascades(e.shadowMapMaxCascades),!0!==this._highlightHelper.getEnableState()&&this._highlightHelper.setEnableState(!0),void 0!==e.ssao&&e.ssao!==this._ssaoHelper.getEnableState()&&this._ssaoHelper.setEnableState(e.ssao),void 0!==e.ssaoAttenuation&&this._ssaoHelper.setAttenuation(e.ssaoAttenuation),void 0!==e.ssaoRadius&&this._ssaoHelper.setRadius(e.ssaoRadius),void 0!==e.ssaoFilterRadius&&console.error("The property ssaoFilterRadius is no longer supported as a render parameter."),void 0!==e.ssaoSamples&&this._ssaoHelper.setSamples(e.ssaoSamples),void 0!==e.drawShadowMapDebugQuad&&(this._drawShadowMapDebugQuad=e.drawShadowMapDebugQuad),void 0!==e.drawSSAODebugQuad&&(this._drawSSAOMapDebugQuad=e.drawSSAODebugQuad),this._ssaoHelper.getEnableState()?this._renderer.ssaoEnabled=!0:this._renderer.ssaoEnabled=!1,void 0!==e.offscreenRendering&&e.offscreenRendering!==this._offscreenRenderingHelper.getEnableState()&&this._offscreenRenderingHelper.setEnableState(e.offscreenRendering),void 0!==e.antialiasingEnabled&&(e.antialiasingEnabled?this._renderer.renderOptions.antialiasing="smaa":this._renderer.renderOptions.antialiasing="none"),void 0!==e.earlyOcclusionPixelDraw&&(this._renderer.renderOptions.earlyOcclusionPixelDraw=e.earlyOcclusionPixelDraw),void 0!==e.defaultHighlightOptions&&this._highlightHelper.setDefaultOptions(e.defaultHighlightOptions),this._needsRender=!0},e.prototype.getRenderParams=function(){var e={};return this._shadowMap.getIsSupported()&&(e.shadowMap=this._shadowMap.getEnableState(),e.shadowMapResolution=this._shadowMap.getTextureResolution(),e.shadowMapMaxCascades=this._shadowMap.getMaxNumCascades()),this._ssaoHelper.getIsSupported()&&(e.ssao=this._ssaoHelper.getEnableState(),e.ssaoAttenuation=this._ssaoHelper.getAttenuation(),e.ssaoRadius=this._ssaoHelper.getRadius(),e.ssaoFilterRadius=this._ssaoHelper.getFilterRadius(),e.ssaoSamples=this._ssaoHelper.getSamples()),e},e.prototype.modify=function(e,t,s,a){this._renderer.modify(e,t,s,a);for(var r=0;r<t.length;++r)delete this._content[t[r].uniqueName];for(var r=0;r<e.length;++r)this._content[e[r].uniqueName]=e[r];for(var r=0;r<s.length;++r)u(this._content[s[r].renderGeometry.uniqueName]===s[r].renderGeometry)},e.prototype.getContent=function(){return this._content},e.prototype.getPickRay=function(e,t,s,a,r,i){l.unproject(l.createFrom(e[0],e[1],0),a,s.projectionMatrix,s.fullViewport,r),l.unproject(l.createFrom(e[0],e[1],1),a,s.projectionMatrix,s.fullViewport,i)},e.prototype.getProjectionMatrix=function(e,t,s,a,r){var i=n.fovx2fovy(t,e[2],e[3]);_.perspective(180*i/Math.PI,e[2]/e[3],s,a,r)},e.prototype.addExternalRenderer=function(e,t){return this._renderer.addExternalRenderer(e,t)},e.prototype.removeExternalRenderer=function(e){return this._renderer.removeExternalRenderer(e)},e.prototype.getExternalRenderers=function(){return this._renderer.getExternalRenderers()},e.prototype.resetNeedsRender=function(){this._needsRender=!1,this._renderer.resetNeedsRender()},e.prototype.needsRender=function(){return this._needsRender||this._renderer.needsRender()},e.prototype.setNeedsRender=function(){this._needsRender=!0},e.prototype.render=function(e,t,s){var a,r=e.viewport;if(this._shadowMap.getEnableState()){a=this._nearFarCalc.calculateSceneNearFar(e,this._content),this._shadowMap.prepare(e,t,this._content,a);for(var i=this._shadowMap.getCascades(),n=0;n<i.length;++n){var o=i[n];o.camera.setGLViewport(this._rctx),this._renderer.renderGeometryPass(d.MATERIAL_DEPTH_SHADOWMAP,o.camera)}this._shadowMap.finish(s),e.setGLViewport(this._rctx)}if(this._shadowMap.bindAll(this._programRep),this._renderer.renderAuxiliaryBuffers(e,this._shadowMap,this._ssaoHelper,s,this._offscreenRenderingHelper),this._renderer.render(e,this._shadowMap,this._ssaoHelper,s,this._highlightHelper,this._offscreenRenderingHelper),this._drawShadowMapDebugQuad&&this._shadowMap.getEnableState()){var h=_.ortho(r[0],r[2],r[1],r[3],-1,1);this._shadowMap.drawDebugQuad(h)}if(this._drawSSAOMapDebugQuad&&this._ssaoHelper.getEnableState()){var h=_.ortho(r[0],r[2],r[1],r[3],-1,1);this._ssaoHelper.drawQuad(h)}},e}();return g});