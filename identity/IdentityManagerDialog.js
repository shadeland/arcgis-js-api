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

define(["dojo/_base/kernel","../core/declare","dojo/Deferred","dojo/_base/lang","dojo/dom-attr","dojo/keys","dijit/registry","dijit/Dialog","../kernel","../core/lang","../core/Error","../core/domUtils","./Credential","./IdentityManagerBase","dojo/i18n!./nls/identity","dojo/query","dijit/form/Button","dijit/form/Form","dijit/form/ValidationTextBox"],function(e,t,i,r,s,n,d,o,a,l,c,u,_,g,b){var p=t([g],{declaredClass:"esri.identity.IdentityManager",constructor:function(e){r.mixin(this,e)},_dialogContent:"<div data-dojo-type='dijit.form.Form' data-dojo-props='\"class\":\"esriIdForm\"'><div class='dijitDialogPaneContentArea'><div style='padding-bottom: 5px; word-wrap: break-word;'>{info}</div><div style='margin: 0px; padding: 0px; height: 10px;'></div><div class='esriErrorMsg' style='display: none; color: white; background-color: #D46464; text-align: center; padding-top: 3px; padding-bottom: 3px;'>{invalidUser}</div><div style='margin: 0px; padding: 0px; height: 10px;'></div><table style='width: 100%;'><tr><td><label>{lblUser}</label><br/>"+'<input data-dojo-type=\'dijit.form.ValidationTextBox\' data-dojo-props=\'type:"text", "class":"esriIdUser", required:true, trim:true, style:"width: 100%;", autocapitalize:"none", autocorrect:"off", spellcheck:false\' /></td></tr><tr><td><label>{lblPwd}</label><br/><input data-dojo-type=\'dijit.form.ValidationTextBox\' data-dojo-props=\'type:"password", "class":"esriIdPwd", required:true, style:"width: 100%;"\' /></td></tr></table></div><div class=\'dijitDialogPaneActionBar\'><button data-dojo-type=\'dijit.form.Button\' data-dojo-props=\'type:"button", "class":"esriIdSubmit"\'>{lblOk}</button><button data-dojo-type=\'dijit.form.Button\' data-dojo-props=\'type:"button", "class":"esriIdCancel"\'>{lblCancel}</button></div></div>',signIn:function(e,t,r){this._nls||(this._nls=b),this._loginDialog||(this._loginDialog=this.dialog=this._createLoginDialog(),this.emit("dialog-create"));var n=this._loginDialog,d=r&&r.error,o=r&&r.token,a=new i(function(){n.onCancel()});if(n.open){var l=new c("identity-manager:busy","BUSY");return a.reject(l),a.promise}return u.hide(n.errMsg_),d&&d.details&&403==d.details.httpStatus&&o&&(s.set(n.errMsg_,"innerHTML",this._nls.forbidden),u.show(n.errMsg_)),n.dfd_=a,n.serverInfo_=t,n.resUrl_=e,n.admin_=r&&r.isAdmin,s.set(n.resLink_,{title:e,innerHTML:"("+(this.getResourceName(e)||this._nls.lblItem)+")"}),s.set(n.serverLink_,{title:t.server,innerHTML:(-1!==t.server.toLowerCase().indexOf("arcgis.com")?"ArcGIS Online":t.server)+" "}),n.txtPwd_.set("value",""),n.show(),a.promise},_createLoginDialog:function(){var t=this._nls,i=l.substitute(t,this._dialogContent);i=l.substitute({resource:"<span class='resLink' style='word-wrap: break-word;'></span>",server:"<span class='serverLink' style='word-wrap: break-word;'></span>"},i);var r="esriIdentityDialog--visible",g=new o({title:t.title,content:i,"class":" esri-widget esriSignInDialog esriIdentityDialog",style:"width: 18em;",esriIdMgr_:this,onShow:function(){this.domNode.classList.add(r)},onHide:function(){this.domNode.classList.remove(r)},keypressed_:function(e){e.charOrCode===n.ENTER&&this.execute_()},execute_:function(){var e=this.txtUser_.get("value"),i=this.txtPwd_.get("value"),r=this.dfd_,n=this;if(this.form_.validate()&&e&&i){this.btnSubmit_.set("label",t.lblSigning);var d=a.id.findCredential(n.resUrl_,e),c=function(i){n.btnSubmit_.set("label",t.lblOk),n.btnSubmit_.set("disabled",!1),u.hide(n.errMsg_),n.hide(),o._DialogLevelManager.hide(n);var s=n.serverInfo_;n.dfd_=n.serverInfo_=n.generateDfd_=n.resUrl_=null;var a,c,g,b=d;i&&(a=i.token,c=l.isDefined(i.expires)?Number(i.expires):null,g=!!i.ssl,b?(b.userId=e,b.token=a,b.expires=c,b.validity=i.validity,b.ssl=g,b.creationTime=(new Date).getTime()):b=new _({userId:e,server:s.server,token:a,expires:c,ssl:g,isAdmin:n.admin_,validity:i.validity})),r.resolve(b)};if(d&&!d._enqueued)return void c();n.btnSubmit_.set("disabled",!0),n.generateDfd_=a.id.generateToken(this.serverInfo_,{username:e,password:i},{isAdmin:this.admin_}).then(c).then(null,function(e){n.btnSubmit_.set("disabled",!1),n.generateDfd_=null,n.btnSubmit_.set("label",t.lblOk),s.set(n.errMsg_,"innerHTML",e&&e.details&&e.details.httpStatus?t.invalidUser:t.noAuthService),u.show(n.errMsg_)})}},cancel_:function(){g.generateDfd_&&g.generateDfd_.cancel();var e=g.dfd_,t=g.resUrl_,i=g.serverInfo_;g.btnSubmit_.set("disabled",!1),g.dfd_=g.serverInfo_=g.generateDfd_=g.resUrl_=null,u.hide(g.errMsg_),o._DialogLevelManager.hide(g),g.esriIdMgr_.emit("dialog-cancel",{resourceUrl:t,serverInfo:i});var r=new c("identity-manager:user-aborted","ABORTED");e.reject(r)}}),b=g.domNode;return g.form_=d.byNode(e.query(".esriIdForm",b)[0]),g.txtUser_=d.byNode(e.query(".esriIdUser",b)[0]),g.txtPwd_=d.byNode(e.query(".esriIdPwd",b)[0]),g.btnSubmit_=d.byNode(e.query(".esriIdSubmit",b)[0]),g.btnCancel_=d.byNode(e.query(".esriIdCancel",b)[0]),g.resLink_=e.query(".resLink",b)[0],g.serverLink_=e.query(".serverLink",b)[0],g.errMsg_=e.query(".esriErrorMsg",b)[0],g.connect(g.txtUser_,"onKeyPress",g.keypressed_),g.connect(g.txtPwd_,"onKeyPress",g.keypressed_),g.connect(g.btnSubmit_,"onClick",g.execute_),g.connect(g.btnCancel_,"onClick",g.onCancel),g.connect(g,"onCancel",g.cancel_),g}});return p});