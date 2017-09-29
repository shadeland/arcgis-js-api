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

define(["require","exports","./GoogPriorityQueue","../../support/PromiseLightweight","../../lib/glMatrix","../../../../core/urlUtils"],function(e,t,i,r,n,o){var s=i.goog.structs.PriorityQueue,u=function(){function e(e,t,i,r,s,u,a,h,d,l,c){void 0===c&&(c={initDepthFirst:!0,neighborhood:!0,perLevelTraversal:!1});var p=this;this.baseURL=e,this.startNodeUrl=t,this.rootId=i,this.poi=r,this.nodeIndex=s,this.streamDataSupplier=u,this.viewportQueries=a,this.processNodeIndexDocument=h,this.finishedLevelCallback=d,this.logger=l,this.traversalOptions=c,this.queues=[],this.knownNodes=new Set,this.dataLoadingPerLevel=[],this.currentLevel=0,this.numIndicesLoading=0,this.queueTraversalEnabled=!1,this.cancelled=!1,this.initQueryErrback=function(){p.initPromise.done()},this.initQueryCallback=function(e,t){if(p.cancelled)return void p.initPromise.done();if(p.nodeTraversalState(t.id),p.enqueueConnected(e,t,0),p.isLeafNode(t))p.initPromise.done();else{for(var i=1e9,r=void 0,n=0;n<t.children.length;++n){var s=t.children[n];if(p.nodeIsVisible(s)){if(p.viewportQueries.hasLOD(t)&&p.viewportQueries.isTooHighLOD(t))continue;var u=p.viewportQueries.distToPOI(s,p.poi);i>u&&(i=u,r=s)}}if(r){var a=o.makeAbsolute(r.href,e);p.getNode(a,r.id,p.initQueryCallback,p.initQueryErrback)}else p.initPromise.done()}},this.poi=n.vec3d.create(r)}return e.prototype.updatePointOfInterest=function(e){n.vec3d.set(e,this.poi),this.reprioritizeQueues()},e.prototype.start=function(){var e=this;this._nodeTraversalState={},this._nodeIsVisibleCached={},this.dataLoadingPerLevel=[],this.currentLevel=0,this.rootUrl=o.makeAbsolute(this.startNodeUrl,this.baseURL),this.traversalOptions.initDepthFirst?(this.initPromise=new r.Promise,this.getNode(this.rootUrl,this.rootId,this.initQueryCallback,this.initQueryErrback),this.initPromise.then(function(){e.cancelled||(e.queueTraversalEnabled=!0)})):(this.enqueue({id:this.rootId,hrefConcat:this.rootUrl,mbs:null},0),this.queueTraversalEnabled=!0)},e.prototype.continueTraversal=function(e){if(void 0===e&&(e=5),this.queueTraversalEnabled)for(var t=0;t<this.queues.length;t++)if(!this.traversalOptions.perLevelTraversal||this.currentLevel===t){for(var i=this.queues[t];e-- >0&&!i.isEmpty();)this.processQueueOne(t);this.traversalOptions.perLevelTraversal&&i.isEmpty()&&0===this.dataLoadingPerLevel[t]&&(this.finishedLevelCallback.call(null,this.currentLevel),this.currentLevel++)}},e.prototype.isQueueTraversalEnabled=function(){return this.queueTraversalEnabled},e.prototype.getQueueSize=function(){for(var e=0,t=0;t<this.queues.length;t++)e+=this.queues[t].getCount();return e},e.prototype.cancel=function(){this.queueTraversalEnabled=!1;for(var e=0;e<this.queues.length;e++)this.queues[e].clear();this.cancelled=!0},e.prototype.isLoading=function(){return this.numIndicesLoading>0||this.getQueueSize()>0},e.prototype.nodeIsVisible=function(e){return null!=this._nodeIsVisibleCached[e.id]?this._nodeIsVisibleCached[e.id]:(this._nodeIsVisibleCached[e.id]=this.viewportQueries.isNodeVisible(e),this._nodeIsVisibleCached[e.id])},e.prototype.nodeTraversalState=function(e){if(null!=this._nodeTraversalState[e])return this._nodeTraversalState[e];var t=this.nodeIndex[e];if(null==t)return null;var i=null,r=!1;if(null!=t.parentNode){if(i=this.nodeIndex[t.parentNode.id],null==i)return null;var n=this._nodeTraversalState[i.id];null!=n&&(r=n.nodeIsTooHighLOD)}var o=this.viewportQueries.hasLOD(t),s=this.viewportQueries.isTooHighLOD(t),u=this.viewportQueries.isChosenLOD(t,i,s,r);return this._nodeTraversalState[t.id]={visited:!0,nodeHasLOD:o,nodeIsTooHighLOD:s,isChosenLOD:u},this._nodeTraversalState[e]},e.prototype.reprioritizeQueues=function(){for(var e=0;e<this.queues.length;e++)this.queues[e]=this.reprioritizeQueue(this.queues[e])},e.prototype.reprioritizeQueue=function(e){for(var t=new s;!e.isEmpty();){var i=e.dequeue(),r=this.entryPriority(i);t.enqueue(r,i)}return t},e.prototype.processQueueOne=function(e){var t=this,i=this.queues[e],r=i.dequeue();this.dataLoadingPerLevel[e]++;var n=function(){return t.dataLoadingPerLevel[e]--},o=function(i,r){t.nodeTraversalState(r.id),t.enqueueConnected(i,r,e),t.processNodeIndexDocument(r).then(n,n)},s=function(e,i){var r=t.traversalOptions.neighborhood&&null!=i.parentNode;if(r){var s=t.concatHref(i.parentNode,e);t.getNode(s,i.parentNode.id,function(){return o(e,i)},n)}else o(e,i)};this.getNode(r.hrefConcat,r.id,s,n)},e.prototype.getNode=function(e,t,i,r){var n=this;this.numIndicesLoading++,this.nodeIndex[t]?(i(e,this.nodeIndex[t]),this.numIndicesLoading--):this.streamDataSupplier.request(e,"json").then(function(e,t){var r=t;n.nodeIndex[r.id]=r,r.baseUrl=e,i(e,r),n.numIndicesLoading--},function(t){null!=r&&r(t),n.loadErrorCallback(e),n.numIndicesLoading--})},e.prototype.isLeafNode=function(e){return null==e.children},e.prototype.concatHref=function(e,t){return o.makeAbsolute(e.href,t)},e.prototype.entryPriority=function(e){return e.id===this.rootId?0:this.viewportQueries.distToPOI(e,this.poi)},e.prototype.enqueue=function(e,t){for(this.traversalOptions.perLevelTraversal||(t=0),this.knownNodes.add(e.id);this.queues.length<=t;)this.queues.push(new s),this.dataLoadingPerLevel.push(0);var i=this.entryPriority(e);this.queues[t].enqueue(i,e)},e.prototype.queueEntryFromNode=function(e,t){return{id:e.id,mbs:e.mbs,hrefConcat:t}},e.prototype.queueEntryFromNodeRef=function(e,t){return this.queueEntryFromNode(e,this.concatHref(e,t))},e.prototype.enqueueConnected=function(e,t,i){if(!this.cancelled&&null!=t){var r=this.nodeTraversalState(t.id);if(t.id===this.rootId||null==t.parentNode||this.knownNodes.has(t.parentNode.id)?t.id===this.rootId&&!this.knownNodes.has(t.id)&&this.nodeIsVisible(t)&&this.enqueue(this.queueEntryFromNode(t,e),i):this.enqueue(this.queueEntryFromNodeRef(t.parentNode,e),i-1),t.children)for(var n=0,o=t.children;n<o.length;n++){var s=o[n],u=this.nodeIsVisible(s);this.knownNodes.has(s.id)||r.nodeHasLOD&&r.nodeIsTooHighLOD||!u||this.enqueue(this.queueEntryFromNodeRef(s,e),i+1)}if(this.traversalOptions.neighborhood&&t.neighbors)for(var a=0,h=t.neighbors;a<h.length;a++){var d=h[a],l=this.nodeIsVisible(d);!this.knownNodes.has(d.id)&&l&&this.enqueue(this.queueEntryFromNodeRef(d,e),i)}}},e.prototype.loadErrorCallback=function(e){this.logger.warn("Error loading node: "+e)},e}();return u});