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

define([],function(){"use strict";function n(n,t,x){x=x||2,B=n.length/x+(t?2*t.length:0),C=!1;var i=t&&t.length,u=i?t[0]*x:n.length,f=e(n,0,u,x,!0),o=[];if(!f)return o;var l,y,a,h,p,s,c;if(i&&(f=v(n,t,f,x)),C)return o;if(n.length>80*x){l=a=n[0],y=h=n[1];for(var Z=x;u>Z;Z+=x)p=n[Z],s=n[Z+1],l>p&&(l=p),y>s&&(y=s),p>a&&(a=p),s>h&&(h=s);c=Math.max(a-l,h-y)}return r(f,o,x,l,y,c),o}function e(n,e,t,r,x){var i,u;if(x===A(n,e,t,r)>0)for(i=e;t>i;i+=r)u=k(i,n[i],n[i+1],u);else for(i=t-r;i>=e;i-=r)u=k(i,n[i],n[i+1],u);return u&&d(u,u.next)&&(j(u),u=u.next),u}function t(n,e){if(!n)return n;e||(e=n);var t,r=n,x=0,i=B*B/2;do{if(t=!1,r.steiner||!d(r,r.next)&&0!==g(r.prev,r,r.next))r=r.next;else{if(j(r),r=e=r.prev,r===r.next)return null;t=!0}if(x++>i)return C=!0,null}while(t||r!==e);return e}function r(n,e,v,o,l,y,h){if(n){!h&&y&&a(n,o,l,y);for(var p,s,c=n;n.prev!==n.next;)if(p=n.prev,s=n.next,y?i(n,o,l,y):x(n))e.push(p.i/v),e.push(n.i/v),e.push(s.i/v),j(n),n=s.next,c=s.next;else{if(C)return;if(n=s,n===c){h?1===h?(n=u(n,e,v),r(n,e,v,o,l,y,2)):2===h&&f(n,e,v,o,l,y):r(t(n),e,v,o,l,y,1);break}}}}function x(n){var e=n.prev,t=n,r=n.next;if(g(e,t,r)>=0)return!1;for(var x=n.next.next,i=0;x!==n.prev;){if(c(e.x,e.y,t.x,t.y,r.x,r.y,x.x,x.y)&&g(x.prev,x,x.next)>=0)return!1;if(x=x.next,i++>B)return C=!0,!1}return!0}function i(n,e,t,r){var x=n.prev,i=n,u=n.next;if(g(x,i,u)>=0)return!1;for(var f=x.x<i.x?x.x<u.x?x.x:u.x:i.x<u.x?i.x:u.x,v=x.y<i.y?x.y<u.y?x.y:u.y:i.y<u.y?i.y:u.y,o=x.x>i.x?x.x>u.x?x.x:u.x:i.x>u.x?i.x:u.x,l=x.y>i.y?x.y>u.y?x.y:u.y:i.y>u.y?i.y:u.y,y=p(f,v,e,t,r),a=p(o,l,e,t,r),h=n.nextZ;h&&h.z<=a;){if(h!==n.prev&&h!==n.next&&c(x.x,x.y,i.x,i.y,u.x,u.y,h.x,h.y)&&g(h.prev,h,h.next)>=0)return!1;h=h.nextZ}for(h=n.prevZ;h&&h.z>=y;){if(h!==n.prev&&h!==n.next&&c(x.x,x.y,i.x,i.y,u.x,u.y,h.x,h.y)&&g(h.prev,h,h.next)>=0)return!1;h=h.prevZ}return!0}function u(n,e,t){var r=n;do{var x=r.prev,i=r.next.next;!d(x,i)&&w(x,r,r.next,i)&&b(x,i)&&b(i,x)&&(e.push(x.i/t),e.push(r.i/t),e.push(i.i/t),j(r),j(r.next),r=n=i),r=r.next}while(r!==n);return r}function f(n,e,x,i,u,f){var v=n;do{for(var o=v.next.next;o!==v.prev;){if(v.i!==o.i&&Z(v,o)){var l=m(v,o);return v=t(v,v.next),l=t(l,l.next),r(v,e,x,i,u,f),void r(l,e,x,i,u,f)}o=o.next}v=v.next}while(v!==n)}function v(n,r,x,i){var u,f,v,y,a,h=[];for(u=0,f=r.length;f>u;u++)v=r[u]*i,y=f-1>u?r[u+1]*i:n.length,a=e(n,v,y,i,!1),a===a.next&&(a.steiner=!0),h.push(s(a));for(h.sort(o),u=0;u<h.length;u++){if(!x)return null;l(h[u],x),x=t(x,x.next)}return x}function o(n,e){return n.x-e.x}function l(n,e){if(e=y(n,e)){var r=m(e,n);t(r,r.next)}}function y(n,e){var t,r=e,x=n.x,i=n.y,u=-(1/0);do{if(!r)return null;if(i<=r.y&&i>=r.next.y){var f=r.x+(i-r.y)*(r.next.x-r.x)/(r.next.y-r.y);if(x>=f&&f>u){if(u=f,f===x){if(i===r.y)return r;if(i===r.next.y)return r.next}t=r.x<r.next.x?r:r.next}}r=r.next}while(r!==e);if(!t)return null;if(x===u)return t.prev;var v,o=t,l=t.x,y=t.y,a=1/0;for(r=t.next;r!==o;)x>=r.x&&r.x>=l&&c(y>i?x:u,i,l,y,y>i?u:x,i,r.x,r.y)&&(v=Math.abs(i-r.y)/(x-r.x),(a>v||v===a&&r.x>t.x)&&b(r,n)&&(t=r,a=v)),r=r.next;return t}function a(n,e,t,r){var x=n;do null===x.z&&(x.z=p(x.x,x.y,e,t,r)),x.prevZ=x.prev,x.nextZ=x.next,x=x.next;while(x!==n);x.prevZ.nextZ=null,x.prevZ=null,h(x)}function h(n){var e,t,r,x,i,u,f,v,o=1;do{for(t=n,n=null,i=null,u=0;t;){for(u++,r=t,f=0,e=0;o>e&&(f++,r=r.nextZ,r);e++);for(v=o;f>0||v>0&&r;)0===f?(x=r,r=r.nextZ,v--):0!==v&&r?t.z<=r.z?(x=t,t=t.nextZ,f--):(x=r,r=r.nextZ,v--):(x=t,t=t.nextZ,f--),i?i.nextZ=x:n=x,x.prevZ=i,i=x;t=r}i.nextZ=null,o*=2}while(u>1);return n}function p(n,e,t,r,x){return n=32767*(n-t)/x,e=32767*(e-r)/x,n=16711935&(n|n<<8),n=252645135&(n|n<<4),n=858993459&(n|n<<2),n=1431655765&(n|n<<1),e=16711935&(e|e<<8),e=252645135&(e|e<<4),e=858993459&(e|e<<2),e=1431655765&(e|e<<1),n|e<<1}function s(n){var e=n,t=n;do e.x<t.x&&(t=e),e=e.next;while(e!==n);return t}function c(n,e,t,r,x,i,u,f){return(x-u)*(e-f)-(n-u)*(i-f)>=0&&(n-u)*(r-f)-(t-u)*(e-f)>=0&&(t-u)*(i-f)-(x-u)*(r-f)>=0}function Z(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!z(n,e)&&b(n,e)&&b(e,n)&&M(n,e)}function g(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function d(n,e){return n.x===e.x&&n.y===e.y}function w(n,e,t,r){return d(n,e)&&d(t,r)||d(n,r)&&d(t,e)?!0:g(n,e,t)>0!=g(n,e,r)>0&&g(t,r,n)>0!=g(t,r,e)>0}function z(n,e){var t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&w(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function b(n,e){return g(n.prev,n,n.next)<0?g(n,e,n.next)>=0&&g(n,n.prev,e)>=0:g(n,e,n.prev)<0||g(n,n.next,e)<0}function M(n,e){var t=n,r=!1,x=(n.x+e.x)/2,i=(n.y+e.y)/2;do t.y>i!=t.next.y>i&&x<(t.next.x-t.x)*(i-t.y)/(t.next.y-t.y)+t.x&&(r=!r),t=t.next;while(t!==n);return r}function m(n,e){var t=new q(n.i,n.x,n.y),r=new q(e.i,e.x,e.y),x=n.next,i=e.prev;return n.next=e,e.prev=n,t.next=x,x.prev=t,r.next=t,t.prev=r,i.next=r,r.prev=i,r}function k(n,e,t,r){var x=new q(n,e,t);return r?(x.next=r.next,x.prev=r,r.next.prev=x,r.next=x):(x.prev=x,x.next=x),x}function j(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function q(n,e,t){this.i=n,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=null,this.prevZ=null,this.nextZ=null,this.steiner=!1}function A(n,e,t,r){for(var x=0,i=e,u=t-r;t>i;i+=r)x+=(n[u]-n[i])*(n[i+1]+n[u+1]),u=i;return x}var B,C;return n.deviation=function(n,e,t,r){var x=e&&e.length,i=x?e[0]*t:n.length,u=Math.abs(A(n,0,i,t));if(x)for(var f=0,v=e.length;v>f;f++){var o=e[f]*t,l=v-1>f?e[f+1]*t:n.length;u-=Math.abs(A(n,o,l,t))}var y=0;for(f=0;f<r.length;f+=3){var a=r[f]*t,h=r[f+1]*t,p=r[f+2]*t;y+=Math.abs((n[a]-n[p])*(n[h+1]-n[a+1])-(n[a]-n[h])*(n[p+1]-n[a+1]))}return 0===u&&0===y?0:Math.abs((y-u)/u)},n.flatten=function(n){for(var e=n[0][0].length,t={vertices:[],holes:[],dimensions:e},r=0,x=0;x<n.length;x++){for(var i=0;i<n[x].length;i++)for(var u=0;e>u;u++)t.vertices.push(n[x][i][u]);x>0&&(r+=n[x-1].length,t.holes.push(r))}return t},n});