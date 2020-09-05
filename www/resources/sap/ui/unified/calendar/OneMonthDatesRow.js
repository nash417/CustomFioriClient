/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/unified/calendar/DatesRow','sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate','sap/ui/unified/library'],function(D,C,a,l){"use strict";var O=D.extend("sap.ui.unified.calendar.OneMonthDatesRow",{metadata:{library:"sap.ui.unified"}});O.prototype.init=function(){D.prototype.init.apply(this,arguments);this.iMode=2;};O.prototype.setMode=function(m){var s=this.getSelectedDates(),S,c=this.iMode!==m;this.iMode=m;if(c&&s.length){if(this.iMode<2){S=this.getStartDate();}s[0].setProperty('startDate',S,true);}return this;};O.prototype.getMode=function(){return this.iMode;};O.prototype.selectDate=function(d){if(this.iMode<2&&this.getSelectedDates().length){this.getSelectedDates()[0].setStartDate(d);}return this;};O.prototype.setDate=function(d){if(!this._bNoRangeCheck&&!this.checkDateFocusable(d)){return this;}D.prototype.setDate.apply(this,arguments);return this;};O.prototype.displayDate=function(d){if(!this._bNoRangeCheck&&!this.checkDateFocusable(d)){return this;}D.prototype.displayDate.apply(this,arguments);return this;};O.prototype.onsaphome=function(e){var c=a.fromLocalJSDate(this.getStartDate());i(e);this._setDate(c);this._focusDate(c);this.fireFocus({date:c.toLocalJSDate(),otherMonth:false});};O.prototype.onsapend=function(e){var s=this.getStartDate(),L;L=a.fromLocalJSDate(s);L.setDate(C._daysInMonth(L));i(e);this._setDate(L);this._focusDate(L);this.fireFocus({date:L.toLocalJSDate(),otherMonth:false});};function i(e){e.stopPropagation();e.preventDefault();e.stopImmediatePropagation(true);}return O;});
