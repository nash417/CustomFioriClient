/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/support/techinfo/moduleTreeHelper","sap/ui/Device","sap/ui/Global","sap/ui/core/format/DateFormat","sap/ui/model/resource/ResourceModel","sap/ui/model/json/JSONModel","sap/ui/thirdparty/URI","sap/m/MessageBox","sap/m/MessageToast","sap/ui/core/support/Support","sap/ui/model/SimpleType","sap/ui/model/ValidateException","sap/m/library","jquery.sap.global","jquery.sap.storage"],function(m,D,G,a,R,J,U,M,b,S,c,V,d,q){"use strict";return{_MIN_UI5VERSION_SUPPORT_ASSISTANT:"1.47",_MIN_EXPAND_LEVEL_DEBUG_MODULES:3,_storage:q.sap.storage(q.sap.storage.Type.local),_treeHelper:m,open:function(C){if(this._oDialog&&this._oDialog.isOpen()){return;}this._oModuleSystemInfo=C()||{};if(!this._oDialog){this._oDialog=sap.ui.xmlfragment("technicalInfoDialog","sap.ui.core.support.techinfo.TechnicalInfo",this);}this._initialize();this._oDialog.open();},close:function(){this._oDialog.close();},onShowHelp:function(){d.URLHelper.redirect("https://sapui5.hana.ondemand.com/#docs/guide/37a34cc084014bcdb1d13e6c0976042a.html",true);},onShowVersion:function(){d.URLHelper.redirect(sap.ui.resource("","sap-ui-version.json"),true);},onCopyTechnicalInfoToClipboard:function(){var o=this._oDialog.getModel("view"),v=o.getProperty("/ProductName")+": "+o.getProperty("/ProductVersion")+" "+sap.ui.getCore().byId("technicalInfoDialog--versionBuiltAt").getText(),s="OpenUI5 Version: "+o.getProperty("/OpenUI5ProductVersion")+" "+sap.ui.getCore().byId("technicalInfoDialog--versionOpenUI5BuiltAt").getText(),e=v+"\r\n"+(o.getProperty("/OpenUI5ProductVersion")?s+"\r\n":"")+this._getText("TechInfo.UserAgent.Label")+": "+o.getProperty("/UserAgent")+"\r\n"+this._getText("TechInfo.AppUrl.Label")+": "+o.getProperty("/ApplicationURL")+"\r\n";this._copyToClipboard(e,"TechInfo.CopyToClipboard");},onConfigureDebugModulesCopyToClipboard:function(){var o=this._oDialog.getModel("view"),t=o.getProperty("/DebugModules")[0],s="sap-ui-debug="+this._treeHelper.toDebugInfo(t);this._copyToClipboard(s,"TechInfo.DebugModulesCopyToClipboard");},onDebugSources:function(e){var s=e.getParameter("selected");this._confirmReload(function(){this._reloadWithParameter("sap-ui-debug",s);}.bind(this),function(){var o=this._oDialog.getModel("view");o.setProperty("/DebugMode",!o.getProperty("/DebugMode"));}.bind(this));},onConfigureDebugModules:function(){var o=this._oDialog.getModel("view"),t;if(this._oDebugPopover&&this._oDebugPopover.isOpen()){return;}t=this._treeHelper.toTreeModel(this._oModuleSystemInfo);o.setProperty("/DebugModules",[t.tree]);this._updateTreeInfos();if(!this._oDebugPopover){this._oDebugPopover=sap.ui.xmlfragment("TechnicalInfoDialogDebugModules","sap.ui.core.support.techinfo.TechnicalInfoDebugDialog",this);this._oDialog.addDependent(this._oDebugPopover);q.sap.syncStyleClass(this._getContentDensityClass(),this._oDialog,this._oDebugPopover);var C=sap.ui.getCore().byId("TechnicalInfoDialogDebugModules--customDebugValue");try{this._validateCustomDebugValue(C.getValue());}catch(e){this._showError(C,e.message);return;}}sap.ui.getCore().byId("TechnicalInfoDialogDebugModules--tree").expandToLevel(Math.max(this._MIN_EXPAND_LEVEL_DEBUG_MODULES,t.depth));this._oDebugPopover.open();},onConfigureDebugModulesConfirm:function(){this._confirmReload(function(){var o=this._oDialog.getModel("view");this._reloadWithParameter("sap-ui-debug",o.getProperty("/CustomDebugMode"));}.bind(this));},onConfigureDebugModulesClose:function(){this.onConfigureDebugModulesReset();this._oDebugPopover.close();},onConfigureDebugModuleSelect:function(e){var o=this._oDialog.getModel("view"),l=e.getParameter("listItem"),C=l.getItemNodeContext(),n=C.context.getPath(),s=o.getProperty(n),f=sap.ui.getCore().byId("TechnicalInfoDialogDebugModules--customDebugValue");this._resetValueState(f);this._treeHelper.recursiveSelect(s,l.getSelected());this._updateTreeInfos();},onChangeCustomDebugMode:function(){var o=this._oDialog.getModel("view"),C=sap.ui.getCore().byId("TechnicalInfoDialogDebugModules--customDebugValue"),t;try{this._validateCustomDebugValue(C.getValue());}catch(e){this._showError(C,e.message);return;}if(o.getProperty("/CustomDebugMode")==="true"){o.setProperty("/CustomDebugMode",true);}if(o.getProperty("/CustomDebugMode")==="false"){o.setProperty("/CustomDebugMode",false);}window["sap-ui-debug"]=o.getProperty("/CustomDebugMode");t=this._treeHelper.toTreeModel(this._oModuleSystemInfo);o.setProperty("/DebugModules",[t.tree]);sap.ui.getCore().byId("TechnicalInfoDialogDebugModules--tree").expandToLevel(Math.max(this._MIN_EXPAND_LEVEL_DEBUG_MODULES,t.depth));this._updateTreeInfos();},onConfigureDebugModulesReset:function(){var o=this._oDialog.getModel("view"),t=o.getProperty("/DebugModules")[0];this._treeHelper.recursiveSelect(t,false);this._updateTreeInfos();},onOpenDiagnostics:function(){var s=S.getStub();if(s.getType()!=S.StubType.APPLICATION){return;}s.openSupportTool();this.close();},onOpenAssistant:function(){var o=this._oDialog.getModel("view"),s=o.getProperty("/SelectedLocation"),e=o.getProperty("/StandardBootstrapURL"),C=o.getProperty("/CustomBootstrapURL"),B;if(s==="standard"){B=e;}else if(C){if(!C.match(/\/$/)){C+="/";}this._storage.put("sap-ui-custom-bootstrap-URL",C);o.setProperty("/CustomBootstrapURL",this._storage.get("sap-ui-custom-bootstrap-URL"));B=C;}this._startAssistant(B);},onSelectBootstrapOption:function(e){var k=e.getSource().getId().split("--").pop();this._setActiveLocations(k);},onChangeStandardBootstrapURL:function(e){var v=e.getParameter("selectedItem").getKey();this._storage.put("sap-ui-standard-bootstrap-URL",v);this._pingUrl(v,e.getSource());},onLiveChangeCustomBootstrapURL:function(e){var v=e.getParameter("value"),C=e.getSource();this._storage.put("sap-ui-custom-bootstrap-URL",v);try{this._validateValue(C.getValue());this._resetValueState(C);}catch(E){this._showError(C,E.message);}},onChangeOpenInNewWindow:function(e){var s=e.getParameter("selected");this._storage.put("sap-ui-open-sa-in-new-window",s);},onConfigureAssistantBootstrap:function(e){if(this._oAssistantPopover&&this._oAssistantPopover.isOpen()){return;}if(!this._oAssistantPopover){this._oAssistantPopover=sap.ui.xmlfragment("technicalInfoDialogAssistantPopover","sap.ui.core.support.techinfo.TechnicalInfoAssistantPopover",this);this._oAssistantPopover.attachAfterOpen(this._onAssistantPopoverOpened,this);this._oDialog.addDependent(this._oAssistantPopover);q.sap.syncStyleClass(this._getContentDensityClass(),this._oDialog,this._oAssistantPopover);var C=sap.ui.getCore().byId("technicalInfoDialogAssistantPopover--customBootstrapURL");sap.ui.getCore().getMessageManager().registerObject(C,true);}var o=sap.ui.getCore().byId("technicalInfoDialogAssistantPopover--standardBootstrapURL").getItems()[0];if(sap.ui.getCore().getConfiguration().getVersion().compareTo(this._MIN_UI5VERSION_SUPPORT_ASSISTANT)>=0){var A=sap.ui.getCore().getConfiguration().getVersion().toString();o.setText(o.getText().replace("[[version]]",A));o.setEnabled(true);}else{o.setText(o.getText().replace("[[version]]","not supported"));o.setEnabled(false);}var f=this._oDialog.getModel("view"),s=f.getProperty("/SelectedLocation");this._setActiveLocations(s);var g=sap.ui.getCore().byId("technicalInfoDialog--supportAssistantSettingsButton");this._oAssistantPopover.openBy(g);},_getText:function(k,p){return sap.ui.getCore().getLibraryResourceBundle().getText(k,p);},_validateValue:function(v){var r=/^https?:\/\/(www\.)?([-a-zA-Z0-9.%_+~#=]{2,})([-a-zA-Z0-9@:%_+.~#?&/=]*)\/sap\/ui\/support\/?$/,A=window.location.protocol;if(v&&!v.match(r)){throw new V(this._getText("TechInfo.SupportAssistantConfigPopup.URLValidationMessage"));}if(v&&A==="https:"&&!v.match(A)){throw new V(this._getText("TechInfo.SupportAssistantConfigPopup.ProtocolError"));}return true;},_validateCustomDebugValue:function(v){var r=/^(true|false|x|X)$|^(([a-zA-Z*[\]{}()+?.\\^$|]+\/?)+(,([a-zA-Z*[\]{}()+?.\\^$|]+\/?)+)*)$/;if(v&&!v.match(r)){throw new V(this._getText("TechInfo.DebugModulesConfigPopup.ModeValidationMessage"));}return true;},_convertBuildDate:function(s){var o=a.getInstance({pattern:"yyyyMMdd-HHmmss"});return o.parse(s);},_getContentDensityClass:function(){if(!this._sContentDensityClass){if(!D.support.touch){this._sContentDensityClass="sapUiSizeCompact";}else{this._sContentDensityClass="sapUiSizeCozy";}}return this._sContentDensityClass;},_startAssistant:function(B){var o=this._oDialog.getModel("view"),s={support:"true",window:o.getProperty("/OpenSupportAssistantInNewWindow")};this._loadAssistant(B,s);},_loadAssistant:function(u,s){q.ajax({type:"HEAD",async:true,context:this,url:u+"Bootstrap.js",success:function(){this.close();q.sap.registerModulePath("sap.ui.support",u);var B=sap.ui.requireSync("sap/ui/support/Bootstrap"),e=[s.support];if(s.window){e.push("window");}B.initSupportRules(e);},error:function(j,e){var f=this._getText("TechInfo.SupportAssistantConfigPopup.SupportAssistantNotFound");if(j.status===0){f+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorTryingToGetRecourse");}else if(j.status===404){f+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorNotFound");}else if(j.status===500){f+=this._getText("TechInfo.SupportAssistantConfigPopup.InternalServerError");}else if(e==='parsererror'){f+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorOnJsonParse");}else if(e==='timeout'){f+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorOnTimeout");}else if(e==='abort'){f+=this._getText("TechInfo.SupportAssistantConfigPopup.ErrorWhenAborted");}else{f+=this._getText("TechInfo.SupportAssistantConfigPopup.UncaughtError")+j.responseText;}this._sErrorMessage=f;this.onConfigureAssistantBootstrap();q.sap.log.error("Support Assistant could not be loaded from the URL you entered");}});},_initialize:function(){var i=new R({bundleName:"sap.ui.core.messagebundle"});this._oDialog.setModel(i,"i18n");this._oDialog.setModel(this._createViewModel(),"view");this._oDialog.addStyleClass(this._getContentDensityClass());},_createViewModel:function(){var s=new U(q.sap.getResourcePath(""),window.location.origin+window.location.pathname)+"/sap/ui/support/",e="standard",f=false;this._saveLocalStorageDefault("sap-ui-standard-bootstrap-URL",s);this._saveLocalStorageDefault("sap-ui-selected-location",e);this._saveLocalStorageDefault("sap-ui-open-sa-in-new-window",f);var v=new J({"ProductName":"SAPUI5","StandardBootstrapURL":this._storage.get("sap-ui-standard-bootstrap-URL"),"CustomBootstrapURL":this._storage.get("sap-ui-custom-bootstrap-URL"),"OpenSupportAssistantInNewWindow":this._storage.get("sap-ui-open-sa-in-new-window"),"SelectedLocation":this._storage.get("sap-ui-selected-location"),"OpenUI5ProductVersion":null,"OpenUI5ProductTimestamp":null,"DebugModuleSelectionCount":0});var o={};try{o=G.getVersionInfo();v.setProperty("/ProductName",o.name);v.setProperty("/ProductVersion",o.version);}catch(E){o.version="";q.sap.log.error("failed to load global version info");}try{v.setProperty("/ProductTimestamp",this._generateLocalizedBuildDate(o.buildTimestamp));}catch(E){q.sap.log.error("failed to parse build timestamp from global version info");}if(!/openui5/i.test(o.name)){v.setProperty("/OpenUI5ProductVersion",G.version);try{v.setProperty("/OpenUI5ProductTimestamp",this._generateLocalizedBuildDate(G.buildinfo.buildtime));}catch(E){q.sap.log.error("failed to parse OpenUI5 build timestamp from global version info");}}var A;try{A=this._getText("TechInfo.SupportAssistantConfigPopup.AppVersionOption",o.version);}catch(E){A="Application";}var g=[{"DisplayName":A,"Value":s},{"DisplayName":"OpenUI5 CDN","Value":"https://openui5.hana.ondemand.com/resources/sap/ui/support/"},{"DisplayName":"OpenUI5 (Nightly)","Value":"https://openui5nightly.hana.ondemand.com/resources/sap/ui/support/"},{"DisplayName":"OpenUI5 (Beta)","Value":"https://openui5beta.hana.ondemand.com/resources/sap/ui/support/"},{"DisplayName":"SAPUI5 CDN","Value":"https://sapui5.hana.ondemand.com/resources/sap/ui/support/"}];var h=this._getText("TechInfo.DebugModulesConfigPopup.SelectionCounter",v.DebugModuleSelectionCount);v.setProperty("/DebugModulesTitle",h);v.setProperty("/SupportAssistantPopoverURLs",g);v.setProperty("/ApplicationURL",document.location.href);v.setProperty("/UserAgent",navigator.userAgent);v.setProperty("/DebugMode",sap.ui.getCore().getConfiguration().getDebug());return v;},_saveLocalStorageDefault:function(p,s){if(!this._storage.get(p)){this._storage.put(p,s);}},_generateLocalizedBuildDate:function(B){var o=sap.ui.core.format.DateFormat.getDateInstance({pattern:"dd.MM.yyyy HH:mm:ss"}),s=o.format(this._convertBuildDate(B));return this._getText("TechInfo.VersionBuildTime.Text",s);},_setActiveLocations:function(v){var o=this._oDialog.getModel("view"),r=sap.ui.getCore().byId("technicalInfoDialogAssistantPopover--standard"),e=sap.ui.getCore().byId("technicalInfoDialogAssistantPopover--custom"),C=sap.ui.getCore().byId("technicalInfoDialogAssistantPopover--customBootstrapURL"),s=sap.ui.getCore().byId("technicalInfoDialogAssistantPopover--standardBootstrapURL"),f;this._resetValueState(C);this._resetValueState(s);if(v==="standard"){f=true;o.setProperty("/StandardBootstrapURL",this._storage.get("sap-ui-standard-bootstrap-URL"));s.setSelectedKey(o.getProperty("/StandardBootstrapURL"));}else{f=false;}s.setEnabled(f);r.setSelected(f);C.setEnabled(!f);e.setSelected(!f);this._storage.put("sap-ui-selected-location",v);o.setProperty("/SelectedLocation",this._storage.get("sap-ui-selected-location"));},_confirmReload:function(C,f){M.confirm(this._getText("TechInfo.DebugSources.ConfirmMessage"),{title:this._getText("TechInfo.DebugSources.ConfirmTitle"),onClose:function(A){if(A===M.Action.OK){C();}else if(f){f();}}});},_onAssistantPopoverOpened:function(){var o=this._oDialog.getModel("view"),s=o.getProperty("/SelectedLocation"),C;if(s==="custom"){C=sap.ui.getCore().byId("technicalInfoDialogAssistantPopover--customBootstrapURL");var v=C.getValue();try{this._validateValue(v);}catch(e){this._showError(C,e.message);if(this._sErrorMessage){this._sErrorMessage=null;}return;}}else{C=sap.ui.getCore().byId("technicalInfoDialogAssistantPopover--standardBootstrapURL");}if(this._sErrorMessage){this._showError(C,this._sErrorMessage);this._sErrorMessage=null;}},_showError:function(C,s){C.setValueStateText(s);C.setValueState("Error");C.openValueStateMessage();},_resetValueState:function(C){C.setValueState("None");C.closeValueStateMessage();},_pingUrl:function(u,C){q.ajax({type:"HEAD",async:true,context:this,url:u+"Bootstrap.js",success:function(){C.setValueState("Success");},error:function(){var s=this._getText("TechInfo.SupportAssistantConfigPopup.NotAvailableAtTheMoment");this._showError(C,s);q.sap.log.error("Support Assistant could not be loaded from the URL you entered");}});},_reloadWithParameter:function(p,v){var s=window.location.search,u=p+"="+v;if(s&&s!=="?"){var r=new RegExp("(?:^|\\?|&)"+p+"=[^&]+");if(s.match(r)){s=s.replace(r,u);}else{s+="&"+u;}}else{s="?"+u;}window.location.search=s;},_copyToClipboard:function(s,C){var $=q("<textarea>");try{q("body").append($);$.val(s).select();document.execCommand("copy");$.remove();b.show(this._getText(C+".Success"));}catch(e){b.show(this._getText(C+".Error"));}},_updateTreeInfos:function(){var o=this._oDialog.getModel("view"),t=o.getProperty("/DebugModules")[0],s;o.setProperty("/CustomDebugMode",this._treeHelper.toDebugInfo(t));o.setProperty("/DebugModuleSelectionCount",this._treeHelper.getSelectionCount(t));s=o.getProperty("/DebugModuleSelectionCount").toString();o.setProperty("/DebugModulesTitle",this._getText("TechInfo.DebugModulesConfigPopup.SelectionCounter",s));}};});