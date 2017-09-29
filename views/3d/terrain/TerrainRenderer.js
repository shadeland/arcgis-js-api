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

define(["dojo/when","./tileUtils","./TerrainConst","./TileGeometryFactory","./TileRenderData","./ResourceCounter","./TileRenderer","../support/PreallocArray","../../../core/ObjectPool","../../../core/promiseUtils","../support/imageUtils","../webgl-engine/lib/ShaderVariations","dojo/text!./TerrainMaterial.xml","../webgl-engine/materials/internal/MaterialUtil","../webgl-engine/lib/Util","../lib/glMatrix","../webgl-engine/lib/RenderPass","../webgl-engine/lib/RenderSlot","../webgl-engine/lib/tracer","../../webgl/Texture","../../webgl/VertexArrayObject","../../webgl/BufferObject","../../webgl/Program","../webgl-engine/lib/DefaultVertexAttributeLocations","../webgl-engine/lib/DefaultVertexBufferLayouts","../webgl-engine/lib/screenSizePerspectiveUtils","../../webgl/Util"],function(e,t,r,i,n,a,s,l,o,d,h,u,c,f,g,v,p,m,T,R,b,D,x,y,S,E,w){var _=g.assert,A=v.vec2d,O=v.vec3d,I=v.vec4d,P=v.mat4d.identity(),N=4,M=[2,2],U=m.OPAQUE_TERRAIN,L=m.TRANSPARENT_TERRAIN,H=O.create(),G=7,B=10,C=A.create(),F=function(g,v,m){function A(){for(;Se.length<Se.data.length&&we.length>0;){var e=we.pop();Se.push(e)}Ee=Se.length}function F(){for(var e=0;e<Se.length;e++){var t=Se.data[e];_e.release(t),t.callback(e>=Ee),t.callback=null}Se.clear()}function j(e,t){var r=e.screenDepth,i=t.screenDepth;return i>r?-ue:r>i?ue:0}function k(e,t){return 0===e.tiles.length?-ue:0===t.tiles.length?ue:j(e.tiles.data[0],t.tiles.data[0])}function V(e){for(var t=e.extent,r=e.lij[0],i=0;Ee>i;){var n=Se.data[i],a=n.extent;r>=n.minLevel&&r<=n.maxLevel&&a[0]<=t[2]&&a[2]>=t[0]&&a[1]<=t[3]&&a[3]>=t[1]?(Se.swap(i,Ee-1),Ee--):i++}}v=v||256;var W,z,q,Y=!1,X=null,Z=null,Q=null,J={},K=new o(n),$=new l(10,function(){return{root:null,tiles:new l(300)}}),ee=!0,te=new t.IteratorPreorder,re=null,ie=!0,ne=1,ae=!0,se=!1,le={mode:"none",width:1.5,falloff:1.5,wireOpacity:1,surfaceOpacity:0,color:[1,1,1,0],resolution:64},oe=!1,de=!1,he=!1,ue=1,ce=!0,fe=!0,ge=null,ve=null,pe=null,me=!1,Te=[];this.updateTileBackground=function(e){return pe&&pe.cancel(),pe=e?h.requestImage(e).otherwise(function(){return null}):d.resolve(null),this.renderTileBackground(),pe};var Re=0,be=0,De=0,xe=0;this.resourceCounter=new a,this.castShadows=!0,this.clippingExtent=null,this.loaded=function(){};var ye=!1;this.needsRender=!0,this.didRender=!1,this.needsHighlight=!1,this.receiveShadows=!1;var Se=new l(10),Ee=0,we=new l(30),_e=new o(function(){this.extent=I.create(),this.minLevel=0,this.maxLevel=0,this.callback=null},!1);this.renderTileBackground=function(){return z&&pe&&ve?pe.then(function(e){me=!0,ve.setGridImage(e),X&&t.traverseTilesPreorder(X,function(e){ve.updateTileTexture(e)}.bind(this))}.bind(this)):void 0},this.initializeRenderContext=function(t){z=t.rctx,q=t.rctx.gl;var r=function(t){e(t).then(function(){Y=!0,this.setNeedsRender()}.bind(this)).otherwise(r)}.bind(this);r(this.renderTileBackground()),W=t.textureRep;var i=t.shaderSnippets,n=t.shaderRep,a=t.programRep;i.vsTerrain||i._parse(c),z.extensions.standardDerivatives;var l=new u("terrain",["vsTerrain","fsTerrain"],null,a,n,i,z);l.addDefine("Spherical","SPHERICAL"),l.addDefine("Overlay","OVERLAY"),l.addDefine("Atmosphere","ATMOSPHERE"),l.addDefine("Wireframe","WIREFRAME"),l.addDefine("TileBorders","TILE_BORDERS"),l.addBinaryShaderSnippetSuffix("Wireframe","Wireframe",[!1,!0]),l.addDefine("ReceiveShadows","RECEIVE_SHADOWS"),l.addDefine("ScreenSizePerspective","SCREEN_SIZE_PERSPECTIVE");var o=new u("terrainNormal",["vsTerrainNormal","fsNormal"],null,a,n,i,z);o.addDefine("Spherical","SPHERICAL"),o.addDefine("AlphaZero","ALPHA_ZERO"),Q={depth:a.get("depth"),depthShadowMap:a.get("depthShadowMap"),depthOnly:new x(z,i.vsTerrainDepthOnly,i.fsTerrainDepthOnly,y.Default3D),highlight:new x(z,i.vsTerrainHighlight,i.fsTerrainHighlight,y.Default3D)},Z={color:l,normal:o},this._updatePrograms(),ve=new s(z,v,a,this.resourceCounter,this.setNeedsRender.bind(this)),this.renderTileBackground(),ge=new R(z,{target:q.TEXTURE_2D,pixelFormat:q.RGBA,dataType:q.UNSIGNED_BYTE,samplingMode:q.NEAREST,width:4,height:4})},this.uninitializeRenderContext=function(e){null!=ge&&(ge.dispose(),ge=null),ve&&(ve.dispose(),ve=null)},this._updatePrograms=function(){var e="spherical"===g,t="shader"===le.mode;Q.color=Z.color.getProgram([e,!0,e&&fe,t,oe,t||oe,this.receiveShadows,se]),Q.normal=Z.normal.getProgram([e,!0]),this.setNeedsRender()},this.install=function(e){e.addExternalRenderer([U,L],this)},this.uninstall=function(e){e.removeExternalRenderer(this)},this.setRootTiles=function(e){X=e,this.setNeedsRender()},this.setNeedsHighlight=function(e){this.needsHighlight=e,this.setNeedsRender()},this.setStencilEnabledLayerExtents=function(e){Te=e,this.setNeedsRender()},this.setTileSize=function(e){v=e,ve&&(ve.tileSize=e),this.setNeedsRender()},this.loadTile=function(e){_(null===e.renderData),e.renderData=K.acquire(),e.renderData.init();var t=this.getLocalOriginOfTile(e),r=e.createGeometry(e.renderData.updateGeometryState(e),t,"debug"===le.mode,e.renderData.geometryInfo);e.renderData.localOrigin=t,this._setTileGeometry(e,r),me&&ve.updateTileTexture(e)},this.queryVisibleLevelRange=function(e,t,r,i){var n=_e.acquire();I.set(e,n.extent),t?n.minLevel=t:n.minLevel=-Number.MAX_VALUE,null!=r?n.maxLevel=r:n.maxLevel=Number.MAX_VALUE,n.callback=i,we.push(n),this.setNeedsRender()},this.updateTileTexture=function(e){ve&&me&&ve.updateTileTexture(e)},this.updateTileGeometryNeedsUpdate=function(e){return e.renderData.updateGeometryState(e).needsUpdate},this._updateTileGeometry=function(e){for(var t=e.renderData.geometryState,i=e.layerInfo[r.LayerClass.ELEVATION],n=0;n<i.length;n++)i[n].pendingUpdates&=~r.TileUpdateTypes.UPDATE_GEOMETRY;if(t.needsUpdate){e.renderData.vao&&this._releaseTileGeometry(e);var a=e.createGeometry(t,e.renderData.localOrigin,"debug"===le.mode,e.renderData.geometryInfo);return this._setTileGeometry(e,a),!0}return!1},this.updateTileGeometry=function(e){return e.renderData.updateGeometryState(e),this._updateTileGeometry(e)},this.unloadTile=function(e){this._releaseTileGeometry(e),e.renderData.texture&&e.renderData.texture.dispose(),K.release(e.renderData),e.renderData=null},this.getLocalOriginOfTile=function(e){if(e.lij[0]>=B){for(;e.lij[0]>G;)e=e.parent;return e.centerAtSeaLevel}if("spherical"===g)return H;for(;e.parent;)e=e.parent;return e.centerAtSeaLevel},this.setVisibility=function(e){ie=e,this.setNeedsRender()},this.getStats=function(){return{numTilesRendered:be,numTilesCulled:De,numTrianglesRendered:Re,numOriginsRendered:xe}},this.setDisableRendering=function(e){de=!!e,this.setNeedsRender()},this.getOpacity=function(){return ne},this.getWireframeEnabled=function(){return"shader"===le.mode},this.setDebugScreenSizePerspective=function(e){e!==se&&(se=e,this._updatePrograms())},this.setWireframe=function(e){if(e&&e!==!0||(e={mode:e?"shader":"none"}),void 0!==e.mode&&le.mode!==e.mode){var r="debug"===le.mode,i="debug"===e.mode;le.mode=e.mode,this._updatePrograms(),r!==i&&X&&t.traverseTilesPreorder(X,function(e){if(e.renderData){e.renderData.vao&&this._releaseTileGeometry(e);var t=e.createGeometry(e.renderData.updateGeometryState(e),e.renderData.localOrigin,i,e.renderData.geometryInfo);this._setTileGeometry(e,t)}}.bind(this))}for(var n in e)le.hasOwnProperty(n)&&(le[n]=e[n]),this.setNeedsRender();le.resolution&&(le.resolution=Math.min(le.resolution,v),le.resolution=1<<Math.round(Math.log(le.resolution)/Math.LN2))},this.setOpacity=function(e){ne=e,this.setNeedsRender()},this.setDrawSkirts=function(e){ae=e,this.setNeedsRender()},this.setCullBackFaces=function(e){he=e,this.setNeedsRender()},this.setRenderOrder=function(e){ue=e,this.setNeedsRender()},this.setBorders=function(e){oe!==e&&(oe=e,this._updatePrograms())},this.setFrontMostTransparent=function(e){ce!==e&&(ce=e,this.setNeedsRender())},this.setVelvetOverground=function(e){fe!==e&&(fe=e,this._updatePrograms())},this.setNeedsRender=function(){this.needsRender=!0,this.didRender=!1,ee=!0},this.resetNeedsRender=function(){this.didRender&&(this.needsRender=0!==we.length,this.didRender=!1)};var Ae=O.create();this.isTransparent=function(){return 1>ne||"shader"===le.mode&&(le.wireOpacity<1||le.surfaceOpacity<1)},this._renderMaterialPass=function(e,t){var r=this.isTransparent(),i=e.shadowMap&&e.shadowMap.getEnableState();this.receiveShadows!=i&&(this.receiveShadows=i,this._updatePrograms());var n=e.camera;if(z.setDepthTestEnabled(!0),z.setBlendingEnabled(r),r&&z.setBlendFunctionSeparate(q.SRC_ALPHA,q.ONE_MINUS_SRC_ALPHA,q.ONE,q.ONE_MINUS_SRC_ALPHA),r&&ce){var a=Q.depthOnly;z.bindProgram(a),z.setColorMask(!1,!1,!1,!1),z.setDepthWriteEnabled(!0),this._renderTilesAuxilliary(e,a,t),z.setColorMask(!0,!0,!0,!0),z.setDepthFunction(q.EQUAL),z.setDepthWriteEnabled(!1)}else z.setDepthFunction(q.LESS);var s=Q.color;z.bindProgram(s),s.setUniform1f("opacity",ne),("shader"===le.mode||oe)&&(s.setUniform1f("wireframe.width",le.width),s.setUniform1f("wireframe.falloff",Math.min(le.width,le.falloff)),s.setUniform1f("wireframe.wireOpacity",le.wireOpacity*ne),s.setUniform1f("wireframe.surfaceOpacity",le.surfaceOpacity*ne),s.setUniform4fv("wireframe.color",le.color));var n=e.camera;e.shadowMap&&e.shadowMap.bind(s),e.ssaoHelper&&e.ssaoHelper.setUniforms(s),s.setUniform1i("tex",N),s.setUniform1i("overlayTex",N+1),s.setUniformMatrix4fv("viewNormal",n.viewInverseTransposeMatrix),s.setUniformMatrix4fv("proj",n.projectionMatrix),e.lightingData.helper.setUniforms(s,!0);var l=n.viewMatrix;O.set3(l[12],l[13],l[14],Ae),O.normalize(Ae),s.setUniform3fv("viewDirection",Ae),be=0,De=0,Re=0,xe=0,A(),this._renderTiles(e,s,t),z.setBlendingEnabled(!1),z.setDepthFunction(q.LESS),z.setDepthWriteEnabled(!0),F(),be>0&&!ye&&(ye=!0,this.loaded&&this.loaded())},this._renderDepthPass=function(e,t,r){var i=e.camera;z.bindProgram(t),z.setBlendingEnabled(!1),z.setDepthTestEnabled(!0),z.setDepthFunction(q.LESS),t.setUniformMatrix4fv("model",P),t.setUniformMatrix4fv("viewNormal",i.viewInverseTransposeMatrix),C[0]=i.near,C[1]=i.far,t.setUniform2fv("nearFar",C),this._renderTilesAuxilliary(e,t,r)},this._renderNormalPass=function(e,t){var r=e.camera,i=Q.normal;z.bindProgram(i),z.setBlendingEnabled(!1),z.setDepthTestEnabled(!0),z.setDepthFunction(q.LESS),i.setUniformMatrix4fv("viewNormal",r.viewInverseTransposeMatrix),this._renderTilesAuxilliary(e,i,t)},this._renderHighlightPass=function(e,t){var r=Q.highlight;z.bindProgram(r),z.setBlendingEnabled(!1),z.setDepthTestEnabled(!0),z.setDepthFunction(q.LESS);var i=e.offscreenRenderingHelper;z.bindTexture(i.getDepthTexture(),N+2),r.setUniform1i("depthTex",N+2),r.setUniform4f("highlightViewportPixelSz",0,0,1/i.width,1/i.height),this._renderTilesAuxilliary(e,r,t,!0)},this.render=function(e){if(Y&&!de&&ie&&X&&me){var t=this.isTransparent(),r=t?L:U;if(e.slot===r){T.trace("# BEGIN RENDER TERRAIN");var i=e.pass;z.setFaceCullingEnabled(he);var n=1===e.lightingData.helper.globalFactor;if(i===p.MATERIAL)this._renderMaterialPass(e,this._updatePerOriginTileData());else if(i===p.MATERIAL_DEPTH_SHADOWMAP&&this.castShadows&&n)this._renderDepthPass(e,Q.depthShadowMap,this._updatePerOriginTileData());else if(i===p.MATERIAL_DEPTH)this._renderDepthPass(e,Q.depth,this._updatePerOriginTileData());else if(i===p.MATERIAL_NORMAL)this._renderNormalPass(e,this._updatePerOriginTileData());else if(i===p.MATERIAL_HIGHLIGHT&&this.needsHighlight){this._renderHighlightPass(e,this._updatePerOriginTileData());var a=z.gl;z.clear(a.DEPTH_BUFFER_BIT)}return he&&z.setFaceCullingEnabled(!1),T.trace("# END RENDER TERRAIN"),!0}}},this._updatePerOriginTileData=function(){if(!ee)return $;if(re=null,this._renderCollectOrigins(),0!==ue){for(var e=0;e<$.length;e++)this._sortFrontToBack($.data[e].tiles,j);this._sortFrontToBack($,k)}return ee=!1,$},this._renderCollectOrigins=function(){$.clear();for(var e=0;e<X.length;e++){var t=X[e],r=$.next();r.root=t,"spherical"===g?r.origin=H:r.origin=t.centerAtSeaLevel,r.tiles.clear(),this._renderCollectOriginsForRoot(r)}return!0},this._renderCollectOriginsForRoot=function(e){for(te.reset(e.root);!te.done;){var t=te.next(),r=t.renderData;if(!r||t.visible){var i=$.peek();if(t.lij[0]===G&&((i===e||0!==i.tiles.length)&&(i=$.next(),i.tiles.clear()),i.root=t,i.origin=t.centerAtSeaLevel),r){var n=t.lij[0];n>=B?$.peek().tiles.push(t):e.tiles.push(t),(!re||t.vlevel>re.vlevel)&&(re=t),te.skip()}}else De++,te.skip()}},this._sortFrontToBack=function(e,t){e.sort(t)},this._updateStencilReadStateForTile=function(e,t){if(e.stencilRenderingHelper&&e.stencilRenderingHelper.getEnableState()){for(var r=!1,i=0;i<Te.length;i++)if(t.intersectsExtent(Te[i])){r=!0;break}r?e.stencilRenderingHelper.enableStencilRead():e.stencilRenderingHelper.disableStencilRead()}},this._renderTilesAuxilliary=function(e,t,r,i){var n=e.camera,a=n.viewMatrix,s=e.rctx;t.setUniformMatrix4fv("proj",n.projectionMatrix),i&&t.setUniform1i("overlayTex",N+1);for(var l=0;l<r.length;l++){var o=r.data[l];t.setUniform3fv("origin",o.origin),f.bindView(o.origin,a,t);for(var d=0;d<o.tiles.length;d++){var h=o.tiles.data[d],u=h.renderData;i&&(u.highlightOverlayTexId?Oe(t,u,u.highlightOverlayTexId):s.bindTexture(ge,N+1)),this._updateStencilReadStateForTile(e,h),s.bindVAO(u.vao),w.assertCompatibleVertexAttributeLocations(u.vao,t);var c=u.vao.indexBuffer.size;ae||(c=u.geometryInfo.numWithoutSkirtIndices),s.drawElements(q.TRIANGLES,c,u.vao.indexBuffer.indexType,0)}}s.bindVAO(null),s.stencilRenderingHelper&&s.stencilRenderingHelper.disableStencilRead()},this._renderTiles=function(e,t,r){var i=e.camera,n=i.viewMatrix;if(se){var a=E.getSettings(g);a.update({distance:m.distanceToSurface,fovY:m.fovY}),f.bindScreenSizePerspective(a,t,"screenSizePerspective")}for(var s=0;s<r.length;s++){var l=r.data[s];t.setUniform3fv("origin",l.origin),f.bindView(l.origin,n,t),e.shadowMap&&e.shadowMap.bindView(t,l.origin),xe++;var o=l.tiles;if(0!==o.length){var d=q.TRIANGLES;"debug"===le.mode&&(d=q.LINES);var h,u,c=re;c?(h=c.vlevel,u=v/le.resolution):(h=16,u=v/64);for(var p=0;p<o.length;p++){var R=o.data[p],l=R.renderData;this._updateStencilReadStateForTile(e,R),T.trace("# RENDER TILE "+R.lij[0]+"/"+R.lij[1]+"/"+R.lij[2]+", screenDepth:"+R.screenDepth),t.setUniform2fv("texOffset",l.texOffset),t.setUniform1f("texScale",l.texScale);var b=l.textureReference||l.texture;if(z.bindTexture(b,N),l.overlayTexId?Oe(t,l,l.overlayTexId):(t.setUniform2fv("overlayTexOffset",M),z.bindTexture(ge,N+1)),"shader"===le.mode||oe){var D=u*(1<<h-R.vlevel);t.setUniform1f("wireframe.subdivision",D)}var x=l.vao.indexBuffer.size;ae||(x=l.geometryInfo.numWithoutSkirtIndices),z.bindVAO(l.vao),w.assertCompatibleVertexAttributeLocations(l.vao,t),z.drawElements(d,x,l.vao.indexBuffer.indexType,0),R.renderOrder=be,be++,Re+=x/3,V(R)}}}z.bindVAO(null),e.stencilRenderingHelper&&e.stencilRenderingHelper.disableStencilRead()};var Oe=function(e,t,r){var i=J[r];i||(i=W.aquire(r).getGLTexture(),_(i),J[r]=i),e.setUniform2fv("overlayTexOffset",t.overlayTexOffset),e.setUniform2fv("overlayTexScale",t.overlayTexScale),e.setUniform1f("overlayOpacity",t.overlayOpacity),z.bindTexture(i,N+1)},Ie=O.create(),Pe=O.create(),Ne=O.create(),Me=this.clippingExtent;this.intersect=function(e,r,i){if(X&&(!e.isSelection||!this.isTransparent())&&e.enableTerrain){O.subtract(i,r,Ie);var n=e.getMinResult(),a=e.getMaxResult();te.reset(X);for(var s={};!te.done;){var l=te.next();if(null!==l.renderData){if(e.enableInvisibleTerrain){if(!l.visible&&Me&&!l.intersectsExtent(Me))continue}else if(!l.visible)continue;var o=l.renderData.geometryInfo.geometry,d=l.renderData.localOrigin;O.subtract(r,d,Pe),O.subtract(i,d,Ne),f.intersectTriangleGeometry(o,s,void 0,e,Pe,Ne,function(r,i,s){if((ae||!(3*s>=l.renderData.geometryInfo.numWithoutSkirtIndices))&&r>=0&&(e.enableBackfacesTerrain||O.dot(i,Ie)<0)){var o;(void 0===n.dist||r<n.dist)&&(o=t.lij2str(l.lij[0],l.lij[1],l.lij[2]),n.set(void 0,o,r,i,void 0),n.setIntersector("terrain")),(void 0===a.dist||r>a.dist)&&(o=t.lij2str(l.lij[0],l.lij[1],l.lij[2]),a.set(void 0,o,r,i,void 0),a.setIntersector("terrain"))}})}}}},this._setTileGeometry=function(e,t){var r=e.renderData,n=t.geometry.getData(),a=n.getVertexAttr().terrain.data,s=n.getFaces()[0].indices.terrain;r.vao=new b(z,y.Default3D,{geometry:S.Pos3Tex},{geometry:D.createVertex(z,q.STATIC_DRAW,a)},D.createIndex(z,q.STATIC_DRAW,s)),r.geometryInfo.geometry&&i.releaseGeometry(r.geometryInfo.geometry),r.geometryInfo=t,this.setNeedsRender()},this._releaseTileGeometry=function(e){var t=e.renderData;t.vao.dispose(!0),t.vao=null,t.geometryInfo.geometry&&i.releaseGeometry(t.geometryInfo.geometry),t.geometryInfo.geometry=null,this.setNeedsRender()}};return F.TileRenderData=n,F});