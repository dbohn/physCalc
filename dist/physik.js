(function(){var t,e,s,i,r,n,a,o,h,u,p,d,l,g,c,f,D=function(t,e){function s(){this.constructor=t}for(var i in e)m.call(e,i)&&(t[i]=e[i]);return s.prototype=e.prototype,t.prototype=new s,t.__super__=e.prototype,t},m={}.hasOwnProperty;u=0,h="abcdefghijklmnopqrstuvwxyz",f=[],a=function(){var t;return u>=h.length?(t=u++,h[t%h.length]+Math.floor(t/h.length)):h[u++]},o=function(t){var e;if(arguments.length>0)return f.push(t),t;for(e=a();f.indexOf(e)>=0;)e=a();return f.push(e),arguments.length>0&&(e+="\\["+t+"\\]"),e},n=function(t){var e;return e=(""+t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/),e?Math.max(0,(e[1]?e[1].length:0)-(e[2]?+e[2]:0)):0},p=Math.log10||function(t){return Math.log(t)/Math.LN10},l=function(t,e){var s,i,r,n;return 0===t?0:(s=Math.ceil(p(0>t?-t:t)),r=e-Math.floor(s),i=Math.pow(10,r),n=Math.ceil(t*i),n/i)},d=function(){return u=0,f=[]},e=function(){function e(t,e){this.median=parseFloat(t),this.radius=parseFloat(e),this.calculated=!1,arguments.length>=3?(this.id=o(arguments[2]),4===arguments.length&&arguments[3]&&(this.calculated=!0)):this.id=o(),this.steps=[],this.unparsedMedian=t,this.unparsedRadius=e}return e.prototype.relativeError=function(){return Math.abs(parseFloat((this.radius/this.median).toPrecision(2)))},e.prototype.add=function(t){var s,i,r;return s=this.median+t.median,i=this.radius+t.radius,r=new e(s,i,this.getID()+"+"+t.getID(),!0),r.steps=this.steps.concat(t.steps),r.steps.push("$\\Delta "+r.getID()+" = \\Delta "+this.getID()+" + \\Delta "+t.getID()+" = "+r.radius+"$"),r},e.prototype.sub=function(t){var s,i,r;return s=this.median-t.median,i=this.radius+t.radius,r=new e(s,i,this.getID()+"-"+t.getID(),!0),r.steps=this.steps.concat(t.steps),r.steps.push("$\\Delta "+r.getID()+" = \\Delta "+this.getID()+" + \\Delta "+t.getID()+" = "+r.radius+"$"),r},e.prototype.mult=function(t){var s,i,r,n;return s=this.median*t.median,r=(this.relativeError()+t.relativeError()).toPrecision(2),i=r*s,n=new e(s,i,this.getID()+" \\cdot "+t.getID(),!0),n.steps=this.steps.concat(t.steps),n.steps.push("$\\Delta "+n.getID()+" = \\left(\\delta "+this.getID()+" + \\delta "+t.getID()+"\\right) \\cdot "+this.getID()+" \\cdot "+t.getID()+" = "+n.radius+"$"),n},e.prototype.div=function(t){var s,i,r,n;return s=this.median/t.median,r=(this.relativeError()+t.relativeError()).toPrecision(2),i=r*s,n=new e(s,i,"\\frac{"+this.getID()+"}{"+t.getID()+"}",!0),n.steps=this.steps.concat(t.steps),n.steps.push("$\\Delta "+n.getID()+" = \\left(\\delta "+this.getID()+" + \\delta "+t.getID()+"\\right) \\cdot \\left(\\frac{"+this.getID()+"}{"+t.getID()+"}\\right) = "+n.radius+"$"),n},e.prototype.pow=function(t){var s,i,r,n,a;return s=Math.pow(this.median,t),n=(this.relativeError()*Math.abs(t)).toPrecision(2),i=n*s,r=t,0>t&&(r="\\left("+t+"\\right)"),a=new e(s,i,this.getID()+"^"+r,!0),a.steps=this.steps,a.steps.push("$\\Delta "+a.getID()+" = \\left|"+t+"\\right| \\cdot \\delta "+this.getID()+" \\cdot "+a.getID()+" = "+a.radius+"$"),a},e.prototype.scalar=function(t){return this.mult(new e(t,0))},e.prototype.apply=function(t,s){var i,r,n;return arguments.length<2&&(s=o()),r=t(this.median),i=Math.abs(t(this.median+this.radius)-r),n=new e(r,i,"\\text{"+s+"} \\left("+this.getID()+"\\right)",!0),n.steps=this.steps,n.steps.push("$\\Delta "+n.getID()+" = \\left| \\text{"+s+"}\\left("+this.getID()+" + \\Delta "+this.getID()+"\\right) - \\text{"+s+"}\\left("+this.getID()+"\\right)\\right|$"),n},e.prototype.endResult=function(){var e,s,i;return i=l(this.radius,1),s=this.median.toFixed(n(i)),e=new t(s,i,this.id,this.steps),e.steps=this.steps,e},e.prototype.toString=function(){return"\\left["+this.getMedian()+"\\pm"+this.getRadius()+"\\right]"},e.prototype.getID=function(){return this.calculated?"\\left("+this.id+"\\right)":this.id},e.prototype.getMedian=function(){return this.median.toFixed(n(this.getRadius()))},e.prototype.getRadius=function(){return""+this.radius.toPrecision(2)},e}(),t=function(t){function e(t,e,s,i){this.median=parseFloat(t),this.radius=parseFloat(e),this.id=s,this.calculated=!0,this.steps=i,this.steps.length>0&&(this.steps[this.steps.length-1]=this.steps[this.steps.length-1].replace(/([^=\s]*)$/,this.radius)+"$")}return D(e,t),e.prototype.getRadius=function(){return""+this.radius.toPrecision(1)},e}(e),i=function(t,s,i){var r,n;return n=s/100*i,r=t.radius,new e(t.median,n+r)},r=function(t,s,i){var r;return r=s/100*t.median,r+=i*Math.pow(10,-n(t.unparsedMedian)),arguments.length>=4?new e(t.median,r,arguments[3]):new e(t.median,r)},g=function(t){return Math.sin(t*(Math.PI/180))},s=function(t){return Math.cos(t*(Math.PI/180))},c=function(t){return Math.tan(t*(Math.PI/180))},module.exports={ErrorInterval:e,log10:p,sin:g,cos:s,tan:c,createFromAnalogMeasurement:i,createFromDigitalMeasurement:r,resetIDGenerator:d}}).call(this);