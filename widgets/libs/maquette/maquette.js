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

!function(e,r){"function"==typeof define&&define.amd?define(["exports"],r):r("object"==typeof exports&&"string"!=typeof exports.nodeName?exports:e.maquette={})}(this,function(e){"use strict";var r,t,o="http://www.w3.org/",n=o+"2000/svg",i=o+"1999/xlink",s=[],a=function(e,r){var t={};return Object.keys(e).forEach(function(r){t[r]=e[r]}),r&&Object.keys(r).forEach(function(e){t[e]=r[e]}),t},d=function(e,r){return e.vnodeSelector!==r.vnodeSelector?!1:e.properties&&r.properties?e.properties.key!==r.properties.key?!1:e.properties.bind===r.properties.bind:!e.properties&&!r.properties},p=function(e){return{vnodeSelector:"",properties:void 0,children:void 0,text:e.toString(),domNode:null}},u=function(e,r,t){for(var o=0,n=r.length;n>o;o++){var i=r[o];Array.isArray(i)?u(e,i,t):null!==i&&void 0!==i&&(i.hasOwnProperty("vnodeSelector")||(i=p(i)),t.push(i))}},c=function(){throw new Error("Provide a transitions object to the projectionOptions to do animations")},l={namespace:void 0,eventHandlerInterceptor:void 0,styleApplyer:function(e,r,t){e.style[r]=t},transitions:{enter:c,exit:c}},f=function(e){return a(l,e)},v=function(e){if("string"!=typeof e)throw new Error("Style values must be strings")},h=function(e,r,t){if(r)for(var o=t.eventHandlerInterceptor,s=Object.keys(r),a=s.length,d=function(a){var d=s[a],p=r[d];if("className"===d)throw new Error('Property "className" is not supported, use "class".');if("class"===d)p.split(/\s+/).forEach(function(r){return e.classList.add(r)});else if("classes"===d)for(var u=Object.keys(p),c=u.length,l=0;c>l;l++){var f=u[l];p[f]&&e.classList.add(f)}else if("styles"===d)for(var h=Object.keys(p),m=h.length,l=0;m>l;l++){var y=h[l],g=p[y];g&&(v(g),t.styleApplyer(e,y,g))}else if("key"!==d&&null!==p&&void 0!==p){var N=typeof p;"function"===N?0===d.lastIndexOf("on",0)&&(o&&(p=o(d,p,e,r)),"oninput"===d&&!function(){var e=p;p=function(r){e.apply(this,[r]),r.target["oninput-value"]=r.target.value}}(),e[d]=p):"string"===N&&"value"!==d&&"innerHTML"!==d?t.namespace===n&&"href"===d?e.setAttributeNS(i,d,p):e.setAttribute(d,p):e[d]=p}},p=0;a>p;p++)d(p)},m=function(e,r,t,o){if(t){for(var s=!1,a=Object.keys(t),d=a.length,p=0;d>p;p++){var u=a[p],c=t[u],l=r[u];if("class"===u){if(l!==c)throw new Error('"class" property may not be updated. Use the "classes" property for conditional css classes.')}else if("classes"===u)for(var f=e.classList,h=Object.keys(c),m=h.length,y=0;m>y;y++){var g=h[y],N=!!c[g],b=!!l[g];N!==b&&(s=!0,N?f.add(g):f.remove(g))}else if("styles"===u)for(var w=Object.keys(c),x=w.length,y=0;x>y;y++){var S=w[y],A=c[S],k=l[S];A!==k&&(s=!0,A?(v(A),o.styleApplyer(e,S,A)):o.styleApplyer(e,S,""))}else if(c||"string"!=typeof l||(c=""),"value"===u){var E=e[u];E!==c&&(e["oninput-value"]?E===e["oninput-value"]:c!==l)&&(e[u]=c,e["oninput-value"]=void 0),c!==l&&(s=!0)}else if(c!==l){var O=typeof c;if("function"===O)throw new Error("Functions may not be updated on subsequent renders (property: "+u+"). Hint: declare event handler functions outside the render() function.");"string"===O&&"innerHTML"!==u?o.namespace===n&&"href"===u?e.setAttributeNS(i,u,c):"role"===u&&""===c?e.removeAttribute(u):e.setAttribute(u,c):e[u]!==c&&(e[u]=c),s=!0}}return s}},y=function(e,r,t){if(""!==r.vnodeSelector)for(var o=t;o<e.length;o++)if(d(e[o],r))return o;return-1},g=function(e,r){if(e.properties){var t=e.properties.enterAnimation;t&&("function"==typeof t?t(e.domNode,e.properties):r.enter(e.domNode,e.properties,t))}},N=function(e,r){var t=e.domNode;if(e.properties){var o=e.properties.exitAnimation;if(o){t.style.pointerEvents="none";var n=function(){t.parentNode&&t.parentNode.removeChild(t)};return"function"==typeof o?void o(t,n,e.properties):void r.exit(e.domNode,e.properties,o,n)}}t.parentNode&&t.parentNode.removeChild(t)},b=function(e,r,t,o){var n=e[r];if(""!==n.vnodeSelector){var i=n.properties,s=i?void 0===i.key?i.bind:i.key:void 0;if(!s)for(var a=0;a<e.length;a++)if(a!==r){var p=e[a];if(d(p,n))throw"added"===o?new Error(t.vnodeSelector+" had a "+n.vnodeSelector+" child added, but there is now more than one. You must add unique key properties to make them distinguishable."):new Error(t.vnodeSelector+" had a "+n.vnodeSelector+" child removed, but there were more than one. You must add unique key properties to make them distinguishable.")}}},w=function(e,o,n,i,a){if(n===i)return!1;n=n||s,i=i||s;for(var p,u=n.length,c=i.length,l=a.transitions,f=0,v=0,h=!1;c>v;){var m=u>f?n[f]:void 0,w=i[v];if(void 0!==m&&d(m,w))h=t(m,w,a)||h,f++;else{var x=y(n,w,f+1);if(x>=0){for(p=f;x>p;p++)N(n[p],l),b(n,p,e,"removed");h=t(n[x],w,a)||h,f=x+1}else r(w,o,u>f?n[f].domNode:void 0,a),g(w,l),b(i,v,e,"added")}v++}if(u>f)for(p=f;u>p;p++)N(n[p],l),b(n,p,e,"removed");return h},x=function(e,t,o){if(t)for(var n=0;n<t.length;n++)r(t[n],e,void 0,o)},S=function(e,r,t){x(e,r.children,t),r.text&&(e.textContent=r.text),h(e,r.properties,t),r.properties&&r.properties.afterCreate&&r.properties.afterCreate.apply(r.properties.bind||r.properties,[e,t,r.vnodeSelector,r.properties,r.children])};r=function(e,r,t,o){var i,s,d,p,u,c=0,l=e.vnodeSelector,f=r.ownerDocument;if(""===l)i=e.domNode=f.createTextNode(e.text),void 0!==t?r.insertBefore(i,t):r.appendChild(i);else{for(s=0;s<=l.length;++s)d=l.charAt(s),(s===l.length||"."===d||"#"===d)&&(p=l.charAt(c-1),u=l.slice(c,s),"."===p?i.classList.add(u):"#"===p?i.id=u:("svg"===u&&(o=a(o,{namespace:n})),void 0!==o.namespace?i=e.domNode=f.createElementNS(o.namespace,u):(i=e.domNode=e.domNode||f.createElement(u),"input"===u&&e.properties&&void 0!==e.properties.type&&i.setAttribute("type",e.properties.type)),void 0!==t?r.insertBefore(i,t):i.parentNode!==r&&r.appendChild(i)),c=s+1);S(i,e,o)}},t=function(e,r,t){var o=e.domNode,i=!1;if(e===r)return!1;var s=!1;if(""===r.vnodeSelector){if(r.text!==e.text){var d=o.ownerDocument.createTextNode(r.text);return o.parentNode.replaceChild(d,o),r.domNode=d,i=!0}}else 0===r.vnodeSelector.lastIndexOf("svg",0)&&(t=a(t,{namespace:n})),e.text!==r.text&&(s=!0,void 0===r.text?o.removeChild(o.firstChild):o.textContent=r.text),s=w(r,o,e.children,r.children,t)||s,s=m(o,e.properties,r.properties,t)||s,r.properties&&r.properties.afterUpdate&&r.properties.afterUpdate.apply(r.properties.bind||r.properties,[o,t,r.vnodeSelector,r.properties,r.children]);return s&&r.properties&&r.properties.updateAnimation&&r.properties.updateAnimation(o,r.properties,e.properties),r.domNode=e.domNode,i};var A=function(e,r){return{update:function(o){if(e.vnodeSelector!==o.vnodeSelector)throw new Error("The selector for the root VNode may not be changed. (consider using dom.merge and add one extra level to the virtual DOM)");t(e,o,r),e=o},domNode:e.domNode}};e.h=function(e){var r=arguments[1];if("string"!=typeof e)throw new Error;var t=1;!r||r.hasOwnProperty("vnodeSelector")||Array.isArray(r)||"object"!=typeof r?r=void 0:t=2;var o,n,i=arguments.length;if(i===t+1){var s=arguments[t];"string"==typeof s?o=s:void 0!==s&&null!==s&&1===s.length&&"string"==typeof s[0]&&(o=s[0])}if(void 0===o)for(n=[];i>t;t++){var a=arguments[t];null===a||void 0===a||(Array.isArray(a)?u(e,a,n):a.hasOwnProperty("vnodeSelector")?n.push(a):n.push(p(a)))}return{vnodeSelector:e,properties:r,children:n,text:""===o?void 0:o,domNode:null}},e.dom={create:function(e,t){return t=f(t),r(e,document.createElement("div"),void 0,t),A(e,t)},append:function(e,t,o){return o=f(o),r(t,e,void 0,o),A(t,o)},insertBefore:function(e,t,o){return o=f(o),r(t,e.parentNode,e,o),A(t,o)},merge:function(e,r,t){return t=f(t),r.domNode=e,S(e,r,t),A(r,t)},replace:function(e,t,o){return o=f(o),r(t,e.parentNode,e,o),e.parentNode.removeChild(e),A(t,o)}},e.createCache=function(){var e,r;return{invalidate:function(){r=void 0,e=void 0},result:function(t,o){if(e)for(var n=0;n<t.length;n++)e[n]!==t[n]&&(r=void 0);return r||(r=o(),e=t),r}}},e.createMapping=function(e,r,t){var o=[],n=[];return{results:n,map:function(i){for(var s=i.map(e),a=n.slice(),d=0,p=0;p<i.length;p++){var u=i[p],c=s[p];if(c===o[d])n[p]=a[d],t(u,a[d],p),d++;else{for(var l=!1,f=1;f<o.length+1;f++){var v=(d+f)%o.length;if(o[v]===c){n[p]=a[v],t(i[p],a[v],p),d=v+1,l=!0;break}}l||(n[p]=r(u,p))}}n.length=i.length,o=s}}},e.createProjector=function(r){var t,o=f(r);o.eventHandlerInterceptor=function(e,r,o,n){return function(){return t.scheduleRender(),r.apply(n.bind||this,arguments)}};var n,i=!0,s=!1,a=[],d=[],p=function(){if(n=void 0,i){i=!1;for(var e=0;e<a.length;e++){var r=d[e]();a[e].update(r)}i=!0}};return t={renderNow:p,scheduleRender:function(){n||s||(n=requestAnimationFrame(p))},stop:function(){n&&(cancelAnimationFrame(n),n=void 0),s=!0},resume:function(){s=!1,i=!0,t.scheduleRender()},append:function(r,t){a.push(e.dom.append(r,t(),o)),d.push(t)},insertBefore:function(r,t){a.push(e.dom.insertBefore(r,t(),o)),d.push(t)},merge:function(r,t){a.push(e.dom.merge(r,t(),o)),d.push(t)},replace:function(r,t){a.push(e.dom.replace(r,t(),o)),d.push(t)},detach:function(e){for(var r=0;r<d.length;r++)if(d[r]===e)return d.splice(r,1),a.splice(r,1)[0];throw new Error("renderMaquetteFunction was not found")}}}});