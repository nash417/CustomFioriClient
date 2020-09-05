/*!
  * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ChangeReason','./Context','./TreeBinding','sap/ui/model/SorterProcessor','sap/ui/model/FilterProcessor','sap/ui/model/FilterType'],function(q,C,a,T,S,F,b){"use strict";var c=T.extend("sap.ui.model.ClientTreeBinding",{constructor:function(m,p,o,A,P,s){T.apply(this,arguments);if(!this.oContext){this.oContext="";}this._mLengthsCache={};this.filterInfo={};this.filterInfo.aFilteredContexts=[];this.filterInfo.oParentContext={};if(A){this.oModel.checkFilterOperation(A);if(this.oModel._getObject(this.sPath,this.oContext)){this.filter(A,b.Application);}}}});c.prototype.getRootContexts=function(s,l){if(!s){s=0;}if(!l){l=this.oModel.iSizeLimit;}var r=this.oModel.resolve(this.sPath,this.oContext),t=this,d,o,e;if(!r){return[];}if(!this.oModel.isList(r)){o=this.oModel.getContext(r);if(this.bDisplayRootNode){d=[o];}else{d=this.getNodeContexts(o,s,l);}}else{d=[];e=this._sanitizePath(r);q.each(this.oModel._getObject(e),function(i,O){t._saveSubContext(O,d,e,i);});this._applySorter(d);this._setLengthCache(e,d.length);d=d.slice(s,s+l);}return d;};c.prototype.getNodeContexts=function(o,s,l){if(!s){s=0;}if(!l){l=this.oModel.iSizeLimit;}var d=this._sanitizePath(o.getPath());var e=[],t=this,n=this.oModel._getObject(d),A=this.mParameters&&this.mParameters.arrayNames,f;if(n){if(Array.isArray(A)){A.forEach(function(g){f=n[g];if(f){q.each(f,function(h,i){t._saveSubContext(i,e,d,g+"/"+h);});}});}else{q.sap.each(n,function(N,g){if(Array.isArray(g)){g.forEach(function(h,i){t._saveSubContext(h,e,d,N+"/"+i);});}else if(typeof g=="object"){t._saveSubContext(g,e,d,N);}});}}this._applySorter(e);this._setLengthCache(d,e.length);return e.slice(s,s+l);};c.prototype.hasChildren=function(o){if(o==undefined){return false;}return this.getChildCount(o)>0;};c.prototype.getChildCount=function(o){var p=o?o.sPath:this.getPath();if(this.oContext){p=this.oModel.resolve(p,this.oContext);}p=this._sanitizePath(p);if(this._mLengthsCache[p]===undefined){if(o){this.getNodeContexts(o);}else{this.getRootContexts();}}return this._mLengthsCache[p];};c.prototype._sanitizePath=function(s){if(!q.sap.endsWith(s,"/")){s=s+"/";}if(!q.sap.startsWith(s,"/")){s="/"+s;}return s;};c.prototype._saveSubContext=function(n,d,s,N){if(n&&typeof n=="object"){var o=this.oModel.getContext(s+N);if(this.aAllFilters&&!this.bIsFiltering){if(q.inArray(o,this.filterInfo.aFilteredContexts)!=-1){d.push(o);}}else{d.push(o);}}};c.prototype.filter=function(f,s){if(f&&!Array.isArray(f)){f=[f];}this.oModel.checkFilterOperation(f);if(s==b.Application){this.aApplicationFilters=f||[];}else if(s==b.Control){this.aFilters=f||[];}else{this.aFilters=f||[];this.aApplicationFilters=[];}f=this.aFilters.concat(this.aApplicationFilters);if(f.length==0){this.aAllFilters=null;}else{this.aAllFilters=f;this.applyFilter();}this._mLengthsCache={};this._fireChange({reason:"filter"});this._fireFilter({filters:f});return this;};c.prototype.applyFilter=function(){var r=this.oModel.resolve(this.sPath,this.oContext);this.filterInfo.aFilteredContexts=[];this.filterInfo.oParentContext={};if(!r){return;}var o=this.oModel.getContext(r);this._applyFilterRecursive(o);};c.prototype._applyFilterRecursive=function(p){var t=this,f=[];if(q.isEmptyObject(this.aAllFilters)){return;}this.bIsFiltering=true;var u=this.getNodeContexts(p,0,Number.MAX_VALUE);this.bIsFiltering=false;if(u.length>0){q.each(u,function(i,o){o._parentContext=p;t._applyFilterRecursive(o);});f=F.apply(u,this.aAllFilters,function(o,P){return t.oModel.getProperty(P,o);});if(f.length>0){q.merge(this.filterInfo.aFilteredContexts,f);this.filterInfo.aFilteredContexts.push(p);this.filterInfo.oParentContext=p;}if(q.inArray(this.filterInfo.oParentContext,u)!=-1){this.filterInfo.aFilteredContexts.push(p);this.filterInfo.oParentContext=p;}}};c.prototype.sort=function(s){s=s||[];this.aSorters=Array.isArray(s)?s:[s];this._fireChange({reason:C.Sort});return this;};c.prototype._applySorter=function(d){var t=this;S.apply(d,this.aSorters,function(o,p){return t.oModel.getProperty(p,o);},function(o){return o.getPath();});};c.prototype._setLengthCache=function(k,l){this._mLengthsCache[k]=l;};c.prototype.checkUpdate=function(f){this.applyFilter();this._mLengthsCache={};this._fireChange();};return c;});
