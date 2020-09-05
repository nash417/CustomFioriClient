/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/DataType','sap/ui/base/ManagedObject','sap/ui/core/CustomData','./mvc/View','./ExtensionPoint','./StashedControlSupport','sap/ui/model/odata/v4/lib/_SyncPromise'],function(q,D,M,C,V,E,S,a){"use strict";function p(t,v,n,c){var B=M.bindingParser(v,c,true);if(B&&typeof B==="object"){return B;}var d=v=B||v;var T=D.getType(t);if(T){if(T instanceof D){d=T.parseValue(v);}}else{throw new Error("Property "+n+" has unknown type "+t);}return typeof d==="string"?M.bindingParser.escape(d):d;}function l(x){return x.localName||x.baseName||x.nodeName;}function u(c){if(c.isRejected()){throw c.getResult();}return c.getResult();}var X={};X.loadTemplate=function(t,e){var r=q.sap.getResourceName(t,"."+(e||"view")+".xml");return q.sap.loadResource(r).documentElement;};X.loadTemplatePromise=function(t,e){var r=q.sap.getResourceName(t,"."+(e||"view")+".xml");return q.sap.loadResource(r,{async:true}).then(function(R){return R.documentElement;});};X.parseViewAttributes=function(x,v,s){var A=v.getMetadata().getAllProperties();for(var i=0;i<x.attributes.length;i++){var c=x.attributes[i];if(c.name==='controllerName'){v._controllerName=c.value;}else if(c.name==='resourceBundleName'){v._resourceBundleName=c.value;}else if(c.name==='resourceBundleUrl'){v._resourceBundleUrl=c.value;}else if(c.name==='resourceBundleLocale'){v._resourceBundleLocale=c.value;}else if(c.name==='resourceBundleAlias'){v._resourceBundleAlias=c.value;}else if(c.name==='class'){v.addStyleClass(c.value);}else if(!s[c.name]&&A[c.name]){s[c.name]=p(A[c.name].type,c.value,c.name,v._oContainingView.oController);}}};X.enrichTemplateIds=function(x,v){X.enrichTemplateIdsPromise(x,v,false);return x;};X.enrichTemplateIdsPromise=function(x,v,A){return b(x,v,true,A).then(function(){return x;});};X.parseTemplate=function(x,v){return u(X.parseTemplatePromise(x,v,false));};X.parseTemplatePromise=function(x,v,A,P){return b(x,v,false,A,P);};function b(x,v,c,A,P){var r=[],d=a.resolve();A=A&&sap.ui.getCore().getConfiguration().getXMLProcessingMode()==="sequential";q.sap.log.debug("XML processing mode is "+(A?"sequential":"default"),"","XMLTemplateProcessor");var f=sap.ui.getCore().getConfiguration().getDesignMode();if(f){v._sapui_declarativeSourceInfo={xmlNode:x,xmlRootNode:v._oContainingView===v?x:v._oContainingView._sapui_declarativeSourceInfo.xmlRootNode};}var s=v.sViewName||v._sFragmentName;if(!s){var t=v;var L=0;while(++L<1000&&t&&t!==t._oContainingView){t=t._oContainingView;}s=t.sViewName;}if(v.isSubView()){n(x,true);}else{if(x.localName==="View"&&x.namespaceURI!=="sap.ui.core.mvc"){q.sap.log.warning("XMLView root node must have the 'sap.ui.core.mvc' namespace, not '"+x.namespaceURI+"'"+(s?" (View name: "+s+")":""));}o(x);}var i=0;function g(){for(;i<r.length;i++){var e=r[i];if(e&&typeof e.then==='function'){return e.then(h).then(g);}}return r;}function h(e){var j=[i,1].concat(e);Array.prototype.splice.apply(r,j);}return d.then(g);function k(I){return I;}function m(I){return v._oContainingView.createId(I);}function n(x,R,I){if(x.nodeType===1){var e=l(x);if(x.namespaceURI==="http://www.w3.org/1999/xhtml"||x.namespaceURI==="http://www.w3.org/2000/svg"){r.push("<"+e+" ");var H=false;for(var i=0;i<x.attributes.length;i++){var j=x.attributes[i];var J=j.value;if(j.name==="id"){H=true;J=F(v,x);}r.push(j.name+"=\""+q.sap.encodeHTML(J)+"\" ");}if(R===true){r.push("data-sap-ui-preserve"+"=\""+v.getId()+"\" ");if(!H){r.push("id"+"=\""+v.getId()+"\" ");}}r.push(">");var K=x;if(window.HTMLTemplateElement&&x instanceof HTMLTemplateElement&&x.content instanceof DocumentFragment){K=x.content;}o(K);r.push("</"+e+">");}else if(e==="FragmentDefinition"&&x.namespaceURI==="sap.ui.core"){o(x,false,true);}else{d=d.then(function(){return z(x).then(function(Q){for(var i=0;i<Q.length;i++){var T=Q[i];if(v.getMetadata().hasAggregation("content")){v.addAggregation("content",T);}else if(v.getMetadata().hasAssociation(("content"))){v.addAssociation("content",T);}}return Q;});});r.push(d);}}else if(x.nodeType===3&&!I){var N=x.textContent||x.text,O=l(x.parentNode);if(N){if(O!="style"){N=q.sap.encodeHTML(N);}r.push(N);}}}function o(x,R,I){var e=x.childNodes;for(var i=0;i<e.length;i++){n(e[i],R,I);}}function w(N,e){var j;var H=sap.ui.getCore().getLoadedLibraries();q.each(H,function(K,O){if(N===O.namespace||N===O.name){j=O.name+"."+((O.tagNames&&O.tagNames[e])||e);}});j=j||N+"."+e;function I(J){if(!J){q.sap.log.error("Control '"+j+"' did not return a class definition from sap.ui.define.","","XMLTemplateProcessor");J=q.sap.getObject(j);}if(!J){q.sap.log.error("Can't find object class '"+j+"' for XML-view","","XMLTemplateProcessor");}return J;}var R=q.sap.getResourceName(j,"");if(A){return new Promise(function(K){sap.ui.require([R],function(J){J=I(J);K(J);});});}else{var J=sap.ui.requireSync(R);J=I(J);return a.resolve(J);}}function y(e){if(e.namespaceURI==="http://www.w3.org/1999/xhtml"||e.namespaceURI==="http://www.w3.org/2000/svg"){var j=e.attributes['id']?e.attributes['id'].textContent||e.attributes['id'].text:null;if(c){return X.enrichTemplateIdsPromise(e,v,A).then(function(){return[];});}else{var H=function(J){var K={id:j?F(v,e,j):undefined,xmlNode:e,containingView:v._oContainingView};if(v.fnScopedRunWithOwner){return v.fnScopedRunWithOwner(function(){return new J(K);});}return new J(K);};if(A){return new Promise(function(J,K){sap.ui.require(["sap/ui/core/mvc/XMLView"],function(I){J([H(I)]);});});}else{var I=sap.ui.requireSync("sap/ui/core/mvc/XMLView");return a.resolve([H(I)]);}}}else{return z(e);}}function z(e){if(l(e)==="ExtensionPoint"&&e.namespaceURI==="sap.ui.core"){if(c){return a.resolve([]);}else{return a.resolve(E(v,e.getAttribute("name"),function(){var j=a.resolve();var H=[];var I=e.childNodes;for(var i=0;i<I.length;i++){var J=I[i];if(J.nodeType===1){j=j.then(y.bind(null,J));H.push(j);}}return a.all(H).then(function(K){var N=[];K.forEach(function(O){N=N.concat(O);});return N;});}));}}else{return B(e);}}function B(H){var I=H.namespaceURI,J=w(I,l(H)),K={},N="",O=[],Q=null,R=null;return J.then(function(T){if(!T){return[];}var U=T.getMetadata();var W=U.getAllSettings();if(!c){for(var i=0;i<H.attributes.length;i++){var Y=H.attributes[i],Z=Y.name,$=W[Z],_=Y.value;if(Z==="id"){K[Z]=F(v,H,_);}else if(Z==="class"){N+=_;}else if(Z==="viewName"){K[Z]=_;}else if(Z==="fragmentName"){K[Z]=_;K['containingView']=v._oContainingView;}else if((Z==="binding"&&!$)||Z==='objectBindings'){var a1=M.bindingParser(_,v._oContainingView.oController);if(a1){K.objectBindings=K.objectBindings||{};K.objectBindings[a1.model||undefined]=a1;}}else if(Z==='metadataContexts'){var b1=null;try{b1=X._calculatedModelMapping(_,v._oContainingView.oController,true);}catch(e){q.sap.log.error(v+":"+e.message);}if(b1){K.metadataContexts=b1;if(X._preprocessMetadataContexts){X._preprocessMetadataContexts(T.getMetadata().getName(),K,v._oContainingView.oController);}}}else if(Z.indexOf(":")>-1){if(Y.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1"){var c1=l(Y);O.push(new C({key:c1,value:p("any",_,c1,v._oContainingView.oController)}));}else if(Y.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1"){R=_;}else if(Z.indexOf("xmlns:")!==0){if(!Q){Q={};}if(!Q.hasOwnProperty(Y.namespaceURI)){Q[Y.namespaceURI]={};}Q[Y.namespaceURI][l(Y)]=Y.nodeValue;q.sap.log.debug(v+": XMLView parser encountered unknown attribute '"+Z+"' (value: '"+_+"') with unknown namespace, stored as sap-ui-custom-settings of customData");}}else if($&&$._iKind===0){K[Z]=p($.type,_,Z,v._oContainingView.oController);}else if($&&$._iKind===1&&$.altTypes){K[Z]=p($.altTypes[0],_,Z,v._oContainingView.oController);}else if($&&$._iKind===2){var a1=M.bindingParser(_,v._oContainingView.oController);if(a1){K[Z]=a1;}else{q.sap.log.error(v+": aggregations with cardinality 0..n only allow binding paths as attribute value (wrong value: "+Z+"='"+_+"')");}}else if($&&$._iKind===3){K[Z]=m(_);}else if($&&$._iKind===4){K[Z]=_.split(/[\s,]+/g).filter(k).map(m);}else if($&&$._iKind===5){var d1=V._resolveEventHandler(_,v._oContainingView.oController);if(d1){K[Z]=d1;}else{q.sap.log.warning(v+": event handler function \""+_+"\" is not a function or does not exist in the controller.");}}else if($&&$._iKind===-1){if(V.prototype.isPrototypeOf(T.prototype)&&Z=="async"){K[Z]=p($.type,_,Z,v._oContainingView.oController);}else{q.sap.log.warning(v+": setting '"+Z+"' for class "+U.getName()+" (value:'"+_+"') is not supported");}}else{if(X._supportInfo){X._supportInfo({context:H,env:{caller:"createRegularControls",error:true,info:"unknown setting '"+Z+"' for class "+U.getName()}});}}}if(Q){O.push(new C({key:"sap-ui-custom-settings",value:Q}));}if(O.length>0){K.customData=O;}}function e1(H,g1,h1){var j,i1=a.resolve(),j1=[];for(j=H.firstChild;j;j=j.nextSibling){i1=i1.then(f1.bind(this,H,g1,h1,j));j1.push(i1);}return a.all(j1);}function f1(H,g1,h1,i1,j1){var k1;if(i1.nodeType===1){if(i1.namespaceURI==="http://schemas.sap.com/sapui5/extension/sap.ui.core.xmlcomposite/1"){K[l(i1)]=i1.querySelector("*");return;}k1=i1.namespaceURI===I&&h1&&h1[l(i1)];if(k1){return e1(i1,k1);}else if(g1){if(!j1&&i1.getAttribute("stashed")==="true"&&!c){S.createStashedControl(F(v,i1),{sParentId:K["id"],sParentAggregationName:g1.name,fnCreate:function(){var j=A;A=false;try{return u(f1(H,g1,h1,i1,true));}finally{A=j;}}});return;}return y(i1).then(function(l1){for(var j=0;j<l1.length;j++){var m1=l1[j];var n1=g1.name;if(g1.multiple){if(!K[n1]){K[n1]=[];}if(typeof K[n1].path==="string"){K[n1].template=m1;}else{K[n1].push(m1);}}else{K[n1]=m1;}}return l1;});}else if(l(H)!=="FragmentDefinition"||H.namespaceURI!=="sap.ui.core"){throw new Error("Cannot add direct child without default aggregation defined for control "+U.getElementName());}}else if(i1.nodeType===3){if(q.trim(i1.textContent||i1.text)){throw new Error("Cannot add text nodes as direct child of an aggregation. For adding text to an aggregation, a surrounding html tag is needed: "+q.trim(i1.textContent||i1.text));}}}var g1=U.getDefaultAggregation();var h1=U.getAllAggregations();return e1(H,g1,h1).then(function(){var j;if(c&&H.hasAttribute("id")){G(v,H);}else if(!c){if(V.prototype.isPrototypeOf(T.prototype)&&typeof T._sType==="string"){var i1=function(){return sap.ui.view(K,undefined,T._sType);};if(v.fnScopedRunWithOwner){j=v.fnScopedRunWithOwner(i1);}else{j=i1();}}else{var j1=function(){if(v.fnScopedRunWithOwner){return v.fnScopedRunWithOwner(function(){return new T(K);});}else{return new T(K);}};if(P&&P.fnRunWithPreprocessor){j=P.fnRunWithPreprocessor(j1);}else{j=j1();}}if(N&&j.addStyleClass){j.addStyleClass(N);}}if(!j){j=[];}else if(!Array.isArray(j)){j=[j];}if(X._supportInfo&&j){for(var i=0,k1=j.length;i<k1;i++){var l1=j[i];if(l1&&l1.getId()){var m1=X._supportInfo({context:H,env:{caller:"createRegularControls",nodeid:H.getAttribute("id"),controlid:l1.getId()}}),n1=R?R+",":"";n1+=m1;X._supportInfo.addSupportInfo(l1.getId(),n1);}}}if(f){j.forEach(function(l1){if(U.getCompositeAggregationName){var o1=H.getElementsByTagName(l1.getMetadata().getCompositeAggregationName());for(var i=0;i<o1.length;i++){H.removeChild(o1[0]);}}l1._sapui_declarativeSourceInfo={xmlNode:H,xmlRootNode:v._sapui_declarativeSourceInfo.xmlRootNode,fragmentName:U.getName()==='sap.ui.core.Fragment'?K['fragmentName']:null};});}return j;});});}function F(v,x,I){if(x.getAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id")){return x.getAttribute("id");}else{return m(I?I:x.getAttribute("id"));}}function G(v,x){x.setAttribute("id",m(x.getAttribute("id")));x.setAttributeNS("http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1","id",true);}}X._preprocessMetadataContexts=null;X._calculatedModelMapping=function(B,c,A){var o,m={},d=M.bindingParser(B,c);function e(f){if(f.length%2===0){throw new Error("The last entry is no binding");}for(var i=1;i<=f.length;i=i+2){if(typeof f[i-1]=='string'){throw new Error("Binding expected not a string");}if(f[i]){if((typeof f[i]!='string')||(f[i]!=",")){throw new Error("Missing delimiter ','");}}}}if(d){if(!d.formatter){o=d;d={parts:[o]};}else{e(d.formatter.textFragments);}for(var i=0;i<d.parts.length;i++){o=d.parts[i];m[o.model]=m[o.model]||(A?[]:null);if(Array.isArray(m[o.model])){m[o.model].push(o);}else{m[o.model]=o;}}}return m;};return X;},true);
