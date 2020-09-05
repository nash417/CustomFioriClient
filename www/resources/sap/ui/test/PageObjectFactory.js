/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./Opa','sap/ui/base/Object'],function($,O,U){"use strict";var p=U.extend("sap.ui.test.PageObjectFactory");p.create=function(P,d){var o={};for(var s in P){if(!P.hasOwnProperty(s)){continue;}var B=P[s].baseClass||d;var n=P[s].namespace||"sap.ui.test.opa.pageObject";var v=P[s].viewName||"";var m=P[s].actions;_(m,"actions",s,B,o,n,v);var e=P[s].assertions;_(e,"assertions",s,B,o,n,v);}return o;};function _(P,o,s,B,d,n,v){if(P){var C=a(n,s,o);var e=b(P,C,B,v);c(e,o,s,d);}}function a(n,P,o){var C=n+"."+P+"."+o;var d=$.sap.getObject(C,NaN);if(d){$.sap.log.error("Opa5 Page Object namespace clash: You have loaded multiple page objects with the same name. To prevent overriding themself, specify the namespace parameter.");}return C;}function b(P,C,B,v){var d=B.extend(C);for(var o in P){if(P.hasOwnProperty(o)){d.prototype[o]=P[o];}}var e=new d();if(v&&e.waitFor){var f=e.waitFor;e.waitFor=function(g){return f.call(this,$.extend(true,{viewName:v},g));};}return e;}function c(o,s,P,d){if(s==="actions"){O.config.arrangements[P]=o;O.config.actions[P]=o;}else if(s==="assertions"){O.config.assertions[P]=o;}d[P]=d[P]||{};d[P][s]=o;}return p;});