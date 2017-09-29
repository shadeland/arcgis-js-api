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

define(["require","dojo/_base/config","dojo/Deferred","dojo/_base/lang","dojo/_base/url","dojo/request","dojo/io-query","./config","./core/Error","./core/global","./core/sniff","./core/lang","./core/urlUtils","./core/deferredUtils","./core/promiseUtils","./core/requireUtils","dojo/has!host-browser?./core/request/script","dojo/has!host-webworker?./core/workers/request"],function(e,r,t,n,o,s,i,a,l,u,c,d,f,h,g,p,m,v){function w(e){var r=i.objectToQuery(e.content);if(r&&(e.url+=(-1===e.url.indexOf("?")?"?":"&")+r),e.url.length>2e3){if(!f.isDataProtocol(e.url))return g.reject(n.mixin(new Error,{message:"When using responseType 'image', URL length cannot exceed 2000 characters."}));if(e.url.length>3e6)return g.reject(n.mixin(new Error,{message:"When using responseType 'image', data URL length cannot exceed 3000000 characters."}))}var o=new Image;e.allowImageDataAccess&&(e.withCredentials?o.crossOrigin="use-credentials":o.crossOrigin="anonymous");var s=!1,a=new t(function(e){s=!0,o.onload=o.onerror=o.onabort=null,o.src=""}),l=function(e){o.onload=o.onerror=o.onabort=null,s||a.reject(new Error("Unable to load the resource"))};return o.onload=function(){o.onload=o.onerror=o.onabort=null,s||a.resolve(this)},o.onerror=l,o.onabort=l,o.alt="",o.src=e.url,a.promise}function b(e){return e=new o(e),(e.host+(e.port?":"+e.port:"")).toLowerCase()}function y(){return T?T:T=p.when(e,"./identity/IdentityManager").then(function(e){U=e})}function C(e,r){var o=!!e.useProxy,a=e.method||"auto",l=d.isDefined(e.crossOrigin)?e.crossOrigin:A.useCors;e=n.mixin({},e),e._ssl&&(e.url=e.url.replace(/^http:/i,"https:"));var u=e.content,h=e.url;e._token&&(e.content=e.content||{},e.content.token=e._token);var g,p=0;h&&(g=i.objectToQuery(u),p=g.length+h.length+1,c("esri-url-encodes-apostrophe")&&(p=g.replace(/'/g,"%27").length+h.length+1)),e.timeout=d.isDefined(e.timeout)?e.timeout:A.timeout,e.handleAs=e.handleAs||"json";try{var v,b,y=l&&f.canUseXhr(e.urlObj)&&!/https?:\/\/[^\/]+\/[^\/]+\/admin\/?(\/.*)?$/i.test(e.url),C=f.hasSameOrigin(e.urlObj,f.appUrl)||y,_="post"===a||!!e.body||p>A.maxUrlLength,j=!C&&-1!==e.handleAs.indexOf("json")&&e.callbackParamName&&!e.body,O=!!f.getProxyRule(e.url)||A.forceProxy||o||("image"!==e.handleAs||e.allowImageDataAccess)&&(!j||_)&&!C;if((c("host-browser")||c("host-webworker"))&&O)if(v=f.getProxyUrl(h,l),b=v.path,v._xo&&(y=!0),!_&&b.length+1+p>A.maxUrlLength&&(_=!0),e.url=b+"?"+h,_)e.content=n.mixin(v.query||{},u);else{var x=i.objectToQuery(n.mixin(v.query||{},u));x&&(e.url+=(-1===h.indexOf("?")?"?":"&")+x),e.content=null}if(j&&!_&&!O&&c("host-browser"))return e=S?S(e):e,e.jsonp=e.callbackParamName,e.query=e.content,m.get(e.url,e);var k=e.headers;if(!c("host-browser")&&!c("host-webworker")||k&&k.hasOwnProperty("X-Requested-With")||(k=e.headers=k||{},k["X-Requested-With"]=null),c("host-browser")&&r){var q=e.content&&e.content.token;q&&(r.set?r.set("token",q):r.append("token",q)),e.contentType=!1}if(y&&!e.hasOwnProperty("withCredentials")&&"with-credentials"===A.useCors){var D=O?b:h,T=f.getCorsConfig(D);if(T&&T.hasOwnProperty("withCredentials"))T.withCredentials&&(e.withCredentials=!0);else if(U){var P=U.findServerInfo(D);P&&P.webTierAuth&&(e.withCredentials=!0)}}return e=S?S(e):e,"image"===e.handleAs?w(e):_?(e.body?(e.data=r||e.body,e.query=e.content):e.data=e.content,delete e.body,delete e.content,!O&&c("safari")&&(e.url+=(-1===e.url.indexOf("?")?"?":"&")+"_ts="+(new Date).getTime()+I++),s.post(e.url,e)):(e.query=e.content,delete e.content,s.get(e.url,e))}catch(L){var E=new t;return E.reject(L),E.promise}}function _(e){var n=A.corsStatus,o=f.getCorsConfig(e,!0);o>-1&&A.corsEnabledServers.splice(o,1);var s=new t;return s.reject({log:!!r.isDebug}),n[b(e)]=s.promise,o}function j(e){var r=A.corsStatus;try{var n=b(e.url);if(A.corsDetection&&A.useCors&&c("esri-cors")&&e.url&&-1!==e.url.toLowerCase().indexOf("/rest/services")&&!f.hasSameOrigin(e.urlObj,f.appUrl)&&!f.canUseXhr(e.urlObj)){if(r[n])return r[n];var o=new t;r[n]=o.promise;var i=e.url.substring(0,e.url.toLowerCase().indexOf("/rest/")+"/rest/".length)+"info";return s.get(i,{query:{f:"json"},handleAs:"json",headers:{"X-Requested-With":null},timeout:1e3*A.corsDetectionTimeout}).then(function(r){r?(f.canUseXhr(e.url)||A.corsEnabledServers.push(n),o.resolve()):o.reject()},function(e){o.reject()}),o.promise}}catch(a){console.log("esri._detectCors: an unknown error occurred while detecting CORS support")}return E}function O(e){S=e}function x(e,r,o,s){function i(e){e&&(o._token=e.token,o._ssl=e.ssl)}function a(e){e._pendingDfd=C(o,g);var r=!!e._pendingDfd.response,i=e._pendingDfd.response||e._pendingDfd;i.then(function(e){if(!r||!e.data)return e;var o=e.getHeader("Content-Type");if(o&&(o=o.toLowerCase(),-1===o.indexOf("text/plain")&&-1===o.indexOf("application/json")))return e;var s,i=750,a=e.data;if(a instanceof ArrayBuffer&&a.byteLength<=i)s=new Blob([a]);else{if(!(a instanceof Blob&&a.size<=i))return e;s=a}var l=new t,u=new FileReader;return u.readAsText(s),u.onloadend=function(){if(!u.error)try{var r=JSON.parse(u.result);r.error&&(Object.isExtensible(e)||(e=n.mixin({},e)),e._jsonData=r)}catch(t){}l.resolve(e)},l.promise}).then(function(t){var o=r?t.data:t,i=r?t.getHeader.bind(t):L;if(o){var a=r&&t._jsonData||o;if(a.error||"error"===a.status){var l=n.mixin(new Error,a.error||a);throw l.getHeader=i,l}}e.resolve({data:o,url:s.url,requestOptions:s.requestOptions,getHeader:i}),e._pendingDfd=null}).otherwise(function(r){var t,n,i;if(r&&(t=r.code,n=r.subcode,i=r.messageCode,i=i&&i.toUpperCase()),r&&403==t&&(4==n||r.message&&r.message.toLowerCase().indexOf("ssl")>-1&&-1===r.message.toLowerCase().indexOf("permission"))){if(!o._ssl)return o._ssl=o._sslFromServer=!0,void x(e,!0,o,s)}else if(r&&415==r.status){if(_(o.url),!o._err415)return o._err415=1,void x(e,!0,o,s)}else if(h&&"no-prompt"!==o.authMode&&U._errorCodes&&-1!==U._errorCodes.indexOf(t)&&!U._isPublic(o.url)&&(403!=t||P&&-1===P.indexOf(i)&&(!d.isDefined(n)||2==n&&o._token)))return void k(e,o,s,q("request:server",r,s));e.reject(q("request:server",r,s)),e._pendingDfd=null})}var u,c=o.body,h=o.useIdentity,g=null,p=c instanceof FormData;(p||c&&c.elements)&&(g=p?c:new FormData(c));var m=!!(-1!==o.url.toLowerCase().indexOf("token=")||o.content&&o.content.token||g&&g.get&&g.get("token")||c&&c.elements&&c.elements.token);return r||(!h||m||o._token||U._isPublic(o.url)||("immediate"===o.authMode?u=U.getCredential(o.url).then(i):"no-prompt"===o.authMode?u=U.checkSignInStatus(o.url).then(i).otherwise(function(){}):i(U.findCredential(o.url))),e.then(function(e){if((/\/sharing\/rest\/accounts\/self/i.test(o.url)||/\/sharing\/rest\/portals\/self/i.test(o.url))&&!m&&!o._token&&e.user&&e.user.username){var r=A.corsEnabledServers,t=f.getCorsConfig(o.url,!0),n={host:b(o.url),withCredentials:!0};if(-1===t)r.push(n);else{var s=r[t];"object"==typeof s?s.withCredentials=!0:r.splice(t,1,n)}}var i=o._credential;if(i){var a,l=U.findServerInfo(i.server),u=l&&l.owningSystemUrl;u&&(u=u.replace(/\/?$/,"/sharing"),a=U.findCredential(u,i.userId),a&&-1===U._getIdenticalSvcIdx(u,a)&&a.resources.splice(0,0,u))}return e}).always(function(e){if(delete o._credential,e){var r=!!o._ssl;e instanceof l?e.details.ssl=r:e.ssl=r}})),u?u.then(function(){a(e)}).otherwise(function(r){e.reject(r)}):a(e),e.promise}function k(e,r,t,n){e._pendingDfd=U.getCredential(r.url,{error:n,token:r._token}),e._pendingDfd.then(function(n){r._token=n.token,r._credential=n,r._ssl=r._sslFromServer||n.ssl,x(e,!0,r,t)}).otherwise(function(r){e.reject(r),e._pendingDfd=null})}function q(e,r,t){var n="Error",o={url:t.url,requestOptions:t.requestOptions,getHeader:L};if(r instanceof l)return r.details?(r.details=d.clone(r.details),r.details.url=t.url,r.details.requestOptions=t.requestOptions):r.details=o,r;if(r){var s=r.response,i=s&&s.getHeader,a=s&&s.status,u=r.message,c=r.getHeader||i;u&&(n=u),c&&(o.getHeader=c),o.httpStatus=(d.isDefined(r.httpCode)?r.httpCode:r.code)||a,o.subCode=r.subcode,o.messageCode=r.messageCode,"string"==typeof r.details?o.messages=[r.details]:o.messages=r.details}var f=new l(e,n,o);return r&&"cancel"===r.dojoType&&(f.dojoType="cancel"),f}function D(e,r){if(v&&u.invokeStaticMessage)return v.execute(e,r);var t=n.mixin({},r),s={url:e,requestOptions:n.mixin({},r)};if(t.content=t.query,delete t.query,t.preventCache=!!t.cacheBust,delete t.cacheBust,t.handleAs=t.responseType,delete t.responseType,"array-buffer"===t.handleAs&&(t.handleAs="arraybuffer"),"image"===t.handleAs){if(c("host-webworker")||c("host-node"))return g.reject(q("request:invalid-parameters",new Error("responseType 'image' is not supported in Web Workers or Node environment"),s));t.preventCache&&(t.content=t.content||{},t.content["request.preventCache"]=Date.now()),t.method="auto"}var i=A.useIdentity;"anonymous"===t.authMode&&(i=!1),t.useIdentity=i,t.url=f.normalize(e),t.urlObj=new o(t.url);var a=h.makeDeferredCancellingPending();return j(t).always(function(){return i&&!U?y():void 0}).always(function(){x(a,!1,t,s)}),a.promise}var S,U,T,A=a.request,P=["COM_0056","COM_0057"],I=0,L=function(){return null},E=(new t).resolve();return D.setRequestPreCallback=O,D});