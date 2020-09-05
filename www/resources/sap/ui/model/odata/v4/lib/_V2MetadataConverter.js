/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./_Helper","./_MetadataConverter"],function(q,_,a){"use strict";var V,m="sap.ui.model.odata.v4.lib._V2MetadataConverter",e="http://schemas.microsoft.com/ado/2007/06/edmx",M="http://schemas.microsoft.com/ado/2007/08/dataservices/metadata",v={"creatable":{"property":"Insertable","term":"@Org.OData.Capabilities.V1.InsertRestrictions"},"deletable":{"property":"Deletable","term":"@Org.OData.Capabilities.V1.DeleteRestrictions"},"deletable-path":{"property":"Deletable","term":"@Org.OData.Capabilities.V1.DeleteRestrictions"},"field-control":{"term":"@com.sap.vocabularies.Common.v1.FieldControl"},"heading":{"term":"@com.sap.vocabularies.Common.v1.Heading"},"label":{"term":"@com.sap.vocabularies.Common.v1.Label"},"precision":{"term":"@Org.OData.Measures.V1.Scale"},"quickinfo":{"term":"@com.sap.vocabularies.Common.v1.QuickInfo"},"requires-filter":{"property":"RequiresFilter","term":"@Org.OData.Capabilities.V1.FilterRestrictions"},"searchable":{"property":"Searchable","term":"@Org.OData.Capabilities.V1.SearchRestrictions"},"text":{"term":"@com.sap.vocabularies.Common.v1.Text"},"updatable":{"property":"Updatable","term":"@Org.OData.Capabilities.V1.UpdateRestrictions"},"updatable-path":{"property":"Updatable","term":"@Org.OData.Capabilities.V1.UpdateRestrictions"}},b={"bday":{TermName:"Contact"},"city":{Path:"adr",TermName:"Contact",V4Attribute:"locality"},"country":{Path:"adr",TermName:"Contact"},"email":{Path:"address",TermName:"Contact",V4Attribute:"uri",typeMapping:{"home":"home","pref":"preferred","work":"work"},v4EnumType:"com.sap.vocabularies.Communication.v1.ContactInformationType",v4PropertyAnnotation:"@com.sap.vocabularies.Communication.v1.IsEmailAddress"},"familyname":{Path:"n",TermName:"Contact",V4Attribute:"surname"},"givenname":{Path:"n",TermName:"Contact",V4Attribute:"given"},"honorific":{Path:"n",TermName:"Contact",V4Attribute:"prefix"},"middlename":{Path:"n",TermName:"Contact",V4Attribute:"additional"},"name":{TermName:"Contact",V4Attribute:"fn"},"nickname":{TermName:"Contact"},"note":{TermName:"Contact"},"org":{TermName:"Contact"},"org-role":{TermName:"Contact",V4Attribute:"role"},"org-unit":{TermName:"Contact",V4Attribute:"orgunit"},"photo":{TermName:"Contact"},"pobox":{Path:"adr",TermName:"Contact"},"region":{Path:"adr",TermName:"Contact"},"street":{Path:"adr",TermName:"Contact"},"suffix":{Path:"n",TermName:"Contact"},"tel":{Path:"tel",TermName:"Contact",V4Attribute:"uri",typeMapping:{"cell":"cell","fax":"fax","home":"home","pref":"preferred","video":"video","voice":"voice","work":"work"},v4EnumType:"com.sap.vocabularies.Communication.v1.PhoneType",v4PropertyAnnotation:"@com.sap.vocabularies.Communication.v1.IsPhoneNumber"},"title":{TermName:"Contact"},"zip":{Path:"adr",TermName:"Contact",V4Attribute:"code"},"class":{TermName:"Event"},"dtend":{TermName:"Event"},"dtstart":{TermName:"Event"},"duration":{TermName:"Event"},"fbtype":{TermName:"Event"},"location":{TermName:"Event"},"status":{TermName:"Event"},"transp":{TermName:"Event"},"wholeday":{TermName:"Event"},"body":{TermName:"Message"},"from":{TermName:"Message"},"received":{TermName:"Message"},"sender":{TermName:"Message"},"subject":{TermName:"Message"},"completed":{TermName:"Task"},"due":{TermName:"Task"},"percent-complete":{TermName:"Task",V4Attribute:"percentcomplete"},"priority":{TermName:"Task"}},s="http://www.sap.com/Protocols/SAPData",A={"Reference":{"Include":{__processor:a.processAlias}},"DataServices":{"Schema":{__processor:a.processAlias}}},S={"NavigationProperty":{__processor:I},"Property":{__processor:K}},f={__include:[a.oReferenceInclude],"DataServices":{__processor:t,"Schema":{__postProcessor:p,__processor:a.processSchema,__include:[a.oAnnotationsConfig],"Association":{__processor:j,"End":{__processor:k},"ReferentialConstraint":{__processor:E,"Dependent":{__processor:u,"PropertyRef":{__processor:F}},"Principal":{__processor:D,"PropertyRef":{__processor:F}}}},"ComplexType":{__processor:r,__include:[S]},"EntityContainer":{__processor:w,"AssociationSet":{__processor:l,"End":{__processor:o}},"EntitySet":{__processor:x},"FunctionImport":{__processor:B,"Parameter":{__processor:C}}},"EntityType":{__processor:y,__include:[S],"Key":{"PropertyRef":{__processor:z}}}}}};function c(P,Q,R){var T=Q.annotatable.path,U=Q.convertedV2Annotations[T]||{},W,X=P.attributes,Y=Q.annotatable.parent.path,Z=Q.convertedV2Annotations[Y]||{},$,i,n=X.length;if(R==="EntityType"||R==="FunctionImport"){L(U,"label",P.getAttributeNS(s,"label"));}else{for(i=0;i<n;i++){W=X[i];if(W.namespaceURI!==s){continue;}if(R==="EntitySet"){d(P,W,U,Q);}else if(R==="Property"&&W.localName==="semantics"){$=W.value;if($==="unit-of-measure"||$==="currency-code"){Q.mProperty2Semantics[T]=$;}h(W,Z,U);}else if(R==="Property"){if(W.localName==="unit"){Q.mProperty2Unit[T]=W.value;}g(W,U);}}if(R==="EntitySet"&&P.getAttributeNS(s,"searchable")!=="true"){L(U,"searchable",false);}else if(R==="Property"){if(P.getAttributeNS(s,"updatable")==="false"){if(P.getAttributeNS(s,"creatable")==="false"){U["@Org.OData.Core.V1.Computed"]=true;}else{U["@Org.OData.Core.V1.Immutable"]=true;}}}}if(Object.keys(U).length>0){Q.convertedV2Annotations[T]=U;}if(Object.keys(Z).length>0){Q.convertedV2Annotations[Y]=Z;}}function d(i,n,P,Q){var R;switch(n.localName){case"creatable":case"deletable":case"updatable":if(n.value==="false"){L(P,n.localName,false);}break;case"deletable-path":case"updatable-path":R=n.localName.slice(0,9);if(i.getAttributeNS(s,R)){L(P,n.localName,false);q.sap.log.warning("Inconsistent metadata in '"+Q.url+"'","Use either 'sap:"+R+"' or 'sap:"+R+"-path'"+" at entity set '"+Q.annotatable.path+"'",m);}else{L(P,n.localName,{$Path:n.value});}break;case"label":P["@com.sap.vocabularies.Common.v1.Label"]=n.value;break;case"pageable":if(n.value==="false"){P["@Org.OData.Capabilities.V1.SkipSupported"]=false;P["@Org.OData.Capabilities.V1.TopSupported"]=false;}break;case"requires-filter":if(n.value==="true"){L(P,n.localName,true);}break;case"topable":if(n.value==="false"){P["@Org.OData.Capabilities.V1.TopSupported"]=false;}break;default:}}function g(i,n){switch(i.localName){case"heading":case"label":case"quickinfo":L(n,i.localName,i.value);break;case"field-control":case"precision":case"text":L(n,i.localName,{$Path:i.value});break;case"aggregation-role":if(i.value==="dimension"){n["@com.sap.vocabularies.Analytics.v1.Dimension"]=true;}else if(i.value==="measure"){n["@com.sap.vocabularies.Analytics.v1.Measure"]=true;}break;case"display-format":if(i.value==="NonNegative"){n["@com.sap.vocabularies.Common.v1.IsDigitSequence"]=true;}else if(i.value==="UpperCase"){n["@com.sap.vocabularies.Common.v1.IsUpperCase"]=true;}break;case"visible":if(i.value==="false"){n["@com.sap.vocabularies.UI.v1.Hidden"]=true;n["@com.sap.vocabularies.Common.v1.FieldControl"]={$EnumMember:"com.sap.vocabularies.Common.v1.FieldControlType/Hidden"};}break;default:}}function h(i,T,P){var n,Q,R,U,W,X=i.value.split(";"),Y=X[0],Z;if(Y==="url"){P["@Org.OData.Core.V1.IsURL"]=true;return;}Z=b[Y];if(Z){R={"$Path":i.ownerElement.getAttribute("Name")};n=V.getOrCreateObject(T,"@com.sap.vocabularies.Communication.v1."+Z.TermName);if(Z.Path){W=V.getOrCreateObject(n,Z.Path);W[Z.V4Attribute||Y]=R;if(Z.v4PropertyAnnotation){P[Z.v4PropertyAnnotation]=true;if(X[1]){U=[];Q=X[1].split("=")[1];Q.split(",").forEach(function($){var a1=Z.typeMapping[$];if(a1){U.push(Z.v4EnumType+"/"+a1);}else{q.sap.log.warning("Unsupported semantic type: "+$,undefined,m);}});if(U.length>0){W.type={"EnumMember":U.join(" ")};}}n[Z.Path]=[W];}else{n[Z.Path]=W;}}else{n[Z.V4Attribute||Y]=R;}}}function p(i,R,n){var P,Q,T,U,W,X;for(T in n.mEntityContainersOfSchema){Q=n.mEntityContainersOfSchema[T];for(W in Q){U=Q[W];if(U.$kind!=="EntitySet"){continue;}X=T+"/"+W;P=q.extend(true,n.convertedV2Annotations[X]||{},n.mEntityType2EntitySetAnnotation[U.$Type]);if(Object.keys(P).length){n.convertedV2Annotations[X]=P;}}}if(n.schema.$Annotations){V.mergeAnnotations(n.convertedV2Annotations,n.schema.$Annotations);}else if(Object.keys(n.convertedV2Annotations).length>0){n.schema.$Annotations=n.convertedV2Annotations;}n.convertedV2Annotations={};n.mEntityContainersOfSchema={};}function j(i,n){var P=n.namespace+i.getAttribute("Name");n.associations[P]=n.association={referentialConstraint:null,roles:{}};}function k(i,n){var P=i.getAttribute("Role");n.association.roles[P]={multiplicity:i.getAttribute("Multiplicity"),propertyName:undefined,typeName:V.resolveAlias(i.getAttribute("Type"),n)};}function l(i,n){var P={associationName:V.resolveAlias(i.getAttribute("Association"),n),ends:[]};n.associationSet=P;n.associationSets.push(P);}function o(i,n){n.associationSet.ends.push({entitySetName:i.getAttribute("EntitySet"),roleName:i.getAttribute("Role")});}function r(i,n){G(i,n,{"$kind":"ComplexType"});}function t(i,n){if(i.getAttributeNS(M,"DataServiceVersion")!=="2.0"){throw new Error(n.url+" is not a valid OData V2 metadata document");}}function u(i,n){var P=n.association.referentialConstraint;n.constraintRole=P.dependent={roleName:i.getAttribute("Role")};}function w(i,n){var Q=n.namespace+i.getAttribute("Name");n.mEntityContainersOfSchema[Q]=n.result[Q]=n.entityContainer={"$kind":"EntityContainer"};if(i.getAttributeNS(M,"IsDefaultEntityContainer")==="true"){n.defaultEntityContainer=Q;}V.annotatable(n,Q);}function x(i,n){var P=i.getAttribute("Name");n.entityContainer[P]=n.entitySet={$kind:"EntitySet",$Type:V.resolveAlias(i.getAttribute("EntityType"),n)};V.annotatable(n,P);c(i,n,"EntitySet");}function y(i,n){var T={$kind:"EntityType"};G(i,n,T);V.processAttributes(i,T,{"Abstract":V.setIfTrue,"BaseType":function(P){return P?V.resolveAlias(P,n):undefined;}});c(i,n,"EntityType");}function z(i,n){var P=i.getAttribute("Name");V.getOrCreateArray(n.type,"$Key").push(P);}function B(i,n){var P=i.getAttributeNS(M,"HttpMethod"),Q=P==="POST"?"Action":"Function",R={$kind:Q},T=i.getAttribute("Name"),U=n.namespace+T,W={$kind:Q+"Import"},X=i.getAttribute("ReturnType"),Y;W["$"+Q]=U;V.processAttributes(i,W,{"EntitySet":V.setValue});if(X){R.$ReturnType=Y={};H(X,Y,n,i);}if(i.getAttributeNS(s,"action-for")){q.sap.log.warning("Unsupported 'sap:action-for' at FunctionImport '"+T+"', removing this FunctionImport",undefined,m);}else{n.entityContainer[T]=W;n.result[U]=[R];}n.function=R;V.annotatable(n,T);c(i,n,"FunctionImport");}function C(i,n){var P=n.function,Q,R={$Name:i.getAttribute("Name")};V.processFacetAttributes(i,R);H(i.getAttribute("Type"),R,n,i);V.getOrCreateArray(P,"$Parameter").push(R);V.annotatable(n,R);Q=i.getAttributeNS(s,"label");if(Q){R[v["label"].term]=Q;}}function D(i,n){var P=n.association.referentialConstraint;n.constraintRole=P.principal={roleName:i.getAttribute("Role")};}function E(i,n){n.association.referentialConstraint={};}function F(i,n){n.constraintRole.propertyRef=i.getAttribute("Name");}function G(i,n,T){var Q=n.namespace+i.getAttribute("Name");n.sTypeName=Q;n.result[Q]=n.type=T;V.annotatable(n,Q);}function H(T,P,i,n){var Q=V.rCollection.exec(T);if(Q){P.$isCollection=true;T=Q[1];}if(T.indexOf(".")<0){T="Edm."+T;}switch(T){case"Edm.DateTime":P.$v2Type=T;if(n.getAttributeNS(s,"display-format")==="Date"){T="Edm.Date";delete P.$Precision;}else{T="Edm.DateTimeOffset";}break;case"Edm.Float":P.$v2Type=T;T="Edm.Single";break;case"Edm.Time":P.$v2Type=T;T="Edm.TimeOfDay";break;default:T=V.resolveAlias(T,i);}P.$Type=T;}function I(i,n){var P=i.getAttributeNS(s,"creatable"),Q=i.getAttributeNS(s,"creatable-path"),R,T=i.getAttribute("Name"),U,W={$kind:"NavigationProperty"};n.type[T]=W;n.navigationProperties.push({associationName:V.resolveAlias(i.getAttribute("Relationship"),n),fromRoleName:i.getAttribute("FromRole"),property:W,propertyName:T,toRoleName:i.getAttribute("ToRole")});V.annotatable(n,T);if(P){U={"$NavigationPropertyPath":T};if(Q){q.sap.log.warning("Inconsistent metadata in '"+n.url+"'","Use either 'sap:creatable' or 'sap:creatable-path' at navigation property '"+n.annotatable.path+"'",m);}else if(P==="true"){U=null;}}else if(Q){U={"$If":[{"$Not":{"$Path":Q}},{"$NavigationPropertyPath":T}]};}if(U){R=V.getOrCreateObject(n.mEntityType2EntitySetAnnotation,n.sTypeName);R=V.getOrCreateObject(R,"@Org.OData.Capabilities.V1.InsertRestrictions");R=V.getOrCreateArray(R,"NonInsertableNavigationProperties");R.push(U);}}function J(P){Object.keys(P.mProperty2Unit).forEach(function(Q){var R,T,U=Q.split("/")[0],W,X=P.mProperty2Unit[Q],Y=X.split("/"),Z,$,i,n=Y.length;for(i=0;i<n;i++){T=P.result[U];Z=T[Y[i]];if(!Z){q.sap.log.warning("Path '"+X+"' for sap:unit cannot be resolved",Q,m);return;}if(i<n-1){U=Z.$Type;}}$=P.mProperty2Semantics[U+"/"+Y[n-1]];if(!$){q.sap.log.warning("Unsupported sap:semantics at sap:unit='"+X+"'; expected 'currency-code' or 'unit-of-measure'",Q,m);return;}W=$==="currency-code"?"ISOCurrency":"Unit";W="@Org.OData.Measures.V1."+W;R=V.getOrCreateObject(P.result[_.namespace(Q)+"."],"$Annotations");R=V.getOrCreateObject(R,Q);if(!(W in R)){R[W]={"$Path":X};}});}function K(i,n){var P,Q=i.getAttributeNS(s,"filterable"),R=i.getAttributeNS(s,"filter-restriction"),T,U=i.getAttribute("Name"),W={"$kind":"Property"},X=i.getAttributeNS(s,"required-in-filter"),Y=i.getAttributeNS(s,"sortable");function Z($,a1,b1){if(n.type.$kind==="EntityType"){T=V.getOrCreateObject(n.mEntityType2EntitySetAnnotation,n.sTypeName);T=V.getOrCreateObject(T,$);T=V.getOrCreateArray(T,a1);T.push({"$PropertyPath":U});}else{q.sap.log.warning("Unsupported SAP annotation at a complex type in '"+n.url+"'","sap:"+b1+" at property '"+n.annotatable.path+"'",m);}}n.type[U]=W;V.processFacetAttributes(i,W);H(i.getAttribute("Type"),W,n,i);V.annotatable(n,U);c(i,n,"Property");if(Q==="false"){Z("@Org.OData.Capabilities.V1.FilterRestrictions","NonFilterableProperties","filterable");}if(R){switch(R){case"interval":P="SingleInterval";break;case"multi-value":P="MultiValue";break;case"single-value":P="SingleValue";break;default:q.sap.log.warning("Inconsistent metadata in '"+n.url+"'","Unsupported sap:filter-restriction=\""+R+"\" at property '"+n.annotatable.path+"'",m);}if(P){if(n.type.$kind==="EntityType"){T=V.getOrCreateObject(n.mEntityType2EntitySetAnnotation,n.sTypeName);T=V.getOrCreateArray(T,"@com.sap.vocabularies.Common.v1.FilterExpressionRestrictions");T.push({"AllowedExpressions":{"EnumMember":"com.sap.vocabularies.Common.v1.FilterExpressionType/"+P},"Property":{"$PropertyPath":U}});}else{q.sap.log.warning("Unsupported SAP annotation at a complex type in '"+n.url+"'","sap:filter-restriction at property '"+n.annotatable.path+"'",m);}}}if(X==="true"){Z("@Org.OData.Capabilities.V1.FilterRestrictions","RequiredProperties","required-in-filter");}if(Y==="false"){Z("@Org.OData.Capabilities.V1.SortRestrictions","NonSortableProperties","sortable");}}function L(i,n,P){var Q=v[n],R;if(P===null||P===""){return;}if(Q.property){R=i[Q.term]||{};R[Q.property]=P;}else{R=P;}i[Q.term]=R;}function N(i){var n=i.defaultEntityContainer,P;if(n){i.result.$EntityContainer=n;}else{P=Object.keys(i.result).filter(function(Q){return i.result[Q].$kind==="EntityContainer";});if(P.length===1){i.result.$EntityContainer=P[0];}}}function O(i){i.navigationProperties.forEach(function(n){var P=i.associations[n.associationName],Q=P.referentialConstraint,R=n.property,T=P.roles[n.toRoleName];R.$Type=T.typeName;T.propertyName=n.propertyName;if(T.multiplicity==="1"){R.$Nullable=false;}if(T.multiplicity==="*"){R.$isCollection=true;}if(Q&&Q.principal.roleName===n.toRoleName){R.$ReferentialConstraint={};R.$ReferentialConstraint[Q.dependent.propertyRef]=Q.principal.propertyRef;}});i.associationSets.forEach(function(n){var P=i.associations[n.associationName],Q=i.entityContainer;function R(T,U){var W=Q[T.entitySetName],X=P.roles[U.roleName];if(X.propertyName){W.$NavigationPropertyBinding=W.$NavigationPropertyBinding||{};W.$NavigationPropertyBinding[X.propertyName]=U.entitySetName;}}R(n.ends[0],n.ends[1]);R(n.ends[1],n.ends[0]);});}V=q.extend({},a,{convertXMLMetadata:function(i,U){var n,P;q.sap.measure.average("convertXMLMetadata","",m);P=i.documentElement;if(P.localName!=="Edmx"||P.namespaceURI!==e){throw new Error(U+" is not a valid OData V2 metadata document");}n={"aliases":{},"annotatable":null,"association":null,"associations":{},"associationSet":null,"associationSets":[],"constraintRole":null,"convertedV2Annotations":{},"defaultEntityContainer":null,"entityContainer":null,mEntityContainersOfSchema:{},"entitySet":null,mEntityType2EntitySetAnnotation:{},"function":null,"namespace":null,mProperty2Semantics:{},"navigationProperties":[],"processFacetAttributes":V.processFacetAttributes,"processTypedCollection":H,"schema":null,"type":null,sTypeName:null,mProperty2Unit:{},"result":{"$Version":"4.0"},"url":U};V.traverse(P,n,A);V.traverse(P,n,f);N(n);O(n);J(n);q.sap.measure.end("convertXMLMetadata");return n.result;},mergeAnnotations:function(i,n){var P;for(P in i){if(P in n){n[P]=q.extend(i[P],n[P]);}else{n[P]=i[P];}}},processFacetAttributes:function(i,R){V.processAttributes(i,R,{"DefaultValue":V.setValue,"MaxLength":function(n){return n==="Max"?undefined:V.setNumber(n);},"Nullable":V.setIfFalse,"Precision":V.setNumber,"Scale":V.setNumber,"Unicode":V.setIfFalse});if(i.getAttribute("FixedLength")==="false"){R.$Scale="variable";}}});return V;},false);