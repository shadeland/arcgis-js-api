// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.23/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/promise/all","dojo/when","dijit/Dialog","./createHTML/HTMLStringBuilder","esri/dijit/geoenrichment/utils/FileUtil","./supportClasses/MapToImageUtil","../../PlayerCommands","../supportClasses/GEUtil","dojo/i18n!../../../../../nls/jsapi","../../_devConfig"],function(e,r,n,i,t,o,a,l,s,d,c){d=d.geoenrichment.dijit.ReportPlayer.ReportPlayer;var m={buildHTMLPageString:function(e,r,n){var i;i=r.config.createPlayerCommand.prettifyDataJson||c.createPlayerCommand.saveDataJsonAsTextFile?JSON.stringify(e,void 0,4):JSON.stringify(e),c.createPlayerCommand.saveDataJsonAsTextFile&&o.saveTextFile(i,"reportDataJson");var a=[];return a.push('html, body, #layoutNode { padding: 0px; margin: 0px; height: 100%; overflow: hidden; font-size: 13px; font-family: "Avenir Next"; }'),t.composeHtmlStringFromParts({reportTitle:r.getReportTitle(),links:[r.config.esriDijitCssUrl,r.config.esriCssUrl],cssFiles:a,scripts:[{src:r.config.playerSourceRootUrl},'require(["require", "esri/dijit/geoenrichment/nlsFix"],\nfunction (relativeRequire, nlsFix) {\n   nlsFix.load(null, relativeRequire);\n   require([\n       "dojo/when",\n       "dojo/sniff",\n       "esri/dijit/geoenrichment/ReportPlayer/ReportPlayer",\n       "esri/dijit/geoenrichment/ReportPlayer/DataProviderGE",\n       "esri/dijit/geoenrichment/ReportPlayer/PlayerResizeModes",\n       "esri/dijit/geoenrichment/ReportPlayer/PlayerZoomBehaviors",\n       "esri/dijit/geoenrichment/ReportPlayer/PlayerCommands",\n       "esri/dijit/geoenrichment/utils/UrlUtil",\n       "dojo/domReady!"\n   ],\n   function (\n       when,\n       has,\n       ReportPlayer,\n       DataProviderGE,\n       PlayerResizeModes,\n       PlayerZoomBehaviors,\n       PlayerCommands,\n       UrlUtil\n   ) {\n       esriConfig.defaults.io.proxyUrl = UrlUtil.getVariableValue(window.location.href, "proxy") || null;\n       var reportDataJson = '+i+';\n       var dataProvider = new DataProviderGE();\n       dataProvider.registerCommand(PlayerCommands.PRINT);\n       if (!has("ie") && !has("trident"))\n       dataProvider.registerCommand(PlayerCommands.IMAGE);\n       var player = new ReportPlayer({\n           isSlidesView: UrlUtil.getVariableValue(window.location.href, "slidesView"),\n           dataProvider: dataProvider,\n           enableDataDrilling: '+n+",\n           resizeMode: PlayerResizeModes.FIT_WINDOW,\n           defaultZoomBehavior: PlayerZoomBehaviors.FIT_PAGE,\n           onError: function(e) {\n               console.log(e);\n           }\n       }).placeAt(layoutNode);\n       when(dataProvider.reportDataFromJson(reportDataJson), function (reportData) {\n           player.setReportData(reportData);\n       });\n   });\n});"],contentString:'<div id="layoutNode"></div>'})}};return e(null,{id:l.DYNAMIC_HTML,label:d.createDynamicHTMLCommandLabel,errorMessage:d.exportInfographicError,execute:function(e,r){function i(n){var i=m.buildHTMLPageString(n,e,c);t=i;var a=e.getReportTitle()+".html";return i&&!r.returnAsHtmlText&&l._confirmSaveFile(a,function(){o.saveTextFile(i,a,"text/html")})}r=r||{};var t,l=this,d=r.printableContainer,c=d.allowDataDrilling();return n(a.collectMapsAsImages(e,{saveImagesAsBase64:!0}),function(o){return n(e.dataProvider.reportDataToJson(e.getReportData(),{allowDataDrilling:c,mapImageInfos:o}),function(o){return r.returnReportDataJson?void(t=o):n(i(o),function(){r.creditsTaskID&&s.consumeCredits(e.getReportData().config.geoenrichmentUrl,r.creditsTaskID)})})}).otherwise(this._handleError.bind(this)).always(function(){return n(d.stop(),function(){return t})})},_handleError:function(e){console.log(e),new i({title:"Error",content:this.errorMessage}).show()},_confirmSaveFile:function(e,r){return r()}})});