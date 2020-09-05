/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/ManagedObject","sap/ui/rta/toolbar/Fiori","sap/ui/rta/toolbar/Standalone","sap/ui/rta/toolbar/Personalization","sap/ui/dt/ElementUtil","sap/ui/dt/DesignTime","sap/ui/dt/OverlayRegistry","sap/ui/dt/Overlay","sap/ui/rta/command/Stack","sap/ui/rta/command/CommandFactory","sap/ui/rta/command/LREPSerializer","sap/ui/rta/plugin/Rename","sap/ui/rta/plugin/DragDrop","sap/ui/rta/plugin/RTAElementMover","sap/ui/rta/plugin/CutPaste","sap/ui/rta/plugin/Remove","sap/ui/rta/plugin/CreateContainer","sap/ui/rta/plugin/additionalElements/AdditionalElementsPlugin","sap/ui/rta/plugin/additionalElements/AddElementsDialog","sap/ui/rta/plugin/additionalElements/AdditionalElementsAnalyzer","sap/ui/rta/plugin/Combine","sap/ui/rta/plugin/Split","sap/ui/rta/plugin/Selection","sap/ui/rta/plugin/Settings","sap/ui/dt/plugin/ContextMenu","sap/ui/dt/plugin/TabHandling","sap/ui/fl/FlexControllerFactory","sap/ui/rta/Utils","sap/ui/fl/transport/Transports","sap/ui/fl/transport/TransportSelection","sap/ui/fl/Utils","sap/ui/fl/registry/Settings","sap/m/MessageBox","sap/m/MessageToast","sap/ui/rta/util/PopupManager","sap/ui/core/BusyIndicator","sap/ui/dt/DOMUtil","sap/ui/rta/util/StylesLoader","sap/ui/rta/appVariant/Feature","sap/ui/Device"],function(q,M,F,S,P,E,D,O,a,C,b,L,R,c,d,e,f,g,A,h,i,j,k,l,m,n,T,o,U,p,r,s,t,u,v,w,B,x,y,z,G){"use strict";var H="sap-ui-fl-max-layer";var I=M.extend("sap.ui.rta.RuntimeAuthoring",{metadata:{library:"sap.ui.rta",associations:{"rootControl":{type:"sap.ui.core.Control"}},properties:{"customFieldUrl":"string","showCreateCustomField":"boolean","showToolbars":{type:"boolean",defaultValue:true},"triggeredFromDialog":{type:"boolean",defaultValue:false},"showWindowUnloadDialog":{type:"boolean",defaultValue:true},"commandStack":{type:"any"},"plugins":{type:"any",defaultValue:{}},"flexSettings":{type:"object",defaultValue:{layer:"CUSTOMER",developerMode:true}},"mode":{type:"string",defaultValue:"adaptation"}},events:{"start":{parameters:{editablePluginsCount:{type:"int"}}},"stop":{},"failed":{},"selectionChange":{parameters:{selection:{type:"sap.ui.dt.Overlay[]"}}},"modeChanged":{},"undoRedoStackModified":{}}},_sAppTitle:null,_dependents:null,constructor:function(){M.apply(this,arguments);this._dependents={};this.iEditableOverlaysCount=0;this.addDependent(new w(),'popupManager');if(this.getShowToolbars()){this.getPopupManager().attachOpen(this.onPopupOpen,this);this.getPopupManager().attachClose(this.onPopupClose,this);}}});I.prototype.getDefaultPlugins=function(){if(!this._mDefaultPlugins){var K=new b({flexSettings:this.getFlexSettings()});this._mDefaultPlugins={};this._mDefaultPlugins["selection"]=new l({commandFactory:K,multiSelectionRequiredPlugins:[j.getMetadata().getName(),f.getMetadata().getName()],elementEditableChange:this._onElementEditableChange.bind(this)});var N=new d({commandFactory:K});this._mDefaultPlugins["dragDrop"]=new c({elementMover:N,commandFactory:K,dragStarted:this._handleStopCutPaste.bind(this)});this._mDefaultPlugins["rename"]=new R({commandFactory:K,editable:this._handleStopCutPaste.bind(this)});this._mDefaultPlugins["additionalElements"]=new A({commandFactory:K,analyzer:i,dialog:new h()});this._mDefaultPlugins["createContainer"]=new g({commandFactory:K});this._mDefaultPlugins["remove"]=new f({commandFactory:K});this._mDefaultPlugins["cutPaste"]=new e({elementMover:N,commandFactory:K});this._mDefaultPlugins["settings"]=new m({commandFactory:K});this._mDefaultPlugins["combine"]=new j({commandFactory:K});this._mDefaultPlugins["split"]=new k({commandFactory:K});this._mDefaultPlugins["contextMenu"]=new n({styleClass:U.getRtaStyleClassName()});this._mDefaultPlugins["tabHandling"]=new T();}return q.extend({},this._mDefaultPlugins);};I.prototype.addDependent=function(K,N){if(!(N in this._dependents)){if(N){this['get'+q.sap.charToUpperCase(N,0)]=this.getDependent.bind(this,N);}this._dependents[N||K.getId()]=K;}};I.prototype.getDependent=function(N){return this._dependents[N];};I.prototype.getDependents=function(){return this._dependents;};I.prototype._destroyDefaultPlugins=function(K){for(var N in this._mDefaultPlugins){var Q=this._mDefaultPlugins[N];if(Q&&!Q.bIsDestroyed){if(!K||K[N]!==Q){Q.destroy();}}}if(!K){this._mDefaultPlugins=null;}};I.prototype.onPopupOpen=function(K){if(K.getParameters()instanceof sap.m.Dialog&&this.getToolbar()instanceof F){this.getToolbar().setColor("contrast");}this.getToolbar().bringToFront();};I.prototype.onPopupClose=function(K){if(K.getParameters()instanceof sap.m.Dialog){this.getToolbar().setColor();}};I.prototype.setPlugins=function(K){if(this._oDesignTime){throw new Error('Cannot replace plugins: runtime authoring already started');}this.setProperty("plugins",K);};I.prototype.setFlexSettings=function(K){var N=q.sap.getUriParameters();var Q=N.mParams["sap-ui-layer"];K=q.extend({},this.getFlexSettings(),K);if(Q&&Q.length>0){K.layer=Q[0];}U.setRtaStyleClassName(K.layer);this.setProperty("flexSettings",K);};I.prototype.getLayer=function(K){return this.getFlexSettings().layer;};I.prototype._getFlexController=function(){var K=this._oRootControl||sap.ui.getCore().byId(this.getRootControl());return o.createForControl(K);};I.prototype._getTextResources=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");};I.prototype.start=function(){if(!this._oDesignTime){this._oRootControl=sap.ui.getCore().byId(this.getRootControl());return this._handlePersonalizationChangesOnStart().then(function(K){if(K){return Promise.reject(false);}if(!this.getPlugins()||!Object.keys(this.getPlugins()).length){this.setPlugins(this.getDefaultPlugins());}this._destroyDefaultPlugins(this.getPlugins());Object.keys(this.getPlugins()).forEach(function(V){if(this.getPlugins()[V].attachElementModified){this.getPlugins()[V].attachElementModified(this._handleElementModified,this);}}.bind(this));if(this.getPlugins()["settings"]){this.getPlugins()["settings"].setCommandStack(this.getCommandStack());}this._oSerializer=new L({commandStack:this.getCommandStack(),rootControl:this.getRootControl()});var N=Object.keys(this.getPlugins());var Q=N.map(function(V){return this.getPlugins()[V];},this);q.sap.measure.start("rta.dt.startup","Measurement of RTA: DesignTime start up");this._oDesignTime=new D({rootElements:[this._oRootControl],plugins:Q});q(a.getOverlayContainer()).addClass("sapUiRta");if(this.getLayer()==="USER"){q(a.getOverlayContainer()).addClass("sapUiRtaPersonalize");}this._oRootControl.addStyleClass("sapUiRtaRoot");this._oDesignTime.attachSelectionChange(function(V){this.fireSelectionChange({selection:V.getParameter("selection")});},this);this._oDesignTime.attachEventOnce("synced",function(){this.fireStart({editablePluginsCount:this.iEditableOverlaysCount});q.sap.measure.end("rta.dt.startup","Measurement of RTA: DesignTime start up");},this);this._oDesignTime.attachEventOnce("syncFailed",function(){this.fireFailed();},this);this._oldUnloadHandler=window.onbeforeunload;window.onbeforeunload=this._onUnload.bind(this);}.bind(this)).then(function(){if(this.getShowToolbars()){return this._getPublishAndAppVariantSupportVisibility().then(function(K){var N=K[0];var Q=K[1];this._createToolsMenu(N,Q);return this.getToolbar().show();}.bind(this));}}.bind(this)).then(function(){this.fnKeyDown=this._onKeyDown.bind(this);q(document).on("keydown",this.fnKeyDown);}.bind(this)).then(function(){this.getPopupManager().setRta(this);var K=this.getPopupManager().getRelevantPopups();if(K.aDialogs||K.aPopovers){return this.getShowToolbars()&&this.getToolbar().bringToFront();}}.bind(this)).then(function(){y.loadStyles('InPageStyles').then(function(K){var N=K.replace(/%scrollWidth%/g,x.getScrollbarWidth()+'px');x.insertStyles(N);});}).catch(function(K){if(K){return Promise.reject(K);}});}};I.prototype._getPublishAndAppVariantSupportVisibility=function(){return t.getInstance().then(function(K){return z.isPlatFormEnabled(this.getLayer(),this._oRootControl).then(function(N){return[!K.isProductiveSystem()&&!K.hasMergeErrorOccured(),N];});}.bind(this)).catch(function(K){return false;});};var J=function(K){var N=K.stack||K.message||K.status||K;var Q=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");q.sap.log.error("Failed to transfer runtime adaptation changes to layered repository",N);var V=Q.getText("MSG_LREP_TRANSFER_ERROR")+"\n"+Q.getText("MSG_ERROR_REASON",N);u.error(V,{styleClass:U.getRtaStyleClassName()});};I.prototype.setCommandStack=function(K){var N=this.getProperty("commandStack");if(N){N.detachModified(this._onStackModified,this);}if(this._oInternalCommandStack){this._oInternalCommandStack.destroy();delete this._oInternalCommandStack;}var Q=this.setProperty("commandStack",K);if(K){K.attachModified(this._onStackModified,this);}if(this.getPlugins()&&this.getPlugins()["settings"]){this.getPlugins()["settings"].setCommandStack(K);}return Q;};I.prototype.getCommandStack=function(){var K=this.getProperty("commandStack");if(!K){K=new C();this._oInternalCommandStack=K;this.setCommandStack(K);}return K;};I.prototype._onStackModified=function(){var K=this.getCommandStack();var N=K.canUndo();var Q=K.canRedo();var V=U.getUshellContainer();if(this.getShowToolbars()){this.getToolbar().setUndoRedoEnabled(N,Q);this.getToolbar().setPublishEnabled(this._bChangesExist||N);this.getToolbar().setRestoreEnabled(this._bChangesExist||N);}this.fireUndoRedoStackModified();if(V){if(N){V.setDirtyFlag(true);}else{V.setDirtyFlag(false);}}};I.prototype._closeToolbar=function(){if(this.getShowToolbars()&&this.getToolbar){return this.getToolbar().hide();}};I.prototype.getSelection=function(){if(this._oDesignTime){return this._oDesignTime.getSelection();}else{return[];}};I.prototype.stop=function(K,N){return((K)?Promise.resolve():this._serializeToLrep()).then(this._closeToolbar.bind(this)).then(N?Promise.resolve():this._handlePersonalizationChangesOnExit.bind(this)).then(function(){this.fireStop();}.bind(this))['catch'](J);};I.prototype.restore=function(){this._onRestore();};I.prototype.transport=function(){this._onTransport();};I.prototype.undo=function(){return this._onUndo();};I.prototype.redo=function(){return this._onRedo();};I.prototype.canUndo=function(){return this.getCommandStack().canUndo();};I.prototype.canRedo=function(){return this.getCommandStack().canRedo();};I.prototype._onKeyDown=function(K){var N=G.os.macintosh;var Q=a.getOverlayContainer().contains(document.activeElement);var V=this.getShowToolbars()&&this.getToolbar().getDomRef().contains(document.activeElement);var W=document.body===document.activeElement;var X=q(document.activeElement).parents('.sapUiRtaEditableField').length>0;if((Q||V||W)&&!X){var Y=N?K.metaKey:K.ctrlKey;if(K.keyCode===q.sap.KeyCodes.Z&&K.shiftKey===false&&K.altKey===false&&Y===true){this._onUndo().then(K.stopPropagation.bind(K));}else if(((N&&K.keyCode===q.sap.KeyCodes.Z&&K.shiftKey===true)||(!N&&K.keyCode===q.sap.KeyCodes.Y&&K.shiftKey===false))&&K.altKey===false&&Y===true){this._onRedo().then(K.stopPropagation.bind(K));}}};I.prototype._onUnload=function(){var K=this.getCommandStack();var N=K.canUndo()||K.canRedo();if(N&&this.getShowWindowUnloadDialog()){var Q=this._getTextResources().getText("MSG_UNSAVED_CHANGES");return Q;}else{window.onbeforeunload=this._oldUnloadHandler;}};I.prototype._serializeToLrep=function(){return this._oSerializer.saveCommands();};I.prototype._onUndo=function(){this._handleStopCutPaste();return this.getCommandStack().undo();};I.prototype._onRedo=function(){this._handleStopCutPaste();return this.getCommandStack().redo();};I.prototype._createToolsMenu=function(K,N){if(!this.getDependent('toolbar')){var Q;if(this.getLayer()==="USER"){Q=P;}else if(U.getFiori2Renderer()){Q=F;}else{Q=S;}if(this.getLayer()==="USER"){this.addDependent(new Q({textResources:this._getTextResources(),exit:this.stop.bind(this,false,false),restore:this._onRestore.bind(this)}),'toolbar');}else{this.addDependent(new Q({modeSwitcher:this.getMode(),publishVisible:K,textResources:this._getTextResources(),appVariantFeaturesSupported:N,exit:this.stop.bind(this,false,false),transport:this._onTransport.bind(this),restore:this._onRestore.bind(this),undo:this._onUndo.bind(this),redo:this._onRedo.bind(this),modeChange:this._onModeChange.bind(this),manageApps:z.onGetOverview.bind(null,this._oRootControl),saveAs:z.onSaveAs.bind(null,this._oRootControl,null)}),'toolbar');}this._checkChangesExist().then(function(V){this._bChangesExist=V;this.getToolbar().setPublishEnabled(V);this.getToolbar().setRestoreEnabled(V);}.bind(this));}};I.prototype.exit=function(){q.map(this._dependents,function(N){N.destroy(true);});if(this._oDesignTime){q(a.getOverlayContainer()).removeClass("sapUiRta");this._oDesignTime.destroy();this._oDesignTime=null;q(document).off("keydown",this.fnKeyDown);this._destroyDefaultPlugins();this.setPlugins(null);}if(this._oRootControl){this._oRootControl.removeStyleClass("sapUiRtaRoot");}this.setCommandStack(null);var K=U.getUshellContainer();if(K){K.setDirtyFlag(false);}window.onbeforeunload=this._oldUnloadHandler;};I.prototype._onTransport=function(){var K=function(N){B.hide();if(N.message!=='createAndApply failed'){s.log.error("transport error"+N);return this._showMessage(u.Icon.ERROR,"HEADER_TRANSPORT_ERROR","MSG_TRANSPORT_ERROR",N);}}.bind(this);this._handleStopCutPaste();return this._openSelection().then(this._checkTransportInfo).then(function(N){if(N){return this._serializeToLrep().then(function(){return this._getFlexController().getComponentChanges({currentLayer:this.getLayer()}).then(function(Q){if(Q.length>0){B.show(0);return this._createAndApplyChanges(Q).then(this._transportAllLocalChanges.bind(this,N))['catch'](K);}}.bind(this));}.bind(this))['catch'](J);}}.bind(this));};I.prototype._checkTransportInfo=function(K){if(K&&K.transport&&K.packageName!=="$TMP"){return K;}else{return false;}};I.prototype._openSelection=function(){return new r().openTransportSelection(null,this._oRootControl,U.getRtaStyleClassName());};I.prototype._createAndApplyChanges=function(K){var N=[];return Promise.resolve().then(function(){function V(Q){return Q&&Q.selector&&Q.selector.id;}K.filter(V).forEach(function(Q){var W=sap.ui.getCore().byId(Q.selector.id);var X=this._getFlexController();N.push(X.createAndApplyChange.bind(X,Q,W));}.bind(this));return s.execPromiseQueueSequentially(N);}.bind(this)).catch(function(Q){s.log.error("Create and apply error: "+Q);return Q;}).then(function(Q){return this._getFlexController().saveAll().then(function(){if(Q){throw Q;}});}.bind(this)).catch(function(Q){s.log.error("Create and apply and/or save error: "+Q);return this._showMessage(u.Icon.ERROR,"HEADER_TRANSPORT_APPLYSAVE_ERROR","MSG_TRANSPORT_APPLYSAVE_ERROR",Q);}.bind(this));};I.prototype._deleteChanges=function(){var K=new r();var N=this.getLayer();var Q=this.getCommandStack().getAllExecutedCommands().reduce(function(V,W){if(W.getPreparedChange){V.push(W.getPreparedChange());}else if(W.getVariantChange&&W.getVariantChange()){V.push(W.getVariantChange());}return V;},[]);this._getFlexController().getComponentChanges({currentLayer:N}).then(function(V){V=V.concat(Q);return t.getInstance(s.getComponentClassName(this._oRootControl)).then(function(W){if(!W.isProductiveSystem()&&!W.hasMergeErrorOccured()){return K.setTransports(V,this._oRootControl);}}.bind(this)).then(function(){return this._getFlexController().discardChanges(V,N==="USER");}.bind(this)).then(function(){return window.location.reload();});}.bind(this))["catch"](function(V){return this._showMessage(u.Icon.ERROR,"HEADER_RESTORE_FAILED","MSG_RESTORE_FAILED",V);}.bind(this));};I.prototype._showMessage=function(K,N,Q,V){var W=this._getTextResources().getText(Q,V?[V.message||V]:undefined);var X=this._getTextResources().getText(N);return new Promise(function(Y){u.show(W,{icon:K,title:X,onClose:Y,styleClass:U.getRtaStyleClassName()});});};I.prototype._showMessageToast=function(K){var N=this._getTextResources().getText(K);v.show(N);};I.needsRestart=function(K){var N=!!window.localStorage.getItem("sap.ui.rta.restart."+K);return N;};I.enableRestart=function(K){window.localStorage.setItem("sap.ui.rta.restart."+K,true);};I.disableRestart=function(K){window.localStorage.removeItem("sap.ui.rta.restart."+K);};I.prototype._onRestore=function(){var K=this.getLayer()==="USER"?this._getTextResources().getText("FORM_PERS_RESET_MESSAGE_PERSONALIZATION"):this._getTextResources().getText("FORM_PERS_RESET_MESSAGE");var N=this.getLayer()==="USER"?this._getTextResources().getText("BTN_RESTORE"):this._getTextResources().getText("FORM_PERS_RESET_TITLE");var Q=function(V){if(V==="OK"){I.enableRestart(this.getLayer());this._deleteChanges();this.getCommandStack().removeAllCommands();}}.bind(this);this._handleStopCutPaste();u.confirm(K,{icon:u.Icon.WARNING,title:N,onClose:Q,styleClass:U.getRtaStyleClassName()});};I.prototype._transportAllLocalChanges=function(K){return this._getFlexController().getComponentChanges({currentLayer:this.getLayer()}).then(function(N){var Q=new p();var V=Q._convertToChangeTransportData(N);var W={};W.package=K.packageName;W.transportId=K.transport;W.changeIds=V;return Q.makeChangesTransportable(W).then(function(){N.forEach(function(X){if(X.getPackage()==='$TMP'){var Y=X.getDefinition();Y.packageName=K.packageName;X.setResponse(Y);}});}).then(function(){B.hide();this._showMessageToast("MSG_TRANSPORT_SUCCESS");}.bind(this));}.bind(this));};I.prototype._isEqualParentInfo=function(K,N){var Q=!!K&&!!N;if(Q&&(K.parent&&N.parent)){Q=K.parent.getId()===N.parent.getId();}if(Q&&(K.index||N.index)){Q=K.index===N.index;}if(Q&&(K.aggregation||N.aggregation)){Q=K.aggregation===N.aggregation;}return Q;};I.prototype._setRenameOnCreatedContainer=function(K,N){var Q=this.getPlugins()["createContainer"].getCreatedContainerOverlay(K,N);if(Q){Q.setSelected(true);if(this.getPlugins()["rename"]){var V={"onAfterRendering":function(){setTimeout(function(){this.getPlugins()["rename"].startEdit(Q);}.bind(this),0);Q.removeEventDelegate(V);}.bind(this)};Q.addEventDelegate(V);}}};I.prototype._handleElementModified=function(K){this._handleStopCutPaste();var N=K.getParameter("action");var Q=K.getParameter("newControlId");var V=K.getParameter("command");if(V instanceof sap.ui.rta.command.BaseCommand){return this.getCommandStack().pushAndExecute(V).then(function(){if(N&&Q){this._setRenameOnCreatedContainer(N,Q);}}.bind(this));}return Promise.resolve();};I.prototype._onElementEditableChange=function(K){var N=K.getParameter("editable");if(N){this.iEditableOverlaysCount+=1;}else{this.iEditableOverlaysCount-=1;}};I.prototype._handleStopCutPaste=function(){if(this.getPlugins()["cutPaste"]){this.getPlugins()["cutPaste"].stopCutAndPaste();}};I.prototype._getApplicationTitle=function(){var K="";var N=sap.ui.core.Component.getOwnerComponentFor(this._oRootControl);if(N){K=N.getMetadata().getManifestEntry("sap.app").title;}return K;};I.prototype._checkChangesExist=function(){if(this._getFlexController().getComponentName().length>0){return this._getFlexController().getComponentChanges({currentLayer:this.getLayer()}).then(function(K){return K.length>0;});}else{return Promise.resolve(false);}};I.prototype._getURLParsedHash=function(){var K=sap.ushell.Container.getService("URLParsing");if(K.parseShellHash&&K.getHash){return K.parseShellHash(K.getHash(window.location.href));}};I.prototype._buildNavigationArguments=function(K){return{target:{semanticObject:K.semanticObject,action:K.action,context:K.contextRaw},params:K.params,appSpecificRoute:K.appSpecificRoute,writeHistory:false};};I.prototype._hasCustomerLayerParameter=function(K){return K.params&&K.params[H]&&K.params[H][0]==="CUSTOMER";};I.prototype._reloadWithoutPersonalizationChanges=function(K,N){if(!this._hasCustomerLayerParameter(K)){if(!K.params){K.params={};}K.params[H]=["CUSTOMER"];I.enableRestart("CUSTOMER");N.toExternal(this._buildNavigationArguments(K));return Promise.resolve(true);}};I.prototype._reloadWithPersonalizationChanges=function(K,N){if(this._hasCustomerLayerParameter(K)){delete K.params[H];N.toExternal(this._buildNavigationArguments(K));return Promise.resolve(true);}};I.prototype._handlePersonalizationMessageBoxOnStart=function(){return this._showMessage(u.Icon.INFORMATION,"HEADER_PERSONALIZATION_EXISTS","MSG_PERSONALIZATION_EXISTS");};I.prototype._handlePersonalizationChangesOnStart=function(){var K=U.getUshellContainer();if(K&&this.getLayer()!=="USER"){var N=this._getURLParsedHash();return this._getFlexController().isPersonalized({ignoreMaxLayerParameter:false}).then(function(Q){if(Q){return this._handlePersonalizationMessageBoxOnStart().then(function(){var V=sap.ushell.Container.getService("CrossApplicationNavigation");if(V.toExternal&&N){return this._reloadWithoutPersonalizationChanges(N,V);}}.bind(this));}}.bind(this));}else{return Promise.resolve(false);}};I.prototype._handlePersonalizationMessageBoxOnExit=function(){return new Promise(function(K){var N=this._getTextResources().getText("MSG_LOAD_PERSONALIZATION_CHANGES");var Q=this._getTextResources().getText("HEADER_LOAD_PERSONALIZATION_CHANGES");var V=this._getTextResources().getText("MSG_PERSONALIZATION_CONFIRM_BUTTON_TEXT");var W=this._getTextResources().getText("MSG_PERSONALIZATION_CANCEL_BUTTON_TEXT");var X=function(Y){if(Y===V){return K(true);}else if(Y===W){return K(false);}};u.confirm(N,{icon:u.Icon.QUESTION,title:Q,actions:[V,W],onClose:X,styleClass:U.getRtaStyleClassName()});}.bind(this));};I.prototype._handlePersonalizationChangesOnExit=function(){var K=U.getUshellContainer();if(K&&this.getLayer()!=="USER"){return this._getFlexController().isPersonalized({ignoreMaxLayerParameter:true}).then(function(N){if(N){return this._handlePersonalizationMessageBoxOnExit().then(function(Q){if(Q){var V=sap.ushell.Container.getService("CrossApplicationNavigation");var W=this._getURLParsedHash();if(V.toExternal&&W){return this._reloadWithPersonalizationChanges(W,V);}}}.bind(this));}}.bind(this));}else{return Promise.resolve(false);}};I.prototype._onModeChange=function(K){this.setMode(K.getParameter('key'));};I.prototype.setMode=function(N){if(this.getProperty('mode')!==N){var K=this.getShowToolbars()&&this.getToolbar().getControl('modeSwitcher');var Q=N==='adaptation';if(K){K.setSelectedButton(K.getItems().filter(function(V){return V.getKey()===N;}).pop().getId());}this._oDesignTime.setEnabled(Q);this.getPlugins()['tabHandling'][Q?'removeTabIndex':'restoreTabIndex']();this.setProperty('mode',N);this.fireModeChanged({mode:N});}};return I;},true);
