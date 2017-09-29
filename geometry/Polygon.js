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

define(["dojo/_base/lang","../core/lang","./SpatialReference","./Geometry","./Point","./Extent","./support/coordsUtils","./support/mathUtils","./support/webMercatorUtils","./support/zmUtils"],function(e,n,t,i,r,s,a,h,l,o){var c=function(e){return function(n,t){return null==n?t:null==t?n:e(n,t)}},u=c(Math.min),f=c(Math.max),g="number",p=i.createSubclass({declaredClass:"esri.geometry.Polygon",type:"polygon",getDefaults:function(e){return{rings:[]}},normalizeCtorArgs:function(e,n){var i,r,s=null,a=null;return e&&!Array.isArray(e)?(s=e.rings?e.rings:null,n||(e.spatialReference?n=e.spatialReference:e.rings||(n=e)),i=e.hasZ,r=e.hasM):s=e,s=s||[],n=n||t.WGS84,s.length&&s[0]&&null!=s[0][0]&&typeof s[0][0]==g&&(s=[s]),a=s[0]&&s[0][0],a&&(void 0===i&&void 0===r?(i=a.length>2,r=!1):void 0===i?i=!r&&a.length>3:void 0===r&&(r=!i&&a.length>3)),{rings:s,spatialReference:n,hasZ:i,hasM:r}},_ring:0,properties:{cache:{dependsOn:["hasM","hasZ","rings"]},centroid:{readOnly:!0,dependsOn:["cache"],get:function(e){var n=a.centroid([],this.rings,this.hasZ);return isNaN(n[0])||isNaN(n[1])||this.hasZ&&isNaN(n[2])?null:(e=e||new r,e.x=n[0],e.y=n[1],e.spatialReference=this.spatialReference,this.hasZ&&(e.z=n[2]),e)}},extent:{dependsOn:["cache"],readOnly:!0,get:function(){var e=this.rings,n=e.length;if(!n||!e[0].length)return null;var t,i,r,a,h,l,o,c,g,p,m,d,v,x,y,R,M,Z,A,_,w,P,z,O=o=e[0][0][0],C=c=e[0][0][1],I=this.spatialReference,N=[],S=this.hasZ,b=this.hasM,E=S?3:2;for(m=0;n>m;m++){for(t=e[m],R=M=t[0]&&t[0][0],Z=A=t[0]&&t[0][1],v=t.length,_=w=void 0,P=z=void 0,d=0;v>d;d++)i=t[d],r=i[0],a=i[1],O=u(O,r),C=u(C,a),o=f(o,r),c=f(c,a),R=u(R,r),Z=u(Z,a),M=f(M,r),A=f(A,a),S&&i.length>2&&(h=i[2],x=u(x,h),g=f(g,h),_=u(_,h),w=f(w,h)),b&&i.length>E&&(l=i[E],y=u(x,l),p=f(g,l),P=u(_,l),z=f(w,l));N.push(new s({xmin:R,ymin:Z,zmin:_,mmin:P,xmax:M,ymax:A,zmax:w,mmax:z,spatialReference:I}))}var U=new s;return U.xmin=O,U.ymin=C,U.xmax=o,U.ymax=c,U.spatialReference=I,S&&(U.zmin=x,U.zmax=g),b&&(U.mmin=y,U.mmax=p),U.cache._partwise=N.length>1?N:null,U}},isSelfIntersecting:{dependsOn:["cache"],readOnly:!0,get:function(){var e,n,t,i,r,s,a,l,o,c,u=this.rings,f=u.length;for(i=0;f>i;i++){for(e=u[i],n=0;n<e.length-1;n++)for(s=[[e[n][0],e[n][1]],[e[n+1][0],e[n+1][1]]],t=i+1;f>t;t++)for(r=0;r<u[t].length-1;r++)if(a=[[u[t][r][0],u[t][r][1]],[u[t][r+1][0],u[t][r+1][1]]],l=h._getLineIntersection2(s,a),l&&!(l[0]===s[0][0]&&l[1]===s[0][1]||l[0]===a[0][0]&&l[1]===a[0][1]||l[0]===s[1][0]&&l[1]===s[1][1]||l[0]===a[1][0]&&l[1]===a[1][1]))return!0;if(o=e.length,!(4>=o))for(n=0;o-3>n;n++)for(c=o-1,0===n&&(c=o-2),s=[[e[n][0],e[n][1]],[e[n+1][0],e[n+1][1]]],t=n+2;c>t;t++)if(a=[[e[t][0],e[t][1]],[e[t+1][0],e[t+1][1]]],l=h._getLineIntersection2(s,a),l&&!(l[0]===s[0][0]&&l[1]===s[0][1]||l[0]===a[0][0]&&l[1]===a[0][1]||l[0]===s[1][0]&&l[1]===s[1][1]||l[0]===a[1][0]&&l[1]===a[1][1]))return!0}return!1}},rings:null},addRing:function(e){if(e){this.clearCache();var n=this.rings,t=n.length;if(Array.isArray(e[0]))n[t]=e.concat();else{var i=[];n[t]=i;for(var r=0,s=e.length;s>r;r++)i[r]=e[r].toArray()}return this}},clone:function(){var n=new p;return n.spatialReference=this.spatialReference,n.rings=e.clone(this.rings),n.hasZ=this.hasZ,n.hasM=this.hasM,n},contains:function(e){return e?(l.canProject(e,this.spatialReference)&&(e=l.project(e,this.spatialReference)),a.contains(this.rings,a.fromGeom(e))):!1},isClockwise:function(e){var n,t,i,r,s=0,a=0,h=0,l=e.length,o=this.hasZ,c=this.hasM;for(n=0;l>n;n++)t=e[n],i=e[(n+1)%l],Array.isArray(t)?(s+=t[0]*i[1]-i[0]*t[1],r=2,t.length>2&&i.length>2&&o&&(a+=t[0]*i[2]-i[0]*t[2],r=3),t.length>r&&i.length>r&&c&&(h+=t[0]*i[r]-i[0]*t[r])):(s+=t.x*i.y-i.x*t.y,t.hasZ&&i.hasZ&&(a+=t.x*i.z-i.x*t.z),t.hasM&&i.hasM&&(h+=t.x*i.m-i.x*t.m));return 0>=s&&0>=a&&0>=h},getPoint:function(e,n){if(this._validateInputs(e,n)){var t=this.rings[e][n],i=this.hasZ,s=this.hasM;return i&&!s?new r(t[0],t[1],t[2],void 0,this.spatialReference):s&&!i?new r(t[0],t[1],void 0,t[2],this.spatialReference):i&&s?new r(t[0],t[1],t[2],t[3],this.spatialReference):new r(t[0],t[1],this.spatialReference)}},insertPoint:function(e,t,i){return this._validateInputs(e)&&n.isDefined(t)&&t>=0&&t<=this.rings[e].length?(this.clearCache(),o.updateSupportFromPoint(this,i),Array.isArray(i)||(i=i.toArray()),this.rings[e].splice(t,0,i),this):void 0},removePoint:function(e,n){return this._validateInputs(e,n)?(this.clearCache(),new r(this.rings[e].splice(n,1)[0],this.spatialReference)):void 0},removeRing:function(e){if(this._validateInputs(e,null)){this.clearCache();var n,t=this.rings.splice(e,1)[0],i=t.length,s=this.spatialReference;for(n=0;i>n;n++)t[n]=new r(t[n],s);return t}},setPoint:function(e,n,t){return this._validateInputs(e,n)?(this.clearCache(),o.updateSupportFromPoint(this,t),Array.isArray(t)||(t=t.toArray()),this.rings[e][n]=t,this):void 0},toJSON:function(){var e=this.spatialReference,n={rings:this.rings,spatialReference:e&&e.toJSON()};return this.hasZ&&(n.hasZ=!0),this.hasM&&(n.hasM=!0),n},_insertPoints:function(e,n){this.clearCache(),this._ring=n,this.rings[this._ring]||(this.rings[this._ring]=[]),e.forEach(this._addPoint,this)},_validateInputs:function(e,n){return null!==e&&void 0!==e&&(0>e||e>=this.rings.length)?!1:null!==n&&void 0!==e&&(0>n||n>=this.rings[e].length)?!1:!0}});return p.createEllipse=function(e){var n,t,i,r,s=e.center.x,a=e.center.y,h=e.center.z,l=e.center.m,o=e.longAxis,c=e.shortAxis,u=e.numberOfPoints,f=e.map,g=[],m=2*Math.PI/u;for(t=0;u>t;t++)i=Math.cos(t*m),r=Math.sin(t*m),n=f.toMap({x:o*i+s,y:c*r+a}),null==h||n.hasZ||(n.z=h),null==l||n.hasM||(n.m=l),g.push(n);return g.push(g[0]),new p({rings:[g],spatialReference:f.spatialReference})},p.createCircle=function(e){var n={center:e.center,longAxis:e.r,shortAxis:e.r,numberOfPoints:e.numberOfPoints,map:e.map};return p.createEllipse(n)},p.fromExtent=function(e){var n=e.clone().normalize(),t=e.spatialReference,i=!1,r=!1;n.map(function(e){e.hasZ&&(i=!0),e.hasM&&(r=!0)});var s={rings:n.map(function(e){var n=[[e.xmin,e.ymin],[e.xmin,e.ymax],[e.xmax,e.ymax],[e.xmax,e.ymin],[e.xmin,e.ymin]];if(i&&e.hasZ)for(var t=(e.zmax-e.zmin)/2,s=0;s<n.length;s++)n[s].push(t);if(r&&e.hasM){var a=(e.mmax-e.mmin)/2;for(s=0;s<n.length;s++)n[s].push(a)}return n}),spatialReference:t?t.toJSON():null};return i&&(s.hasZ=!0),r&&(s.hasM=!0),new p(s)},p});