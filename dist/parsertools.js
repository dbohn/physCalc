(function(){var r,n,e,a,t,o,i,s,u,c,l,f,p,h,b,d,m,k,M,y,v,w,g,E;r=require("./physik"),E={},a=function(r,n){return r=c(r),n=c(n),r.add(n)},w=function(r,n){return r=c(r),n=c(n),r.sub(n)},m=function(r,n){return r=c(r),n=c(n),r.mult(n)},b=function(r,n){return r=c(r),n=c(n),r.div(n)},k=function(n,e){if(e instanceof r.ErrorInterval&&0!==e.radius)throw"Exponent must not have error";return e=e instanceof r.ErrorInterval?e.median:e,n=c(n),n.pow(e)},d=function(n){return n instanceof r.ErrorInterval?n.endResult():n},l=function(n,e){return new r.ErrorInterval(n,e)},h=function(n,e,a){return new r.ErrorInterval(n,e,a)},p=function(n,e,a){return arguments.length>=4?r.createFromDigitalMeasurement(c(n),Math.abs(e),Math.abs(a),arguments[3]):r.createFromDigitalMeasurement(c(n),Math.abs(e),Math.abs(a))},f=function(n,e,a){return r.createFromAnalogMeasurement(c(n),Math.abs(e),Math.abs(a))},o=function(n,a){switch(n=n.toLowerCase(),a=c(a),n){case"sin":a=a.apply(r.sin,"sin");break;case"cos":a=a.apply(r.cos,"cos");break;case"tan":a=a.apply(r.tan,"tan");break;case"asn":a=a.apply(i,"asin");break;case"asin":a=a.apply(i,"asin");break;case"acs":a=a.apply(e,"acos");break;case"acos":a=a.apply(e,"acos");break;case"atn":a=a.apply(s,"atan");break;case"atan":a=a.apply(s,"atan");break;case"ln":a=a.apply(Math.log,"ln");break;case"log":a=a.apply(r.log10,"log");break;default:a=a}return a},c=function(n){return n instanceof r.ErrorInterval?n:l(n,0)},i=function(r){return Math.asin(r)*(180/Math.PI)},e=function(r){return Math.acos(r)*(180/Math.PI)},s=function(r){return Math.atan(r)*(180/Math.PI)},v=function(r){if(!g(r))throw new n(r);return E[r]},t=function(r,n){return E[r]=n},M=function(r){return delete E[r]},g=function(r){return E.hasOwnProperty(r)},u=function(){return E={}},y=function(){return r.resetIDGenerator()},n=function(r){return this.name="UnknownIdentifierError",this.identifier=r,this.stack=(new Error).stack},n.prototype=new Error,module.exports={add:a,sub:w,mult:m,div:b,pow:k,create:l,endResult:d,convVal:c,createNamed:h,applyOperator:o,createFromDigital:p,createFromAnalogue:f,resolveVariable:v,addVariable:t,removeVariable:M,resetParser:y,variableExists:g,UnknownIdentifierError:n}}).call(this);