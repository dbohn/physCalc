(function(){var e,r,t,n,s,a,o,u,i,c,l;a=require("./parser"),o=require("./parsertools"),n=document.querySelector("form[name=calculator_input]"),l=document.querySelector(".result_container"),r=document.querySelector(".error_container"),c=l.querySelector(".result"),t=r.querySelector(".error"),s=c.querySelector(".median"),u=c.querySelector(".radius"),i=c.querySelector(".rel_error"),n.addEventListener("submit",function(r){var t,c,d;r.preventDefault(),c=n[0].value;try{return d=a.parse(c),d=o.convVal(d),l.classList.remove("hide"),s.innerHTML=d.median,u.innerHTML=d.radius,i.innerHTML=d.relativeError()}catch(h){return t=h,e("Exponent must not have error"===t?"Der absolute Fehler des Exponenten muss 0 sein!":"Der Ausdruck enthält syntaktische Fehler!")}}),n[0].addEventListener("change",function(e){return n.classList.remove("has-error"),r.classList.add("hide"),l.classList.add("hide")}),e=function(e){return n.classList.add("has-error"),r.classList.remove("hide"),t.innerHTML=e}}).call(this);