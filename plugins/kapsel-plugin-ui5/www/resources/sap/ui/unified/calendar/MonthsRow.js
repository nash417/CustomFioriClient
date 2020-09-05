/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/Control','sap/ui/core/LocaleData','sap/ui/core/delegate/ItemNavigation','sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate','sap/ui/unified/library','sap/ui/core/format/DateFormat','sap/ui/core/library','sap/ui/core/Locale'],function(q,C,L,I,a,c,l,D,d,e){"use strict";var f=d.CalendarType;var M=C.extend("sap.ui.unified.calendar.MonthsRow",{metadata:{library:"sap.ui.unified",properties:{date:{type:"object",group:"Data"},startDate:{type:"object",group:"Data"},months:{type:"int",group:"Appearance",defaultValue:12},intervalSelection:{type:"boolean",group:"Behavior",defaultValue:false},singleSelection:{type:"boolean",group:"Behavior",defaultValue:true},showHeader:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{selectedDates:{type:"sap.ui.unified.DateRange",multiple:true,singularName:"selectedDate"},specialDates:{type:"sap.ui.unified.DateTypeRange",multiple:true,singularName:"specialDate"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{},focus:{parameters:{date:{type:"object"},notVisible:{type:"boolean"}}}}}});M.prototype.init=function(){this._oFormatYyyymm=D.getInstance({pattern:"yyyyMMdd",calendarType:f.Gregorian});this._oFormatLong=D.getInstance({pattern:"MMMM y"});this._mouseMoveProxy=q.proxy(this._handleMouseMove,this);this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");};M.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}if(this._sInvalidateMonths){q.sap.clearDelayedCall(this._sInvalidateMonths);}};M.prototype.onAfterRendering=function(){_.call(this);v.call(this);};M.prototype.onsapfocusleave=function(E){if(!E.relatedControlId||!q.sap.containsOrEquals(this.getDomRef(),sap.ui.getCore().byId(E.relatedControlId).getFocusDomRef())){if(this._bMouseMove){y.call(this,true);r.call(this,this._getDate());this._bMoveChange=false;this._bMousedownChange=false;u.call(this);}if(this._bMousedownChange){this._bMousedownChange=false;u.call(this);}}};M.prototype.invalidate=function(O){if(!this._bDateRangeChanged&&(!O||!(O instanceof sap.ui.unified.DateRange))){C.prototype.invalidate.apply(this,arguments);}else if(this.getDomRef()&&!this._sInvalidateMonths){if(this._bInvalidateSync){w.call(this);}else{this._sInvalidateMonths=q.sap.delayedCall(0,this,w);}}};M.prototype.removeAllSelectedDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("selectedDates");return R;};M.prototype.destroySelectedDates=function(){this._bDateRangeChanged=true;var b=this.destroyAggregation("selectedDates");return b;};M.prototype.removeAllSpecialDates=function(){this._bDateRangeChanged=true;var R=this.removeAllAggregation("specialDates");return R;};M.prototype.destroySpecialDates=function(){this._bDateRangeChanged=true;var b=this.destroyAggregation("specialDates");return b;};M.prototype.setDate=function(b){m.call(this,c.fromLocalJSDate(b),false);return this;};M.prototype._setDate=function(b){var i=b.toLocalJSDate();this.setProperty("date",i,true);this._oDate=b;};M.prototype._getDate=function(){if(!this._oDate){this._oDate=new c();}return this._oDate;};M.prototype.setStartDate=function(S){a._checkJSDateObject(S);var b,Y,O;Y=S.getFullYear();a._checkYearInValidRange(Y);b=c.fromLocalJSDate(S);this.setProperty("startDate",S,true);this._oStartDate=b;this._oStartDate.setDate(1);if(this.getDomRef()){O=this._getDate().toLocalJSDate();this._bNoRangeCheck=true;this.displayDate(S);this._bNoRangeCheck=false;if(O&&this.checkDateFocusable(O)){this.setDate(O);}}return this;};M.prototype._getStartDate=function(){if(!this._oStartDate){this._oStartDate=new c();this._oStartDate.setDate(1);}return this._oStartDate;};M.prototype.displayDate=function(b){m.call(this,c.fromLocalJSDate(b),true);return this;};M.prototype._getLocale=function(){var P=this.getParent();if(P&&P.getLocale){return P.getLocale();}else if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString();}return this._sLocale;};M.prototype._getLocaleData=function(){var P=this.getParent();if(P&&P._getLocaleData){return P._getLocaleData();}else if(!this._oLocaleData){var b=this._getLocale();var i=new e(b);this._oLocaleData=L.getInstance(i);}return this._oLocaleData;};M.prototype._getFormatLong=function(){var b=this._getLocale();if(this._oFormatLong.oLocale.toString()!=b){var i=new e(b);this._oFormatLong=D.getInstance({style:"long"},i);}return this._oFormatLong;};M.prototype.getIntervalSelection=function(){var P=this.getParent();if(P&&P.getIntervalSelection){return P.getIntervalSelection();}else{return this.getProperty("intervalSelection");}};M.prototype.getSingleSelection=function(){var P=this.getParent();if(P&&P.getSingleSelection){return P.getSingleSelection();}else{return this.getProperty("singleSelection");}};M.prototype.getSelectedDates=function(){var P=this.getParent();if(P&&P.getSelectedDates){return P.getSelectedDates();}else{return this.getAggregation("selectedDates",[]);}};M.prototype.getSpecialDates=function(){var P=this.getParent();if(P&&P.getSpecialDates){return P.getSpecialDates();}else{return this.getAggregation("specialDates",[]);}};M.prototype._getShowHeader=function(){var P=this.getParent();if(P&&P._getShowItemHeader){return P._getShowItemHeader();}else{return this.getProperty("showHeader");}};M.prototype.getAriaLabelledBy=function(){var P=this.getParent();if(P&&P.getAriaLabelledBy){return P.getAriaLabelledBy();}else{return this.getAssociation("ariaLabelledBy",[]);}};M.prototype.getLegend=function(){var P=this.getParent();if(P&&P.getLegend){return P.getLegend();}else{return this.getAssociation("ariaLabelledBy",[]);}};M.prototype._checkDateSelected=function(b){var R,S,E,T,z=0,A=0,B=0,i,F,G;a._checkCalendarDate(b);F=this.getSelectedDates();G=new c(b);G.setDate(1);T=G.toUTCJSDate().getTime();for(i=0;i<F.length;i++){R=F[i];S=R.getStartDate();z=0;if(S){S=c.fromLocalJSDate(S);S.setDate(1);z=S.toUTCJSDate().getTime();}E=R.getEndDate();A=0;if(E){E=c.fromLocalJSDate(E);E.setDate(1);A=E.toUTCJSDate().getTime();}if(T==z&&!E){B=1;break;}else if(T==z&&E){B=2;if(E&&T==A){B=5;}break;}else if(E&&T==A){B=3;break;}else if(E&&T>z&&T<A){B=4;break;}if(this.getSingleSelection()){break;}}return B;};M.prototype._getDateType=function(b){a._checkCalendarDate(b);var T,R,i,S,z=0,E,A=0,B,F=this.getSpecialDates(),G=new c(b);G.setDate(1);B=G.toUTCJSDate().getTime();for(i=0;i<F.length;i++){R=F[i];S=R.getStartDate();z=0;if(S){S=c.fromLocalJSDate(S);S.setDate(1);z=S.toUTCJSDate().getTime();}E=R.getEndDate();A=0;if(E){E=c.fromLocalJSDate(E);E.setDate(a._daysInMonth(E));A=E.toUTCJSDate().getTime();}if((B==z&&!E)||(B>=z&&B<=A)){T={type:R.getType(),tooltip:R.getTooltip_AsString()};break;}}return T;};M.prototype._checkMonthEnabled=function(b){a._checkCalendarDate(b);var P=this.getParent();if(P&&P._oMinDate&&P._oMaxDate){if(a._isOutside(b,P._oMinDate,P._oMaxDate)){return false;}}return true;};M.prototype._handleMouseMove=function(E){if(!this.$().is(":visible")){y.call(this,true);}var T=q(E.target);if(T.hasClass("sapUiCalItemText")){T=T.parent();}if(T.hasClass("sapUiCalItem")){var O=this._getDate();var F=c.fromLocalJSDate(this._oFormatYyyymm.parse(T.attr("data-sap-month")));F.setDate(1);if(!F.isSame(O)){this._setDate(F);r.call(this,F,true);this._bMoveChange=true;}}};M.prototype.onmouseup=function(E){if(this._bMouseMove){y.call(this,true);var F=this._getDate();var b=this._oItemNavigation.getItemDomRefs();for(var i=0;i<b.length;i++){var $=q(b[i]);if($.attr("data-sap-month")==this._oFormatYyyymm.format(F.toUTCJSDate(),true)){$.focus();break;}}if(this._bMoveChange){var T=q(E.target);if(T.hasClass("sapUiCalItemText")){T=T.parent();}if(T.hasClass("sapUiCalItem")){F=c.fromLocalJSDate(this._oFormatYyyymm.parse(T.attr("data-sap-month")));F.setDate(1);}r.call(this,F);this._bMoveChange=false;this._bMousedownChange=false;u.call(this);}}if(this._bMousedownChange){this._bMousedownChange=false;u.call(this);}};M.prototype.onsapselect=function(E){var S=r.call(this,this._getDate());if(S){u.call(this);}E.stopPropagation();E.preventDefault();};M.prototype.onsapselectmodifiers=function(E){this.onsapselect(E);};M.prototype.onsappageupmodifiers=function(E){var F=new c(this._getDate());var Y=F.getYear();if(E.metaKey||E.ctrlKey){F.setYear(Y-10);}else{var i=this.getMonths();if(i<=12){F.setYear(Y-1);}else{F.setMonth(F.getMonth()-i);}}this.fireFocus({date:F.toLocalJSDate(),notVisible:true});E.preventDefault();};M.prototype.onsappagedownmodifiers=function(E){var F=new c(this._getDate());var Y=F.getYear();if(E.metaKey||E.ctrlKey){F.setYear(Y+10);}else{var i=this.getMonths();if(i<=12){F.setYear(Y+1);}else{F.setMonth(F.getMonth()+i);}}this.fireFocus({date:F.toLocalJSDate(),notVisible:true});E.preventDefault();};M.prototype.onThemeChanged=function(){if(this._bNoThemeChange){return;}this._bNamesLengthChecked=undefined;this._bLongWeekDays=undefined;var b=this._getLocaleData();var z=b.getMonthsStandAlone("wide");var A=this.$("months").children();var B=this._getStartDate().getMonth();for(var i=0;i<A.length;i++){var $=q(q(A[i]).children(".sapUiCalItemText"));$.text(z[(i+B)%12]);}v.call(this);};M.prototype.checkDateFocusable=function(b){a._checkJSDateObject(b);if(this._bNoRangeCheck){return false;}var S=this._getStartDate();var E=new c(S);E.setDate(1);E.setMonth(E.getMonth()+this.getMonths());var i=c.fromLocalJSDate(b);return i.isSameOrAfter(S)&&i.isBefore(E);};M.prototype.applyFocusInfo=function(i){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());return this;};function _(){var b=this._getDate();var Y=this._oFormatYyyymm.format(b.toUTCJSDate(),true);var z=0;var R=this.$("months").get(0);var A=this.$("months").children(".sapUiCalItem");for(var i=0;i<A.length;i++){var $=q(A[i]);if($.attr("data-sap-month")===Y){z=i;break;}}if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.attachEvent(I.Events.AfterFocus,g,this);this._oItemNavigation.attachEvent(I.Events.FocusAgain,h,this);this._oItemNavigation.attachEvent(I.Events.BorderReached,j,this);this.addDelegate(this._oItemNavigation);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});this._oItemNavigation.setCycling(false);this._oItemNavigation.setColumns(1,true);}this._oItemNavigation.setRootDomRef(R);this._oItemNavigation.setItemDomRefs(A);this._oItemNavigation.setFocusedIndex(z);this._oItemNavigation.setPageSize(A.length);}function g(b){var i=b.getParameter("index");var E=b.getParameter("event");if(!E){return;}var O=this._getDate();var F=new c(O);var z=this._oItemNavigation.getItemDomRefs();var $=q(z[i]);F=c.fromLocalJSDate(this._oFormatYyyymm.parse($.attr("data-sap-month")));F.setDate(1);this._setDate(F);this.fireFocus({date:F.toLocalJSDate(),notVisible:false});if(E.type=="mousedown"){k.call(this,E,F,i);}}function h(b){var i=b.getParameter("index");var E=b.getParameter("event");if(!E){return;}if(E.type=="mousedown"){var F=this._getDate();k.call(this,E,F,i);}}function j(b){var E=b.getParameter("event");var i=this.getMonths();var O=this._getDate();var F=new c(O);if(E.type){switch(E.type){case"sapnext":case"sapnextmodifiers":F.setMonth(F.getMonth()+1);break;case"sapprevious":case"sappreviousmodifiers":F.setMonth(F.getMonth()-1);break;case"sappagedown":F.setMonth(F.getMonth()+i);break;case"sappageup":F.setMonth(F.getMonth()-i);break;default:break;}this.fireFocus({date:F.toLocalJSDate(),notVisible:true});}}function k(E,F,i){if(E.button){return;}var S=r.call(this,F);if(S){this._bMousedownChange=true;}if(this._bMouseMove){y.call(this,true);this._bMoveChange=false;}else if(S&&this.getIntervalSelection()&&this.$().is(":visible")){x.call(this,true);}E.preventDefault();E.setMark("cancelAutoClose");}function m(b,N){a._checkCalendarDate(b);var Y=b.getYear();a._checkYearInValidRange(Y);var F=true;if(!this.getDate()||!b.isSame(c.fromLocalJSDate(this.getDate()))){var i=new c(b);i.setDate(1);F=this.checkDateFocusable(b.toLocalJSDate());if(!this._bNoRangeCheck&&!F){throw new Error("Date must be in visible date range; "+this);}this.setProperty("date",b.toLocalJSDate(),true);this._oDate=i;}if(this.getDomRef()){if(F){n.call(this,this._oDate,N);}else{o.call(this,N);}}}function n(b,N){var Y=this._oFormatYyyymm.format(b.toUTCJSDate(),true);var z=this._oItemNavigation.getItemDomRefs();var $;for(var i=0;i<z.length;i++){$=q(z[i]);if($.attr("data-sap-month")==Y){if(document.activeElement!=z[i]){if(N){this._oItemNavigation.setFocusedIndex(i);}else{this._oItemNavigation.focusItem(i);}}break;}}}function o(N){var b=this._getStartDate();var $=this.$("months");if($.length>0){var R=sap.ui.getCore().createRenderManager();this.getRenderer().renderMonths(R,this,b);R.flush($[0]);R.destroy();}p.call(this);_.call(this);if(!N){this._oItemNavigation.focusItem(this._oItemNavigation.getFocusedIndex());}}function p(){var S=this._getStartDate();if(this._getShowHeader()){var $=this.$("Head");if($.length>0){var b=this._getLocaleData();var R=sap.ui.getCore().createRenderManager();this.getRenderer().renderHeaderLine(R,this,b,S);R.flush($[0]);R.destroy();}}}function r(b,z){if(!this._checkMonthEnabled(b)){return false;}var S=this.getSelectedDates();var A;var B=this._oItemNavigation.getItemDomRefs();var $;var Y;var i=0;var P=this.getParent();var E=this;var F;if(P&&P.getSelectedDates){E=P;}if(this.getSingleSelection()){if(S.length>0){A=S[0];F=A.getStartDate();if(F){F=c.fromLocalJSDate(F);F.setDate(1);}}else{A=new sap.ui.unified.DateRange();E.addAggregation("selectedDates",A,true);}if(this.getIntervalSelection()&&(!A.getEndDate()||z)&&F){var G;if(b.isBefore(F)){G=F;F=b;if(!z){A.setProperty("startDate",F.toLocalJSDate(),true);A.setProperty("endDate",G.toLocalJSDate(),true);}}else if(b.isSameOrAfter(F)){G=b;if(!z){A.setProperty("endDate",G.toLocalJSDate(),true);}}s.call(this,F,G);}else{s.call(this,b);A.setProperty("startDate",b.toLocalJSDate(),true);A.setProperty("endDate",undefined,true);}}else{if(this.getIntervalSelection()){throw new Error("Calender don't support multiple interval selection");}else{var H=this._checkDateSelected(b);if(H>0){for(i=0;i<S.length;i++){F=S[i].getStartDate();if(F){F=c.fromLocalJSDate(F);F.setDate(1);if(b.isSame(F)){E.removeAggregation("selectedDates",i,true);break;}}}}else{A=new sap.ui.unified.DateRange({startDate:b.toLocalJSDate()});E.addAggregation("selectedDates",A,true);}Y=this._oFormatYyyymm.format(b.toUTCJSDate(),true);for(i=0;i<B.length;i++){$=q(B[i]);if($.attr("data-sap-month")==Y){if(H>0){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}else{$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");}}}}}return true;}function s(S,E){var b=this._oItemNavigation.getItemDomRefs();var $;var i=0;var z=false;var A=false;if(!E){var Y=this._oFormatYyyymm.format(S.toUTCJSDate(),true);for(i=0;i<b.length;i++){$=q(b[i]);z=false;A=false;if($.attr("data-sap-month")==Y){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");z=true;}else if($.hasClass("sapUiCalItemSel")){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}if($.hasClass("sapUiCalItemSelStart")){$.removeClass("sapUiCalItemSelStart");}else if($.hasClass("sapUiCalItemSelBetween")){$.removeClass("sapUiCalItemSelBetween");}else if($.hasClass("sapUiCalItemSelEnd")){$.removeClass("sapUiCalItemSelEnd");}t.call(this,$,z,A);}}else{var B;for(i=0;i<b.length;i++){$=q(b[i]);z=false;A=false;B=c.fromLocalJSDate(this._oFormatYyyymm.parse($.attr("data-sap-month")));B.setDate(1);if(B.isSame(S)){$.addClass("sapUiCalItemSelStart");z=true;$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");if(E&&B.isSame(E)){$.addClass("sapUiCalItemSelEnd");A=true;}$.removeClass("sapUiCalItemSelBetween");}else if(E&&a._isBetween(B,S,E)){$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");$.addClass("sapUiCalItemSelBetween");$.removeClass("sapUiCalItemSelStart");$.removeClass("sapUiCalItemSelEnd");}else if(E&&B.isSame(E)){$.addClass("sapUiCalItemSelEnd");A=true;$.addClass("sapUiCalItemSel");$.attr("aria-selected","true");$.removeClass("sapUiCalItemSelStart");$.removeClass("sapUiCalItemSelBetween");}else{if($.hasClass("sapUiCalItemSel")){$.removeClass("sapUiCalItemSel");$.attr("aria-selected","false");}if($.hasClass("sapUiCalItemSelStart")){$.removeClass("sapUiCalItemSelStart");}else if($.hasClass("sapUiCalItemSelBetween")){$.removeClass("sapUiCalItemSelBetween");}else if($.hasClass("sapUiCalItemSelEnd")){$.removeClass("sapUiCalItemSelEnd");}}t.call(this,$,z,A);}}}function t($,S,E){if(!this.getIntervalSelection()){return;}var b="";var z=[];var A=this.getId();var B=false;b=$.attr("aria-describedby");if(b){z=b.split(" ");}var F=-1;var G=-1;for(var i=0;i<z.length;i++){var H=z[i];if(H==(A+"-Start")){F=i;}if(H==(A+"-End")){G=i;}}if(F>=0&&!S){z.splice(F,1);B=true;if(G>F){G--;}}if(G>=0&&!E){z.splice(G,1);B=true;}if(F<0&&S){z.push(A+"-Start");B=true;}if(G<0&&E){z.push(A+"-End");B=true;}if(B){b=z.join(" ");$.attr("aria-describedby",b);}}function u(){if(this._bMouseMove){y.call(this,true);}this.fireSelect();}function v(){if(!this._bNamesLengthChecked){var i=0;var z=this.$("months").children();var T=false;var A=this.getMonths();var B=Math.ceil(12/A);var E=0;var F=this._getLocaleData();var G=F.getMonthsStandAlone("wide");var $;for(var b=0;b<B;b++){if(A<12){for(i=0;i<z.length;i++){$=q(q(z[i]).children(".sapUiCalItemText"));$.text(G[(i+E)%12]);}E=E+A;if(E>11){E=11;}}for(i=0;i<z.length;i++){var H=z[i];if(Math.abs(H.clientWidth-H.scrollWidth)>1){T=true;break;}}if(T){break;}}if(A<12){E=this._getStartDate().getMonth();for(i=0;i<z.length;i++){$=q(q(z[i]).children(".sapUiCalItemText"));$.text(G[(i+E)%12]);}}if(T){this._bLongMonth=false;var J=F.getMonthsStandAlone("abbreviated");E=this._getStartDate().getMonth();for(i=0;i<z.length;i++){$=q(q(z[i]).children(".sapUiCalItemText"));$.text(J[(i+E)%12]);}}else{this._bLongMonth=true;}this._bNamesLengthChecked=true;}}function w(){this._sInvalidateMonths=undefined;o.call(this,this._bNoFocus);this._bDateRangeChanged=undefined;this._bNoFocus=undefined;}function x(){q(window.document).bind('mousemove',this._mouseMoveProxy);this._bMouseMove=true;}function y(){q(window.document).unbind('mousemove',this._mouseMoveProxy);this._bMouseMove=undefined;}return M;});