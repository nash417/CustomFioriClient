/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["./base/BaseAdapter"],function(B){"use strict";function s(S){var p=S.indexOf("(");return p>=0?S.slice(0,p):S;}var O=B.extend("sap.ui.mdc.experimental.provider.adapter.ODataBaseAdapter",{_schemaCache:{},aExpand:[],constructor:function(m,M,a,c){B.prototype.constructor.apply(this,arguments);}});O.prototype.afterMetaContextSwitch=function(c,p){if(!this._schemaCache[c]){this._schemaCache[c]=this.oMetaModel.getProperty(c);this.schema=this._schemaCache[c];this._precalucateFieldControl();}else{this.schema=this._schemaCache[c];}this.oEntitySet=this.calculateEntitySet(p);};O.prototype.calculateEntitySet=function(p){var a,n,e,q,E,P=p.split("/");if(P[0]!==""){return null;}P.shift();E=this.oMetaModel.getODataEntitySet(s(P[0]));if(!E){return null;}P.shift();while(P.length){q=E.entityType;e=this.oMetaModel.getODataEntityType(q);n=s(P[0]);a=this.oMetaModel.getODataAssociationEnd(e,n);if(a){E=this.oMetaModel.getODataEntitySet(a.entitySet);}else{return null;}}return E;};O.prototype.resolveNavi=function(n,T){var p=n.split("/"),N=this.oEntitySet,a;while(p.length>1){a=this.oMetaModel.getODataAssociationSetEnd(this.schema,p[0]);N=this.oMetaModel.getODataEntitySet(a.entitySet);if(this.aExpand.indexOf(p[0])==-1){this.aExpand.push(p[0]);}p.shift(-1);}var b="/"+N.name+"/"+p[0];var m=this.oMetaModel.getMetaContext(b);var M=m.getPath();var o=new T(this.oModel,this.sModelName,this.sContextName,M,true);o.oEntitySet=N;return o;};O.prototype.enabled=function(){var u=this.getAnnotation("Org.OData.Core.V1.Immutable/Bool")||this.getAnnotation("Org.OData.Core.V1.Computed/Bool");var e=u?u=="false":true;if(e&&this.schema._fieldControl){e=this.schema._fieldControl.editable;this.setValue("!enabled",this.schema._fieldControl.readonly);}else{this.setValue("!enabled",!e);}return e;};O.prototype.tooltip=function(){return this.getAnnotation("com.sap.vocabularies.Common.v1.QuickInfo/String");};O.prototype.label=function(){return this["//"]["com.sap.vocabularies.Common.v1.Label"]["String"];};O.prototype.navigationProperties=function(){var i,n,N=this.getAnnotation("navigationProperty"),a=[];for(i=0;i<N.length;i++){n=N[i];a[n.name]=n;}return a;};O.prototype.expand=function(){return this.aExpand;};O.prototype["//"]=function(){return this.schema;};O.prototype.getAnnotation=function(a,A){A=A||this.schema;var p=a.split("/");var i=0;while(A&&p[i]){A=A[p[i]];i++;}return A;};O.prototype._isAnnotationBoolean=function(a){var A=this.getAnnotation(a);var i=false;if(A!=null){i=A.Bool?(A.Bool=="true"):true;}return i;};O.prototype._precalucateFieldControl=function(){var f=this["//"]["com.sap.vocabularies.Common.v1.FieldControl"];if(f){var a={};this._schemaCache[this.sMetaContext]._fieldControl=a;if(f.EnumMember){switch(f.EnumMember){case"com.sap.vocabularies.Common.v1.FieldControlType/Hidden":a.visible=false;a.hidden=true;a.editable=false;a.readonly=true;a.required=false;break;case"com.sap.vocabularies.Common.v1.FieldControlType/Mandatory":a.visible=true;a.hidden=false;a.editable=true;a.readonly=false;a.required=true;break;case"com.sap.vocabularies.Common.v1.FieldControlType/ReadOnly":a.visible=true;a.hidden=false;a.editable=false;a.readonly=true;a.required=false;break;default:a.visible=true;a.hidden=false;a.editable=true;a.readonly=true;a.required=false;break;}}else{var p=f.Path;if(this.getModelName()){p=this.getModelName()+">"+p;}a.visible="{= ${"+p+"} !== 0}";a.hidden="{= ${"+p+"} === 0}";a.editable="{= ${"+p+"} !== 1}";a.readonly="{= ${"+p+"} === 1}";a.required="{= ${"+p+"} === 7}";}}};O.prototype._enrichFromEntitySet=function(f,e){var i,F=this._getAnnotation("Org.OData.Capabilities.V1.FilterRestrictions",e);f.filterable=true;f.requiredInFilter=false;if(F){for(i=0;i<F.NonFilterableProperties;i++){if(f.name===F.NonFilterableProperties.PropertyPath){f.filterable=false;}}}};O.prototype.metadataContextOfField=function(f){var i=Object.keys(this.fields).indexOf(f.name);if(i>-1){return this.sMetaContext+"/property/"+i;}else{return"";}};return O;});