/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./TabStripItem','./TabStrip','sap/ui/Device'],function(T,a,D){"use strict";var b={};b.LEFT_OVERRFLOW_BTN_CLASS_NAME="sapMTSLeftOverflowButtons";b.RIGHT_OVERRFLOW_BTN_CLASS_NAME="sapMTSRightOverflowButtons";b.render=function(r,C){if(!C.getVisible()){return;}this.beginTabStrip(r,C);if(D.system.phone===true){this.renderTouchArea(r,C);}else{r.write("<div id='"+C.getId()+"-leftOverflowButtons' class='"+this.LEFT_OVERRFLOW_BTN_CLASS_NAME+"'>");if(C.getAggregation("_leftArrowButton")){this.renderLeftOverflowButtons(r,C,false);}r.write("</div>");this.beginTabsContainer(r,C);this.renderItems(r,C);this.endTabsContainer(r);r.write("<div id='"+C.getId()+"-rightOverflowButtons' class='"+this.RIGHT_OVERRFLOW_BTN_CLASS_NAME+"'>");if(C.getAggregation("_rightArrowButton")){this.renderRightOverflowButtons(r,C,false);}r.write("</div>");this.renderTouchArea(r,C);}this.endTabStrip(r);};b.renderItems=function(r,C){var i=C.getItems(),s=C.getSelectedItem();i.forEach(function(I){var d=s&&s===I.getId();this.renderItem(r,C,I,d);},this);};b.renderItem=function(r,C,i,s){r.write("<div id='"+i.getId()+"'");r.addClass(T.CSS_CLASS);if(i.getModified()){r.addClass(T.CSS_CLASS_MODIFIED);}if(s){r.addClass(T.CSS_CLASS_SELECTED);}r.writeClasses();r.writeElementData(i);r.writeAccessibilityState(i,c(i,C.getParent(),sap.ui.getCore().byId(C.getSelectedItem())));r.write(">");r.write("<span id='"+g(i)+"' class='"+T.CSS_CLASS_LABEL+"'>");this.renderItemText(r,i);r.write("</span>");this.renderItemCloseButton(r,i);r.write("</div>");};b.renderItemText=function(r,i){var I=i.getText();if(I.length>T.DISPLAY_TEXT_MAX_LENGTH){r.writeEscaped(I.slice(0,T.DISPLAY_TEXT_MAX_LENGTH));r.write('...');}else{r.writeEscaped(I);}};b.renderItemCloseButton=function(r,i){r.write("<div class='sapMTSItemCloseBtnCnt'>");r.renderControl(i.getAggregation("_closeButton"));r.write("</div>");};b.beginTabStrip=function(r,C){r.write("<div");r.addClass("sapMTabStrip");r.writeControlData(C);r.writeClasses();r.write(">");};b.endTabStrip=function(r){r.write("</div>");};b.beginTabsContainer=function(r,C){r.write("<div id='"+C.getId()+"-tabsContainer' class='sapMTSTabsContainer'>");r.write("<div id='"+C.getId()+"-tabs'  class='sapMTSTabs'");r.writeAccessibilityState(C,{role:"tablist"});r.write(">");};b.endTabsContainer=function(r){r.write("</div>");r.write("</div>");};b.renderLeftOverflowButtons=function(r,C,f){r.renderControl(C.getAggregation("_leftArrowButton"));if(f){r.flush(C.$("leftOverflowButtons")[0]);}};b.renderRightOverflowButtons=function(r,C,f){r.renderControl(C.getAggregation("_rightArrowButton"));if(f){r.flush(C.$("rightOverflowButtons")[0]);}};b.renderTouchArea=function(r,C){r.write("<div id='"+C.getId()+"-touchArea'  class='sapMTSTouchArea'>");r.renderControl(C.getAggregation('_select'));r.renderControl(C.getAddButton());r.write("</div>");};function g(i){return i.getId()+"-label";}function c(i,t,s){var A={role:"tab"},d=a.ARIA_STATIC_TEXTS.closable.getId()+" ";d+=i.getModified()?a.ARIA_STATIC_TEXTS.modified.getId():a.ARIA_STATIC_TEXTS.notModified.getId();A["describedby"]=d;A["labelledby"]=g(i);if(t&&t.getRenderer&&t.getRenderer().getContentDomId){A["controls"]=t.getRenderer().getContentDomId(t);}if(s&&s.getId()===i.getId()){A["selected"]="true";}else{A["selected"]="false";}return A;}return b;},true);
