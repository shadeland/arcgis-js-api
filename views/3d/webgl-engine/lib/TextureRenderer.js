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

define(["require","exports","./Renderer","./Camera","./Util","./gl-matrix","../materials/internal/TexOnlyGLMaterial","./ModelDirtyTypesTs","./RenderPass","./HighlightUtils","./ComponentUtils","../../../webgl/FramebufferObject","../../../webgl/VertexArrayObject","../../../webgl/BufferObject","../../../webgl/Util","../../../webgl/Texture","../../support/debugFlags","../lighting/Lightsources","../../../webgl/enums","./DefaultVertexBufferLayouts","./DefaultVertexAttributeLocations"],function(e,t,r,i,n,a,s,o,h,d,u,l,g,p,c,_,f,m,y,x,T){var v=a.vec3d,w=a.vec4d,b=a.mat4d,R=function(){function e(e,t,i,n,a,s){var o=this;this._acquiredTextures={},this._clearColor=w.createFrom(0,0,0,0),this._id2origin={},this._uniqueIdx=0,this._rctx=e,this._canvas=t,this._programRep=i,this._materialRep=n,this._textureRep=a,this._modelDirtySet=s,this._renderer=new r(i,n,a,this._rctx,!0),this._renderer.onHasHighlightsChanged=function(e){o.onHasHighlightsChanged&&o.onHasHighlightsChanged(e)},this._renderer.setLighting({lights:[new m.AmbientLight(v.createFrom(1,1,1))],groundLightingFactor:1,globalFactor:0})}return e.prototype.dispose=function(){for(var e in this._acquiredTextures)this._acquiredTextures[e].fbo.dispose(),this._textureRep.release(e);this._acquiredTextures=null,this._renderer.dispose(),this._renderer=null},e.prototype.addRenderGeometries=function(e){var t=this;e.forEach(function(e){null==e.origin&&(e.origin=t.getOrigin(e.center,e.bsRadius)),e.idx=t._uniqueIdx++}),this._renderer.modify(e,[])},e.prototype.removeRenderGeometries=function(e){this._renderer.modify([],e)},e.prototype.updateRenderGeometries=function(e,t){var r=e.map(function(e){return{renderGeometry:e,updateType:t}});this._renderer.modify([],[],r,{})},e.prototype.updateRenderOrder=function(e){Object.keys(e).length>0&&this._renderer.modifyRenderOrder(e)},e.prototype.setBackgroundColor=function(e){this._clearColor=e},e.prototype.addRenderGeometryHighlight=function(e,t){var r=e.instanceParameters,i=d.generateHighlightId();return r.componentHighlights=u.addHighlight(r.componentHighlights,null,t,i),this.updateRenderGeometries([e],32),i},e.prototype.removeRenderGeometryHighlight=function(e,t){var r=e.instanceParameters;r.componentHighlights=u.removeHighlight(r.componentHighlights,t),this.updateRenderGeometries([e],32)},e.prototype.isEmpty=function(){return this._renderer.isEmpty()},e.prototype.processDirtyMaterials=function(){var e=this._modelDirtySet.getDirtyMaterials();e&&this._renderer.modify([],[],[],e),this._modelDirtySet.clearDirtyMaterials()},Object.defineProperty(e.prototype,"hasHighlights",{get:function(){return this._renderer.hasHighlights},enumerable:!0,configurable:!0}),e.prototype.draw=function(e,t){return this.drawPass(h.MATERIAL,e,t)},e.prototype.drawHighlights=function(e,t){return this.drawPass(h.MATERIAL_HIGHLIGHT,e,t)},e.prototype.drawPass=function(e,t,r){if(this.isEmpty()&&!f.OVERLAY_DRAW_TEST_TEXTURE)return!1;if(this.processDirtyMaterials(),e===h.MATERIAL_HIGHLIGHT&&!this.hasHighlights)return!1;var i,n=t.getId(),a=this._rctx,s=a.gl;if(this._acquiredTextures[n])i=this._acquiredTextures[n].fbo;else{var o=this._textureRep.aquire(n).getGLTexture();i=l.createWithAttachments(this._rctx,o,{colorTarget:0,depthStencilTarget:0});var d=Object.keys(this._acquiredTextures).length;this._acquiredTextures[n]={texture:t,fbo:i,idx:d}}var u=r.width,g=r.height;(i.width!==u||i.height!==g)&&(i.resize(u,g),i.colorTexture.setSamplingMode(9729)),H.near=1,H.far=1e4,a.bindFramebuffer(i),a.setDepthTestEnabled(!1),a.setBlendFunctionSeparate(770,771,1,771),a.setClearColor.apply(a,this._clearColor),a.clear(s.COLOR_BUFFER_BIT),this._renderer.setPixelRatio(r.pixelRatio||1);for(var p=0;p<r.views.length;p++){var c=r.views[p];H.viewport=c.viewport,b.ortho(0,c.extent[2]-c.extent[0],0,c.extent[3]-c.extent[1],H.near,H.far,H.projectionMatrix),b.identity(H.viewMatrix),b.translate(H.viewMatrix,[-c.extent[0],-c.extent[1],0]),H.setGLViewport(this._rctx),f.OVERLAY_DRAW_TEST_TEXTURE&&this._drawTestTexture(u,g,M[this._acquiredTextures[n].idx%M.length]),this._renderer.renderGeometryPass(e,H)}return a.setDepthTestEnabled(!0),a.setBlendFunctionSeparate(770,771,1,771),a.bindFramebuffer(null),a.setViewport(0,0,this._canvas.width,this._canvas.height),!0},e.prototype._drawTestTexture=function(e,t,r){var i=this._rctx,n=i.gl;if(!this._testPatternMat){for(var a=new Uint8Array(e*t*4),o=0,h=0;t>h;h++)for(var d=0;e>d;d++){var u=Math.floor(d/10),l=Math.floor(h/10);2>u||2>l||10*u>e-20||10*l>t-20?(a[o++]=255,a[o++]=255,a[o++]=255,a[o++]=255):(a[o++]=255,a[o++]=255,a[o++]=255,1&u&&1&l?a[o++]=1&d^1&h?0:255:a[o++]=1&u^1&l?0:128)}var f=new _(i,{target:3553,pixelFormat:6408,dataType:5121,samplingMode:9728,width:e,height:t},a);this._testPatternMat=new s(this._programRep,f,[1,1,1,1],!0,n.ALWAYS),this._testPatternBindParams={proj:b.identity(),view:b.identity(),nearFar:[-1,1],origin:[0,0,0]};var m=new Float32Array([-1,-1,0,0,0,1,-1,0,1,0,-1,1,0,0,1,1,1,0,1,1]);this._quadVAO=new g(i,T.Default3D,{geometry:x.Pos3Tex},{geometry:p.createVertex(i,35044,m)})}this._testPatternMat.setColor([r[0],r[1],r[2],1]),this._testPatternMat.bind(i,this._testPatternBindParams),this._testPatternMat.bindView(i,this._testPatternBindParams),i.bindVAO(this._quadVAO),i.drawArrays(5,0,c.vertexCount(this._quadVAO,"geometry")),this._testPatternMat.release(i)},e.prototype.getOrigin=function(e,t){var r=1e4,i=10,a=0,s=t*i/r;s>1&&(a=Math.ceil(n.logWithBase(s,2)));var o=Math.pow(2,a)*r,h=Math.round(e[0]/o),d=Math.round(e[1]/o),u=Math.round(e[2]/o),l=a+"_"+h+"_"+d+"_"+u,g=this._id2origin[l];return null==g&&(g={vec3:v.createFrom(h*o,d*o,u*o),id:l},this._id2origin[l]=g),g},e}(),M=[[1,.5,.5],[.5,.5,1],[.5,1,.5]],H=new i;return R});