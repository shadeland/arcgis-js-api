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

define(["../core/declare","dojo/_base/config","dojo/_base/lang","dojo/_base/array","dojo/Deferred","dojo/_base/url","dojo/sniff","dojo/cookie","dojo/io-query","dojo/regexp","../kernel","../config","../core/lang","./ServerInfo","../core/urlUtils","../core/deferredUtils","../core/Accessor","../request","../core/Error","../core/Evented","./OAuthCredential","./OAuthInfo"],function(e,r,t,s,i,n,o,a,h,l,u,c,d,f,_,v,g,p,m,S,I,w){var k,U={},T=function(e){var r=new n(e.owningSystemUrl).host,t=new n(e.server).host,s=/.+\.arcgis\.com$/i;return s.test(r)&&s.test(t)},y=function(e,r){return!!(T(e)&&r&&s.some(r,function(r){return r.test(e.server)}))},x=e(S,{declaredClass:"esri.identity.IdentityManagerBase",constructor:function(){this._portalConfig=t.getObject("esriGeowConfig"),this.serverInfos=[],this.oAuthInfos=[],this.credentials=[],this._soReqs=[],this._xoReqs=[],this._portals=[],this._getOAuthHash()},defaultOAuthInfo:null,defaultTokenValidity:60,tokenValidity:null,signInPage:null,useSignInPage:!0,normalizeWebTierAuth:!1,_busy:null,_oAuthHash:null,_gwTokenUrl:"/sharing/generateToken",_agsRest:"/rest/services",_agsPortal:/\/sharing(\/|$)/i,_agsAdmin:/https?:\/\/[^\/]+\/[^\/]+\/admin\/?(\/.*)?$/i,_adminSvcs:/\/admin\/services(\/|$)/i,_agolSuffix:".arcgis.com",_gwDomains:[{regex:/https?:\/\/www\.arcgis\.com/i,tokenServiceUrl:"https://www.arcgis.com/sharing/generateToken"},{regex:/https?:\/\/dev\.arcgis\.com/i,tokenServiceUrl:"https://dev.arcgis.com/sharing/generateToken"},{regex:/https?:\/\/.*dev[^.]*\.arcgis\.com/i,tokenServiceUrl:"https://devext.arcgis.com/sharing/generateToken"},{regex:/https?:\/\/.*qa[^.]*\.arcgis\.com/i,tokenServiceUrl:"https://qaext.arcgis.com/sharing/generateToken"},{regex:/https?:\/\/.*.arcgis\.com/i,tokenServiceUrl:"https://www.arcgis.com/sharing/generateToken"}],_legacyFed:[],_regexSDirUrl:/http.+\/rest\/services\/?/gi,_regexServerType:/(\/(MapServer|GeocodeServer|GPServer|GeometryServer|ImageServer|NAServer|FeatureServer|GeoDataServer|GlobeServer|MobileServer|GeoenrichmentServer|VectorTileServer|SceneServer)).*/gi,_gwUser:/http.+\/users\/([^\/]+)\/?.*/i,_gwItem:/http.+\/items\/([^\/]+)\/?.*/i,_gwGroup:/http.+\/groups\/([^\/]+)\/?.*/i,_errorCodes:[499,498,403,401],_rePortalTokenSvc:/\/sharing(\/rest)?\/generatetoken/i,_publicUrls:[/\/arcgis\/tokens/i,/\/sharing(\/rest)?\/generatetoken/i,/\/rest\/info/i],_createDefaultOAuthInfo:!0,_hasTestedIfAppIsOnPortal:!1,registerServers:function(e){var r=this.serverInfos;r?(e=s.filter(e,function(e){return!this.findServerInfo(e.server)},this),this.serverInfos=r.concat(e)):this.serverInfos=e,s.forEach(e,function(e){if(e.owningSystemUrl&&this._portals.push(e.owningSystemUrl),e.hasPortal){this._portals.push(e.server);var r=c.request.corsEnabledServers,t=this._getOrigin(e.tokenServiceUrl);_.canUseXhr(e.server)||r.push(e.server.replace(/^https?:\/\//i,"")),_.canUseXhr(t)||r.push(t.replace(/^https?:\/\//i,""))}},this)},registerOAuthInfos:function(e){var r=this.oAuthInfos;r?(e=s.filter(e,function(e){return!this.findOAuthInfo(e.portalUrl)},this),this.oAuthInfos=r.concat(e)):this.oAuthInfos=e},registerToken:function(e){e=t.mixin({},e);var r,s=this._sanitizeUrl(e.server),i=this.findServerInfo(s),n=this._isServerRsrc(s),o=!0;i||(i=new f,i.server=this._getServerInstanceRoot(s),n?i.hasServer=!0:(i.tokenServiceUrl=this._getTokenSvcUrl(s),i.hasPortal=!0),this.registerServers([i])),r=this._findCredential(s),r?(delete e.server,t.mixin(r,e),o=!1):(r=new k({userId:e.userId,server:i.server,token:e.token,expires:e.expires,ssl:e.ssl,scope:n?"server":"portal"}),r.resources=[s],this.credentials.push(r)),r.emitTokenChange(!1),o||r.refreshServerTokens()},toJSON:function(){return d.fixJson({serverInfos:s.map(this.serverInfos,function(e){return e.toJSON()}),oAuthInfos:s.map(this.oAuthInfos,function(e){return e.toJSON()}),credentials:s.map(this.credentials,function(e){return e.toJSON()})})},initialize:function(e){if(e){t.isString(e)&&(e=JSON.parse(e));var r=e.serverInfos,i=e.oAuthInfos,n=e.credentials;if(r){var o=[];s.forEach(r,function(e){e.server&&e.tokenServiceUrl&&o.push(e.declaredClass?e:new f(e))}),o.length&&this.registerServers(o)}if(i){var a=[];s.forEach(i,function(e){e.appId&&a.push(e.declaredClass?e:new w(e))}),a.length&&this.registerOAuthInfos(a)}n&&s.forEach(n,function(e){e.server&&e.token&&e.expires&&e.expires>(new Date).getTime()&&(e=e.declaredClass?e:new k(e),e.emitTokenChange(),this.credentials.push(e))},this)}},findServerInfo:function(e){var r;return e=this._sanitizeUrl(e),s.some(this.serverInfos,function(t){return this._hasSameServerInstance(t.server,e)&&(r=t),!!r},this),r},findOAuthInfo:function(e){var r;return e=this._sanitizeUrl(e),s.some(this.oAuthInfos,function(t){return this._hasSameServerInstance(t.portalUrl,e)&&(r=t),!!r},this),r},findCredential:function(e,r){var t,i;return e=this._sanitizeUrl(e),i=this._isServerRsrc(e)?"server":"portal",r?s.some(this.credentials,function(s){return this._hasSameServerInstance(s.server,e)&&r===s.userId&&s.scope===i&&(t=s),!!t},this):s.some(this.credentials,function(r){return this._hasSameServerInstance(r.server,e)&&-1!==this._getIdenticalSvcIdx(e,r)&&r.scope===i&&(t=r),!!t},this),t},getCredential:function(e,r){var s,i,n=!0;d.isDefined(r)&&(t.isObject(r)?(s=!!r.token,i=r.error,n=r.prompt!==!1):s=r),e=this._sanitizeUrl(e);var o,h=v.makeDeferredCancellingPending(),l=this._isAdminResource(e),u=s&&this._doPortalSignIn(e)?this._getEsriAuthCookie():null,c=s?this.findCredential(e):null;if(c&&i&&498===i.code)c.destroy(),u&&u.token===r.token&&a("esri_auth",null,{expires:-1,path:"/",domain:document.domain});else if(u||c){var _=u&&u.email||c&&c.userId;return o=new m("identity-manager:not-authorized","You are currently signed in as: '"+_+"'. You do not have access to this resource: "+e,{error:i}),h.reject(o),h.promise}var g=this._findCredential(e,r);if(g)return h.resolve(g),h.promise;var p=this.findServerInfo(e);if(p)!p.hasServer&&this._isServerRsrc(e)&&(p._restInfoPms=this._getTokenSvcUrl(e),p.hasServer=!0);else{var S=this._getTokenSvcUrl(e);if(!S)return o=new m("identity-manager:unknown-resource","Unknown resource - could not find token service endpoint."),h.reject(o),h.promise;p=new f,p.server=this._getServerInstanceRoot(e),t.isString(S)?(p.tokenServiceUrl=S,p.hasPortal=!0):(p._restInfoPms=S,p.hasServer=!0),this.registerServers([p])}return n&&p.hasPortal&&void 0===p._selfReq&&!this._findOAuthInfo(e)&&(p._selfReq={owningTenant:r&&r.owningTenant,selfDfd:this._getPortalSelf(p.tokenServiceUrl.replace(this._rePortalTokenSvc,"/sharing/rest/portals/self"),e)}),this._enqueue(e,p,r,h,l)},getResourceName:function(e){return this._isRESTService(e)?e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"")||"":this._gwUser.test(e)&&e.replace(this._gwUser,"$1")||this._gwItem.test(e)&&e.replace(this._gwItem,"$1")||this._gwGroup.test(e)&&e.replace(this._gwGroup,"$1")||""},generateToken:function(e,r,s){var i,o,a,h,l,c,d,f,v,g=this._rePortalTokenSvc.test(e.tokenServiceUrl),S=new n(window.location.href.toLowerCase()),I=this._getEsriAuthCookie(),w=!r,k=e.shortLivedTokenValidity;r&&(v=u.id.tokenValidity||k||u.id.defaultTokenValidity,v>k&&(v=k)),s&&(i=s.isAdmin,o=s.serverUrl,a=s.token,c=s.ssl,e.customParameters=s.customParameters),i?h=e.adminTokenServiceUrl:(h=e.tokenServiceUrl,l=new n(h.toLowerCase()),I&&(f=I.auth_tier,f=f&&f.toLowerCase()),("web"===f||e.webTierAuth)&&s&&s.serverUrl&&!c&&"http"===S.scheme&&(_.hasSameOrigin(S.uri,h,!0)||"https"===l.scheme&&S.host===l.host&&"7080"===S.port&&"7443"===l.port)&&(h=h.replace(/^https:/i,"http:").replace(/:7443/i,":7080")),w&&g&&(h=h.replace(/\/rest/i,""))),d=t.mixin({query:t.mixin({request:"getToken",username:r&&r.username,password:r&&r.password,serverUrl:o,token:a,expiration:v,referer:i||g?window.location.host:null,client:i?"referer":null,f:"json"},e.customParameters),method:w?"auto":"post",authMode:"anonymous",useProxy:this._useProxy(e,s),responseType:"json",callbackParamName:w?"callback":void 0},s&&s.ioArgs),g||(d.withCredentials=!1);var T=p(h,d),y=T.then(function(t){var s=t.data;if(!s||!s.token){var i=new m("identity-manager:authentication-failed","Unable to generate token");return i}var n=e.server;return U[n]||(U[n]={}),r&&(U[n][r.username]=r.password),s.validity=v,s});return y},isBusy:function(){return!!this._busy},checkSignInStatus:function(e){return this.getCredential(e,{prompt:!1}).then(function(e){if(!e.token)return e;var t=e.server+("portal"===e.scope?"/sharing/rest":"/rest/services");return p(t,{query:{f:"json",token:e.token},callbackParamName:"callback",authMode:"anonymous"}).then(function(){return e}).otherwise(function(t){if(498===t.code){e.destroy();var s=new Error("User is not signed in.");throw s.code="IdentityManagerBase.6",s.log=!!r.isDebug,s}return e})})},setRedirectionHandler:function(e){this._redirectFunc=e},setProtocolErrorHandler:function(e){this._protocolFunc=e},signIn:function(){},oAuthSignIn:function(){},destroyCredentials:function(){if(this.credentials){var e=this.credentials.slice();s.forEach(e,function(e){e.destroy()})}this.emit("credentials-destroy")},_getOAuthHash:function(){var e=window.location.hash;if(e){"#"===e.charAt(0)&&(e=e.substring(1));var r=h.queryToObject(e),t=!1;r.access_token&&r.expires_in&&r.state&&r.hasOwnProperty("username")?(r.state=JSON.parse(r.state),this._oAuthHash=r,t=!0):r.error&&r.error_description&&(console.log("IdentityManager OAuth Error: ",r.error," - ",r.error_description),"access_denied"===r.error&&(t=!0)),t&&(!o("ie")||o("ie")>8)&&(window.location.hash="")}},_findCredential:function(e,r){var t,i,n,o,a=-1,h=r&&r.token,l=r&&r.resource,u=this._isServerRsrc(e)?"server":"portal",c=s.filter(this.credentials,function(r){return this._hasSameServerInstance(r.server,e)&&r.scope===u},this);if(e=l||e,c.length)if(1===c.length){if(t=c[0],o=this.findServerInfo(t.server),i=o&&o.owningSystemUrl,n=i&&this.findCredential(i,t.userId),a=this._getIdenticalSvcIdx(e,t),!h)return-1===a&&t.resources.push(e),this._addResource(e,n),t;-1!==a&&(t.resources.splice(a,1),this._removeResource(e,n))}else{var d,f;if(s.some(c,function(r){return f=this._getIdenticalSvcIdx(e,r),-1!==f?(d=r,o=this.findServerInfo(d.server),i=o&&o.owningSystemUrl,n=i&&this.findCredential(i,d.userId),a=f,!0):!1},this),h)d&&(d.resources.splice(a,1),this._removeResource(e,n));else if(d)return this._addResource(e,n),d}},_findOAuthInfo:function(e){var r=this.findOAuthInfo(e);return r||s.some(this.oAuthInfos,function(t){return this._isIdProvider(t.portalUrl,e)&&(r=t),!!r},this),r},_addResource:function(e,r){r&&-1===this._getIdenticalSvcIdx(e,r)&&r.resources.push(e)},_removeResource:function(e,r){var t=-1;r&&(t=this._getIdenticalSvcIdx(e,r),t>-1&&r.resources.splice(t,1))},_useProxy:function(e,r){return r&&r.isAdmin&&!_.hasSameOrigin(e.adminTokenServiceUrl,window.location.href)||!this._isPortalDomain(e.tokenServiceUrl)&&10.1==e.currentVersion&&!_.hasSameOrigin(e.tokenServiceUrl,window.location.href)},_getOrigin:function(e){var r=new n(e);return r.scheme+"://"+r.host+(d.isDefined(r.port)?":"+r.port:"")},_getServerInstanceRoot:function(e){var r=e.toLowerCase(),t=r.indexOf(this._agsRest);return-1===t&&this._isAdminResource(e)&&(t=r.indexOf("/admin")),-1===t&&(t=r.indexOf("/sharing")),-1===t&&"/"===r.substr(-1)&&(t=r.length-1),t>-1?e.substring(0,t):e},_hasSameServerInstance:function(e,r){return"/"===e.substr(-1)&&(e=e.slice(0,-1)),e=e.toLowerCase(),r=this._getServerInstanceRoot(r).toLowerCase(),e=e.substr(e.indexOf(":")),r=r.substr(r.indexOf(":")),e===r},_sanitizeUrl:function(e){e=_.normalize(t.trim(e));var r=(c.request.proxyUrl||"").toLowerCase(),s=r?e.toLowerCase().indexOf(r+"?"):-1;return-1!==s&&(e=e.substring(s+r.length+1)),_.urlToObject(e).path},_isRESTService:function(e){return e.indexOf(this._agsRest)>-1},_isAdminResource:function(e){return this._agsAdmin.test(e)||this._adminSvcs.test(e)},_isServerRsrc:function(e){return this._isRESTService(e)||this._isAdminResource(e)},_isIdenticalService:function(e,r){var t;if(this._isRESTService(e)&&this._isRESTService(r)){var s=this._getSuffix(e).toLowerCase(),i=this._getSuffix(r).toLowerCase();if(t=s===i,!t){var n=/(.*)\/(MapServer|FeatureServer).*/gi;t=s.replace(n,"$1")===i.replace(n,"$1")}}else this._isAdminResource(e)&&this._isAdminResource(r)?t=!0:this._isServerRsrc(e)||this._isServerRsrc(r)||!this._isPortalDomain(e)||(t=!0);return t},_isPortalDomain:function(e){e=e.toLowerCase();var r=new n(e).authority,i=this._portalConfig,o=-1!==r.indexOf(this._agolSuffix);if(!o&&i&&(o=this._hasSameServerInstance(this._getServerInstanceRoot(i.restBaseUrl),e)),!o){if(!this._arcgisUrl){var a=t.getObject("esri.arcgis.utils.arcgisUrl");a&&(this._arcgisUrl=new n(a).authority)}this._arcgisUrl&&(o=this._arcgisUrl.toLowerCase()===r)}return o||(o=s.some(this._portals,function(r){return this._hasSameServerInstance(r,e)},this)),o=o||this._agsPortal.test(e)},_isIdProvider:function(e,r){var t=-1,i=-1;s.forEach(this._gwDomains,function(s,n){-1===t&&s.regex.test(e)&&(t=n),-1===i&&s.regex.test(r)&&(i=n)});var n=!1;if(t>-1&&i>-1&&(0===t||4===t?(0===i||4===i)&&(n=!0):1===t?(1===i||2===i)&&(n=!0):2===t?2===i&&(n=!0):3===t&&3===i&&(n=!0)),!n){var o=this.findServerInfo(r),a=o&&o.owningSystemUrl;a&&T(o)&&this._isPortalDomain(a)&&this._isIdProvider(e,a)&&(n=!0)}return n},_isPublic:function(e){return e=this._sanitizeUrl(e),s.some(this._publicUrls,function(r){return r.test(e)})},_getIdenticalSvcIdx:function(e,r){var t=-1;return s.some(r.resources,function(r,s){return this._isIdenticalService(e,r)?(t=s,!0):!1},this),t},_getSuffix:function(e){return e.replace(this._regexSDirUrl,"").replace(this._regexServerType,"$1")},_getTokenSvcUrl:function(e){var r,t,i,o=this._isRESTService(e);if(o||this._isAdminResource(e))return i=e.toLowerCase().indexOf(o?this._agsRest:"/admin/"),r=e.substring(0,i)+"/admin/generateToken",e=e.substring(0,i)+"/rest/info",t=p(e,{query:{f:"json"},responseType:"json",callbackParamName:"callback"}).then(function(e){return e.data}),{adminUrl:r,promise:t};if(this._isPortalDomain(e)){var a="";if(s.some(this._gwDomains,function(r){return r.regex.test(e)&&(a=r.tokenServiceUrl),!!a}),a||s.some(this._portals,function(r){return this._hasSameServerInstance(r,e)&&(a=r+this._gwTokenUrl),!!a},this),a||(i=e.toLowerCase().indexOf("/sharing"),-1!==i&&(a=e.substring(0,i)+this._gwTokenUrl)),a||(a=this._getOrigin(e)+this._gwTokenUrl),a){var h=new n(e).port;/^http:\/\//i.test(e)&&"7080"===h&&(a=a.replace(/:7080/i,":7443")),a=a.replace(/http:/i,"https:")}return a}return-1!==e.toLowerCase().indexOf("premium.arcgisonline.com")?"https://premium.arcgisonline.com/server/tokens":void 0},_getPortalSelf:function(e,r){var t=window.location.protocol;return"https:"===t?e=e.replace(/^http:/i,"https:").replace(/:7080/i,":7443"):/^http:/i.test(r)&&(e=e.replace(/^https:/i,"http:").replace(/:7443/i,":7080")),p(e,{query:{f:"json"},responseType:"json",callbackParamName:"callback",crossOrigin:!1,authMode:"anonymous"}).then(function(e){return e.data})},_hasPortalSession:function(){return!!this._getEsriAuthCookie()},_getEsriAuthCookie:function(){var e=null;if(a.isSupported()){var r,t=this._getAllCookies("esri_auth");for(r=0;r<t.length;r++){var s=JSON.parse(t[r]);if(s.portalApp){e=s;break}}}if(e){var i=null;e.expires&&("number"==typeof e.expires?i=e.expires:"string"==typeof e.expires&&(i=Date.parse(e.expires)),isNaN(i)&&(i=null),e.expires=i),i&&i<Date.now()&&(e=null)}return e},_getAllCookies:function(e){var r,t=[],s=document.cookie,i=s.match(new RegExp("(?:^|; )"+l.escapeString(e)+"=([^;]*)","g"));if(i)for(r=0;r<i.length;r++){var n=i[r],o=n.indexOf("=");o>-1&&(n=n.substring(o+1),t.push(decodeURIComponent(n)))}return t},_doPortalSignIn:function(e){if(a.isSupported()){var r=this._getEsriAuthCookie(),t=this._portalConfig,s=window.location.href,i=this.findServerInfo(e);if(this.useSignInPage&&(t||this._isPortalDomain(s)||r)&&(i?i.hasPortal||i.owningSystemUrl&&this._isPortalDomain(i.owningSystemUrl):this._isPortalDomain(e))&&(this._isIdProvider(s,e)||t&&(this._hasSameServerInstance(this._getServerInstanceRoot(t.restBaseUrl),e)||this._isIdProvider(t.restBaseUrl,e))||_.hasSameOrigin(s,e,!0)))return!0}return!1},_checkProtocol:function(e,r,s,i){var n=!0,o=i?r.adminTokenServiceUrl:r.tokenServiceUrl;if(!(0!==t.trim(o).toLowerCase().indexOf("https:")||0===window.location.href.toLowerCase().indexOf("https:")||c.request.useCors&&(_.canUseXhr(o)||_.canUseXhr(_.getProxyUrl(!0).path))||(n=this._protocolFunc?!!this._protocolFunc({resourceUrl:e,serverInfo:r}):!1))){var a=new m("identity-manager:aborted","Aborted the Sign-In process to avoid sending password over insecure connection.");s(a)}return n},_enqueue:function(e,r,t,s,i,n){return s||(s=v.makeDeferredCancellingPending()),s.resUrl_=e,s.sinfo_=r,s.options_=t,s.admin_=i,s.refresh_=n,this._busy?this._hasSameServerInstance(this._getServerInstanceRoot(e),this._busy.resUrl_)?(this._oAuthDfd&&this._oAuthDfd.oAuthWin_&&this._oAuthDfd.oAuthWin_.focus(),this._soReqs.push(s)):this._xoReqs.push(s):this._doSignIn(s),s.promise},_doSignIn:function(e){this._busy=e;var r=this,i=function(t){var i=e.options_&&e.options_.resource,n=e.resUrl_,o=e.refresh_,a=!1;-1===s.indexOf(r.credentials,t)&&(o&&-1!==s.indexOf(r.credentials,o)?(o.userId=t.userId,o.token=t.token,o.expires=t.expires,o.validity=t.validity,o.ssl=t.ssl,o.creationTime=t.creationTime,a=!0,t=o):r.credentials.push(t)),t.resources||(t.resources=[]),t.resources.push(i||n),t.scope=r._isServerRsrc(n)?"server":"portal",t.emitTokenChange();var h=r._soReqs,l={};r._soReqs=[],s.forEach(h,function(e){if(!this._isIdenticalService(n,e.resUrl_)){var r=this._getSuffix(e.resUrl_);l[r]||(l[r]=!0,t.resources.push(e.resUrl_))}},r),e.resolve(t),s.forEach(h,function(e){this._hasSameServerInstance(this._getServerInstanceRoot(n),e.resUrl_)?e.resolve(t):this._soReqs.push(e)},r),r._busy=e.resUrl_=e.sinfo_=e.refresh_=null,a||r.emit("credential-create",{credential:t}),r._soReqs.length?r._doSignIn(r._soReqs.shift()):r._xoReqs.length&&r._doSignIn(r._xoReqs.shift())},n=function(t){e.reject(t),r._busy=e.resUrl_=e.sinfo_=e.refresh_=null,r._soReqs.length?r._doSignIn(r._soReqs.shift()):r._xoReqs.length&&r._doSignIn(r._xoReqs.shift())},o=function(t,s,o,a){var h,l,u=e.sinfo_,c=!e.options_||e.options_.prompt!==!1,f=u.hasPortal&&r._findOAuthInfo(e.resUrl_);if(r._doPortalSignIn(e.resUrl_)){var _=r._getEsriAuthCookie(),v=r._portalConfig;if(_){if(!u.webTierAuth){var g=_.auth_tier&&_.auth_tier.toLowerCase();"web"===g&&(u.webTierAuth=!0)}return void i(new k({userId:_.email,server:u.server,token:_.token,expires:_.expires}))}if(c){var p="",S=window.location.href;return p=r.signInPage?r.signInPage:v?v.baseUrl+v.signin:r._isIdProvider(S,e.resUrl_)?r._getOrigin(S)+"/home/signin.html":u.tokenServiceUrl.replace(r._rePortalTokenSvc,"")+"/home/signin.html",p=p.replace(/http:/i,"https:"),v&&v.useSSL===!1&&(p=p.replace(/https:/i,"http:")),void(0===S.toLowerCase().replace("https","http").indexOf(p.toLowerCase().replace("https","http"))?(l=new m("identity-manager:unexpected-error","Cannot redirect to Sign-In page from within Sign-In page. URL of the resource that triggered this workflow: "+e.resUrl_),n(l)):r._redirectFunc?r._redirectFunc({signInPage:p,returnUrlParamName:"returnUrl",returnUrl:S,resourceUrl:e.resUrl_,serverInfo:u}):window.location=p+"?returnUrl="+window.escape(S))}l=new m("identity-manager:not-authenticated","User is not signed in."),n(l)}else if(t)i(new k({userId:t,server:u.server,token:o,expires:d.isDefined(a)?Number(a):null,ssl:!!s}));else if(f){var w=f._oAuthCred;if(!w){var U=new I(f,window.localStorage),T=new I(f,window.sessionStorage);U.isValid()&&T.isValid()?U.expires>T.expires?(w=U,T.destroy()):(w=T,U.destroy()):w=U.isValid()?U:T,f._oAuthCred=w}if(w.isValid())i(new k({userId:w.userId,server:u.server,token:w.token,expires:w.expires,ssl:w.ssl,_oAuthCred:w}));else if(r._oAuthHash&&r._oAuthHash.state.portalUrl===f.portalUrl){var y=r._oAuthHash;h=new k({userId:y.username,server:u.server,token:y.access_token,expires:(new Date).getTime()+1e3*Number(y.expires_in),ssl:"true"===y.ssl,oAuthState:y.state,_oAuthCred:w}),w.storage=y.persist?window.localStorage:window.sessionStorage,w.token=h.token,w.expires=h.expires,w.userId=h.userId,w.ssl=h.ssl,w.save(),r._oAuthHash=null,i(h)}else c?e._pendingDfd=r.oAuthSignIn(e.resUrl_,u,f,e.options_).then(i,n):(l=new m("identity-manager:not-authenticated","User is not signed in."),n(l))}else if(c){if(r._checkProtocol(e.resUrl_,u,n,e.admin_)){var x=e.options_;e.admin_&&(x=x||{},x.isAdmin=!0),e._pendingDfd=r.signIn(e.resUrl_,u,x).then(i,n)}}else l=new m("identity-manager:not-authenticated","User is not signed in."),n(l)},a=function(){var t,o,a,h,l=e.sinfo_,u=l.owningSystemUrl,c=e.options_;if(c&&(t=c.token,o=c.error,a=c.prompt),h=r._findCredential(u,{token:t,resource:e.resUrl_}),!h&&T(l)&&s.some(r.credentials,function(e){return this._isIdProvider(u,e.server)&&(h=e),!!h},r),h){var f=r.findCredential(e.resUrl_,h.userId);if(f)i(f);else if(y(l,r._legacyFed)){var _=h.toJSON();_.server=l.server,_.resources=null,i(new k(_))}else{var v=e._pendingDfd=r.generateToken(r.findServerInfo(h.server),null,{serverUrl:e.resUrl_,token:h.token,ssl:h.ssl});v.then(function(r){i(new k({userId:h.userId,server:l.server,token:r.token,expires:d.isDefined(r.expires)?Number(r.expires):null,ssl:!!r.ssl,isAdmin:e.admin_,validity:r.validity}))},n)}}else{r._busy=null,t&&(e.options_.token=null);var g=e._pendingDfd=r.getCredential(u.replace(/\/?$/,"/sharing"),{resource:e.resUrl_,owningTenant:l.owningTenant,token:t,error:o,prompt:a});g.then(function(t){r._enqueue(e.resUrl_,e.sinfo_,e.options_,e,e.admin_)},function(e){n(e)})}},h=e.sinfo_.owningSystemUrl,l=this._isServerRsrc(e.resUrl_),u=e.sinfo_._restInfoPms;u?u.promise.then(function(s){var i=e.sinfo_;i.adminTokenServiceUrl=i._restInfoPms.adminUrl,i._restInfoPms=null,i.tokenServiceUrl=t.getObject("authInfo.tokenServicesUrl",!1,s)||t.getObject("authInfo.tokenServiceUrl",!1,s)||t.getObject("tokenServiceUrl",!1,s),i.shortLivedTokenValidity=t.getObject("authInfo.shortLivedTokenValidity",!1,s),i.currentVersion=s.currentVersion,i.owningTenant=s.owningTenant;var n=i.owningSystemUrl=s.owningSystemUrl;n&&r._portals.push(n),l&&n?a():o()},function(){e.sinfo_._restInfoPms=null;var r=new m("identity-manager:server-identification-failed","Unknown resource - could not find token service endpoint.");n(r)}):l&&h?a():e.sinfo_._selfReq?e.sinfo_._selfReq.selfDfd.then(function(t){var s,i,n,o,a={};return t&&(s=t.user&&t.user.username,a.username=s,a.allSSL=t.allSSL,i=t.supportsOAuth,n=t.currentVersion,"multitenant"===t.portalMode&&(o=t.customBaseUrl)),e.sinfo_.webTierAuth=!!s,s&&r.normalizeWebTierAuth?r.generateToken(e.sinfo_,null,{ssl:a.allSSL}).always(function(e){return a.portalToken=e&&e.token,a.tokenExpiration=e&&e.expires,a}):!s&&i&&parseFloat(n)>=4.4&&!r._doPortalSignIn(e.resUrl_)?r._generateOAuthInfo({portalUrl:e.sinfo_.server,customBaseUrl:o,owningTenant:e.sinfo_._selfReq.owningTenant}).always(function(){return a}):a}).always(function(r){e.sinfo_._selfReq=null,r?o(r.username,r.allSSL,r.portalToken,r.tokenExpiration):o()}):o()},_generateOAuthInfo:function(e){var r,t,s=this,n=e.portalUrl,o=e.customBaseUrl,a=e.owningTenant,h=!this.defaultOAuthInfo&&this._createDefaultOAuthInfo&&!this._hasTestedIfAppIsOnPortal;if(h){t=window.location.href;var l=t.indexOf("?");l>-1&&(t=t.slice(0,l)),l=t.search(/\/(apps|home)\//),t=l>-1?t.slice(0,l):null}return h&&t?(this._hasTestedIfAppIsOnPortal=!0,r=p(t+"/sharing/rest",{query:{f:"json"},responseType:"json"}).then(function(){s.defaultOAuthInfo=new w({appId:"arcgisonline",popup:!0,popupCallbackUrl:t+"/home/oauth-callback.html"})})):(r=new i,r.resolve(),r=r.promise),r.then(function(){return s.defaultOAuthInfo?(n=n.replace(/^http:/i,"https:"),p(n+"/sharing/rest/oauth2/validateRedirectUri",{query:{accountId:a,client_id:s.defaultOAuthInfo.appId,redirect_uri:_.makeAbsolute(s.defaultOAuthInfo.popupCallbackUrl),f:"json"},responseType:"json",callbackParamName:"callback"}).then(function(e){if(e.data.valid){var r=s.defaultOAuthInfo.clone();e.data.urlKey&&o?r.portalUrl="https://"+e.data.urlKey+"."+o:r.portalUrl=n,s.oAuthInfos.push(r)}})):void 0})}});return k=g.createSubclass([S],{declaredClass:"esri.identity.Credential",constructor:function(e){e&&e._oAuthCred&&(this._oAuthCred=e._oAuthCred)},initialize:function(){this.resources=this.resources||[],d.isDefined(this.creationTime)||(this.creationTime=(new Date).getTime())},_oAuthCred:null,properties:{creationTime:{},expires:{},isAdmin:{},oAuthState:{},resources:{},scope:{},server:{},ssl:{},token:{},tokenRefreshBuffer:2,userId:{},validity:{}},refreshToken:function(){var e,r,t=this,i=this.resources&&this.resources[0],n=u.id.findServerInfo(this.server),o=n&&n.owningSystemUrl,a=!!o&&"server"===this.scope,h=a&&y(n,u.id._legacyFed),l=a&&u.id.findServerInfo(o),c=n.webTierAuth,f=c&&u.id.normalizeWebTierAuth,_=U[this.server],v=_&&_[this.userId],g={username:this.userId,password:v};if((!c||f)&&(a&&!l&&s.some(u.id.serverInfos,function(e){return u.id._isIdProvider(o,e.server)&&(l=e),!!l}),e=l&&u.id.findCredential(l.server,this.userId),!a||e)){if(h)return void e.refreshToken();if(a)r={serverUrl:i,token:e&&e.token,ssl:e&&e.ssl};else if(f)g=null,r={ssl:this.ssl};else{if(!v){var p;return i&&(i=u.id._sanitizeUrl(i),this._enqueued=1,p=u.id._enqueue(i,n,null,null,this.isAdmin,this),p.then(function(){t._enqueued=0,t.refreshServerTokens()}).then(null,function(){t._enqueued=0})),p}this.isAdmin&&(r={isAdmin:!0})}return u.id.generateToken(a?l:n,a?null:g,r).then(function(e){t.token=e.token,t.expires=d.isDefined(e.expires)?Number(e.expires):null,t.creationTime=(new Date).getTime(),t.validity=e.validity,t.emitTokenChange(),t.refreshServerTokens()}).then(null,function(){})}},refreshServerTokens:function(){"portal"===this.scope&&s.forEach(u.id.credentials,function(e){var r=u.id.findServerInfo(e.server),t=r&&r.owningSystemUrl;e!==this&&e.userId===this.userId&&t&&"server"===e.scope&&(u.id._hasSameServerInstance(this.server,t)||u.id._isIdProvider(t,this.server))&&(y(r,u.id._legacyFed)?(e.token=this.token,e.expires=this.expires,e.creationTime=this.creationTime,e.validity=this.validity,e.emitTokenChange()):e.refreshToken())},this)},emitTokenChange:function(e){clearTimeout(this._refreshTimer);var r=this.server&&u.id.findServerInfo(this.server),t=r&&r.owningSystemUrl,s=t&&u.id.findServerInfo(t);e!==!1&&(!t||"portal"===this.scope||s&&s.webTierAuth&&!u.id.normalizeWebTierAuth)&&(d.isDefined(this.expires)||d.isDefined(this.validity))&&this._startRefreshTimer(),this.emit("token-change")},destroy:function(){this.userId=this.server=this.token=this.expires=this.validity=this.resources=this.creationTime=null,this._oAuthCred&&(this._oAuthCred.destroy(),this._oAuthCred=null);var e=s.indexOf(u.id.credentials,this);e>-1&&u.id.credentials.splice(e,1),this.emitTokenChange(),this.emit("destroy")},toJSON:function(){var e=d.fixJson({userId:this.userId,server:this.server,token:this.token,expires:this.expires,validity:this.validity,ssl:this.ssl,isAdmin:this.isAdmin,creationTime:this.creationTime,scope:this.scope}),r=this.resources;return r&&r.length>0&&(e.resources=r.slice()),e},_startRefreshTimer:function(){clearTimeout(this._refreshTimer);var e=6e4*this.tokenRefreshBuffer,r=this.validity?this.creationTime+6e4*this.validity:this.expires,s=r-(new Date).getTime();0>s&&(s=0),this._refreshTimer=setTimeout(t.hitch(this,this.refreshToken),s>e?s-e:s)}}),x.Credential=k,x});