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

define(["dojo/_base/lang","../core/lang","./SpatialReference","./Geometry","./Point","./support/webMercatorUtils","./support/mathUtils","./support/spatialReferenceUtils"],function(i,t,n,e,s,a,m,h){var r=e.createSubclass({declaredClass:"esri.geometry.Extent",type:"extent",normalizeCtorArgs:function(t,e,s,a,m){return this.isSR(t)?{spatialReference:t,xmin:0,ymin:0,xmax:0,ymax:0}:i.isObject(t)?(t.spatialReference=null!=t.spatialReference?t.spatialReference:n.WGS84,t):{xmin:t,ymin:e,xmax:s,ymax:a,spatialReference:null!=m?m:n.WGS84}},properties:{cache:{dependsOn:["xmin","ymin","zmin","mmin","xmax","ymax","zmax","mmax"]},center:{readOnly:!0,dependsOn:["cache"],get:function(i){return i||(i=new s({spatialReference:this.spatialReference})),i.x=.5*(this.xmin+this.xmax),i.y=.5*(this.ymin+this.ymax),this.hasZ&&(i.z=.5*(this.zmin+this.zmax)),this.hasM&&(i.m=.5*(this.mmin+this.mmax)),i}},extent:{readOnly:!0,dependsOn:["cache"],get:function(){return this.clone()}},hasM:{readOnly:!0,dependsOn:["mmin","mmax"],get:function(){return null!=this.mmin&&null!=this.mmax}},hasZ:{readOnly:!0,dependsOn:["zmin","zmax"],get:function(){return null!=this.zmin&&null!=this.zmax}},height:{readOnly:!0,dependsOn:["ymin","ymax"],get:function(){return Math.abs(this.ymax-this.ymin)}},width:{readOnly:!0,dependsOn:["xmin","xmax"],get:function(){return Math.abs(this.xmax-this.xmin)}},xmin:0,ymin:0,mmin:void 0,zmin:void 0,xmax:0,ymax:0,mmax:void 0,zmax:void 0},centerAt:function(i){var t=this.center;return null!=i.z&&this.hasZ?this.offset(i.x-t.x,i.y-t.y,i.z-t.z):this.offset(i.x-t.x,i.y-t.y)},clone:function(){var i=new r;return i.xmin=this.xmin,i.ymin=this.ymin,i.xmax=this.xmax,i.ymax=this.ymax,i.spatialReference=this.spatialReference,null!=this.zmin&&(i.zmin=this.zmin,i.zmax=this.zmax),null!=this.mmin&&(i.mmin=this.mmin,i.mmax=this.mmax),i},contains:function(i){if(!i)return!1;var t=i.type;if("point"===t){var n,e=this.spatialReference,m=i.spatialReference,h=i.x,r=i.y,x=i.z;return e&&m&&!e.equals(m)&&a.canProject(e,m)&&(n=e.isWebMercator?s.lngLatToXY(h,r):s.xyToLngLat(h,r,!0),h=n[0],r=n[1]),h>=this.xmin&&h<=this.xmax&&r>=this.ymin&&r<=this.ymax?null!=x&&this.hasZ?x>=this.zmin&&x<=this.zmax:!0:!1}return"extent"===t?this._containsExtent(i):!1},equals:function(i){if(!i)return!1;var t=this.spatialReference;if(!t.equals(i.spatialReference)){if(!a.canProject(i.spatialReference,t))return!1;i=a.project(i,t)}return this.xmin===i.xmin&&this.ymin===i.ymin&&this.zmin===i.zmin&&this.mmin===i.mmin&&this.xmax===i.xmax&&this.ymax===i.ymax&&this.zmax===i.zmax&&this.mmax===i.mmax},expand:function(i){var t=.5*(1-i),n=this.width*t,e=this.height*t;if(this.xmin+=n,this.ymin+=e,this.xmax-=n,this.ymax-=e,this.hasZ){var s=(this.zmax-this.zmin)*t;this.zmin+=s,this.zmax-=s}if(this.hasM){var a=(this.mmax-this.mmin)*t;this.mmin+=a,this.mmax-=a}return this},intersects:function(i){if(!i)return!1;var t=i.type,n=this.spatialReference,e=i.spatialReference;switch(n&&e&&!n.equals(e)&&a.canProject(n,e)&&(i=n.isWebMercator?a.geographicToWebMercator(i):a.webMercatorToGeographic(i,!0)),t){case"point":return this.contains(i);case"multipoint":return this._intersectsMultipoint(i);case"extent":return this._intersectsExtent(i);case"polygon":return this._intersectsPolygon(i);case"polyline":return this._intersectsPolyline(i)}},normalize:function(){var i=this._normalize(!1,!0);return Array.isArray(i)||(i=[i]),i},offset:function(i,t,n){return this.xmin+=i,this.ymin+=t,this.xmax+=i,this.ymax+=t,null!=n&&(this.zmin+=n,this.zmax+=n),this},shiftCentralMeridian:function(){return this._normalize(!0)},toJSON:function(){var i=this.spatialReference,t={xmin:this.xmin,ymin:this.ymin,xmax:this.xmax,ymax:this.ymax,spatialReference:i&&i.toJSON()};return this.hasZ&&(t.zmin=this.zmin,t.zmax=this.zmax),this.hasM&&(t.mmax=this.mmax,t.mmin=this.mmin),t},union:function(i){function t(i,t,n){return null==t?n:null==n?t:i(t,n)}return this.xmin=Math.min(this.xmin,i.xmin),this.ymin=Math.min(this.ymin,i.ymin),this.xmax=Math.max(this.xmax,i.xmax),this.ymax=Math.max(this.ymax,i.ymax),(this.hasZ||i.hasZ)&&(this.zmin=t(Math.min,this.zmin,i.zmin),this.zmax=t(Math.max,this.zmax,i.zmax)),(this.hasM||i.hasM)&&(this.mmin=t(Math.min,this.mmin,i.mmin),this.mmax=t(Math.max,this.mmax,i.mmax)),this},intersection:function(i){function t(i,t,n){return null==t?n:null==n?t:i(t,n)}return this._intersectsExtent(i)?(this.xmin=Math.max(this.xmin,i.xmin),this.ymin=Math.max(this.ymin,i.ymin),this.xmax=Math.min(this.xmax,i.xmax),this.ymax=Math.min(this.ymax,i.ymax),(this.hasZ||i.hasZ)&&(this.zmin=t(Math.max,this.zmin,i.zmin),this.zmax=t(Math.min,this.zmax,i.zmax)),(this.hasM||i.hasM)&&(this.mmin=t(Math.max,this.mmin,i.mmin),this.mmax=t(Math.min,this.mmax,i.mmax)),this):null},_containsExtent:function(i){var t=i.xmin,n=i.ymin,e=i.zmin,a=i.xmax,m=i.ymax,h=i.zmax,r=i.spatialReference;return null!=e&&this.hasZ?this.contains(new s(t,n,e,r))&&this.contains(new s(t,m,e,r))&&this.contains(new s(a,m,e,r))&&this.contains(new s(a,n,e,r))&&this.contains(new s(t,n,h,r))&&this.contains(new s(t,m,h,r))&&this.contains(new s(a,m,h,r))&&this.contains(new s(a,n,h,r)):this.contains(new s(t,n,r))&&this.contains(new s(t,m,r))&&this.contains(new s(a,m,r))&&this.contains(new s(a,n,r))},_intersectsMultipoint:function(i){var t,n=i.points.length;for(t=0;n>t;t++)if(this.contains(i.getPoint(t)))return!0;return!1},_intersectsExtent:function(i){var t,n,e,s=this.hasZ&&i.hasZ;if(this.xmin<=i.xmin){if(t=i.xmin,this.xmax<t)return!1}else if(t=this.xmin,i.xmax<t)return!1;if(this.ymin<=i.ymin){if(n=i.ymin,this.ymax<n)return!1}else if(n=this.ymin,i.ymax<n)return!1;if(s&&i.hasZ)if(this.zmin<=i.zmin){if(e=i.zmin,this.zmax<e)return!1}else if(e=this.zmin,i.zmax<e)return!1;return!0},_intersectsPolygon:function(i){var t,n,e,a,m=[this.xmin,this.ymax],h=[this.xmax,this.ymax],r=[this.xmin,this.ymin],x=[this.xmax,this.ymin],c=[m,h,r,x],o=[[r,m],[m,h],[h,x],[x,r]],f=i.rings,u=f.length,l=new s(0,0,this.spatialReference);for(a=c.length,t=0;a>t;t++)if(l.x=c[t][0],l.y=c[t][1],i.contains(l))return!0;l={x:0,y:0,spatialReference:i.spatialReference,type:"point"};var y,p;for(t=0;u>t;t++)if(e=f[t],a=e.length){if(y=e[0],l.x=y[0],l.y=y[1],this.contains(l))return!0;for(n=1;a>n;n++){if(p=e[n],l.x=p[0],l.y=p[1],this.contains(l)||this._intersectsLine([y,p],o))return!0;y=p}}return!1},_intersectsPolyline:function(i){var t,n,e,s,a,m,h=[[[this.xmin,this.ymin],[this.xmin,this.ymax]],[[this.xmin,this.ymax],[this.xmax,this.ymax]],[[this.xmax,this.ymax],[this.xmax,this.ymin]],[[this.xmax,this.ymin],[this.xmin,this.ymin]]],r=i.paths,x=r.length,c={x:0,y:0,spatialReference:i.spatialReference,type:"point"};for(t=0;x>t;t++)if(e=r[t],s=e.length){if(a=e[0],c.x=a[0],c.y=a[1],this.contains(c))return!0;for(n=1;s>n;n++){if(m=e[n],c.x=m[0],c.y=m[1],this.contains(c)||this._intersectsLine([a,m],h))return!0;a=m}}return!1},_intersectsLine:function(i,t){var n,e=m._getLineIntersection2,s=t.length;for(n=0;s>n;n++)if(e(i,t[n]))return!0;return!1},_shiftCM:function(i){var e=this.spatialReference;if(i=i||h.getInfo(e)){var s=this._getCM(i);if(s){var m=e.isWebMercator?a.webMercatorToGeographic(s):s;this.xmin-=s.x,this.xmax-=s.x,e.isWebMercator||(m.x=this._normalizeX(m.x,i).x),this.spatialReference=new n(t.substitute({Central_Meridian:m.x},e.isWGS84?i.altTemplate:i.wkTemplate))}}return this},_getCM:function(i){var t,n=i.valid[0],e=i.valid[1],s=this.xmin,a=this.xmax,m=s>=n&&e>=s,h=a>=n&&e>=a;return m&&h||(t=this.center),t},_normalize:function(i,t,n){var e=this.spatialReference;if(e&&(n=n||h.getInfo(e))){var s=this._getParts(n).map(function(i){return i.extent});if(s.length>2)return i?this._shiftCM(n):this.set({xmin:n.valid[0],xmax:n.valid[1]});if(2===s.length){if(i)return this._shiftCM(n);if(t)return s;var a=!0,m=!0;return s.map(function(i){i.hasZ||(a=!1),i.hasM||(m=!1)}),{rings:s.map(function(i){var t=[[i.xmin,i.ymin],[i.xmin,i.ymax],[i.xmax,i.ymax],[i.xmax,i.ymin],[i.xmin,i.ymin]];if(a)for(var n=(i.zmax-i.zmin)/2,e=0;e<t.length;e++)t[e].push(n);if(m){var s=(i.mmax-i.mmin)/2;for(e=0;e<t.length;e++)t[e].push(s)}return t}),hasZ:a,hasM:m,spatialReference:e}}return s[0]||this}return this},_getParts:function(i){var t=this.cache._parts;if(!t){t=[];var n,e,s,a,m=this.xmin,x=this.xmax,c=this.ymin,o=this.ymax,f=this.spatialReference,u=this.width,l=m,y=x,p=0,z=0;if(i=i||h.getInfo(f),e=i.valid[0],s=i.valid[1],n=this._normalizeX(m,i),m=n.x,p=n.frameId,n=this._normalizeX(x,i),x=n.x,z=n.frameId,a=m===x&&u>0,u>2*s){var d,M=new r(y>l?m:x,c,s,o,f),v=new r(e,c,y>l?x:m,o,f),g=new r(0,c,s,o,f),_=new r(e,c,0,o,f),R=[],w=[];for(M.contains(g)&&R.push(p),M.contains(_)&&w.push(p),v.contains(g)&&R.push(z),v.contains(_)&&w.push(z),d=p+1;z>d;d++)R.push(d),w.push(d);t.push({extent:M,frameIds:[p]},{extent:v,frameIds:[z]},{extent:g,frameIds:R},{extent:_,frameIds:w})}else m>x||a?t.push({extent:new r(m,c,s,o,f),frameIds:[p]},{extent:new r(e,c,x,o,f),frameIds:[z]}):t.push({extent:new r(m,c,x,o,f),frameIds:[p]});this.cache._parts=t}var Z=this.hasZ,b=this.hasM;if(Z||b){var O={};Z&&(O.zmin=this.zmin,O.zmax=this.zmax),b&&(O.mmin=this.mmin,O.mmax=this.mmax);for(var I=0;I<t.length;I++)t[I].extent.set(O)}return t},_normalizeX:function(i,t){var n,e=0,s=t.valid[0],a=t.valid[1],m=2*a;return i>a?(n=Math.ceil(Math.abs(i-a)/m),i-=n*m,e=n):s>i&&(n=Math.ceil(Math.abs(i-s)/m),i+=n*m,e=-n),{x:i,frameId:e}}});return r});