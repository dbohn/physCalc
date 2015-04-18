(function() {
  var ErrorInterval, aufg10, aufg11, aufg11_example, aufg12, aufg4, aufg6, aufg8, aufg9, cos, createFromAnalogMeasurement, createFromDigitalMeasurement, decimalPlaces, log10, significantDigitsCeiling, sin, tan;

  decimalPlaces = function(num) {
    var match;
    match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  };

  log10 = Math.log10 || function(x) {
    return Math.log(x) / Math.LN10;
  };

  significantDigitsCeiling = function(num, n) {
    var d, magnitude, power, shifted;
    if (num === 0) {
      return 0;
    }
    d = Math.ceil(log10(num < 0 ? -num : num));
    power = n - Math.floor(d);
    magnitude = Math.pow(10, power);
    shifted = Math.ceil(num * magnitude);
    return shifted / magnitude;
  };

  ErrorInterval = (function() {
    function ErrorInterval(median, radius) {
      this.median = parseFloat(median);
      this.radius = parseFloat(radius);
    }

    ErrorInterval.prototype.relativeError = function() {
      return parseFloat((this.radius / this.median).toPrecision(2));
    };

    ErrorInterval.prototype.add = function(o) {
      var a, da;
      a = this.median + o.median;
      da = this.radius + o.radius;
      return new ErrorInterval(a, da).intermediateResult();
    };

    ErrorInterval.prototype.sub = function(o) {
      var a, da;
      a = this.median - o.median;
      da = this.radius + o.radius;
      return new ErrorInterval(a, da).intermediateResult();
    };

    ErrorInterval.prototype.mult = function(o) {
      var a, da, rel;
      a = this.median * o.median;
      rel = (this.relativeError() + o.relativeError()).toPrecision(2);
      da = (rel * a).toPrecision(2);
      return new ErrorInterval(a, da).intermediateResult();
    };

    ErrorInterval.prototype.div = function(o) {
      var a, da, rel;
      a = this.median / o.median;
      rel = (this.relativeError() + o.relativeError()).toPrecision(2);
      da = (rel * a).toPrecision(2);
      return new ErrorInterval(a, da).intermediateResult();
    };

    ErrorInterval.prototype.pow = function(exp) {
      var a, da, rel;
      a = Math.pow(this.median, exp);
      rel = (this.relativeError() * Math.abs(exp)).toPrecision(2);
      da = (rel * a).toPrecision(2);
      return new ErrorInterval(a, da).intermediateResult();
    };

    ErrorInterval.prototype.scalar = function(c) {
      return (this.mult(new ErrorInterval(c, 0))).intermediateResult();
    };

    ErrorInterval.prototype.apply = function(f) {
      var dk, k;
      k = f(this.median);
      dk = Math.abs(f(this.median + this.radius) - k);
      return new ErrorInterval(k, dk).intermediateResult();
    };

    ErrorInterval.prototype.endResult = function() {
      var resMedian, resRadius;
      resRadius = significantDigitsCeiling(this.radius, 1);
      resMedian = this.median.toFixed(decimalPlaces(resRadius));
      return new ErrorInterval(resMedian, resRadius);
    };

    ErrorInterval.prototype.intermediateResult = function() {
      var resMedian, resRadius;
      resRadius = this.radius.toPrecision(2);
      resMedian = this.median.toFixed(decimalPlaces(resRadius));
      return new ErrorInterval(resMedian, resRadius);
    };

    ErrorInterval.prototype.toString = function() {
      return this.median + ' ' + this.radius;
    };

    ErrorInterval.prototype.getMedian = function() {
      return this.median.toFixed(decimalPlaces(this.radius));
    };

    ErrorInterval.prototype.getRadius = function() {
      return '' + this.radius;
    };

    return ErrorInterval;

  })();

  createFromAnalogMeasurement = function(val, k, range) {
    var da, dk;
    dk = (k / 100) * range;
    da = val.radius;
    return new ErrorInterval(val.median, dk + da).intermediateResult();
  };

  createFromDigitalMeasurement = function(val, p, d) {
    var da;
    da = (p / 100) * val.median;
    da += d * Math.pow(10, -decimalPlaces(val.median));
    return new ErrorInterval(val.median, da).intermediateResult();
  };

  aufg4 = function() {
    return new ErrorInterval(52.684063, 0.0176228).endResult();
  };

  aufg6 = function() {
    return new ErrorInterval(34.7, 7.6).relativeError();
  };

  aufg8 = function() {
    var l1, l2, l3;
    l1 = new ErrorInterval(200, 0.5);
    l2 = new ErrorInterval(200, 0.5);
    l3 = new ErrorInterval(104.7, 1.5);
    return l1.add(l2).add(l3).endResult();
  };

  aufg9 = function() {
    var s, t;
    s = new ErrorInterval(100, 10);
    t = new ErrorInterval(11.2, 0.3);
    return s.div(t).scalar(3.6).endResult();
  };

  aufg10 = function() {
    var r, t0, t1;
    r = new ErrorInterval(1.000, 0.002);
    t0 = new ErrorInterval(20.00, 0.11);
    t1 = new ErrorInterval(2.4, 0.2);
    return t0.div(t1).pow(0.5).mult(r).endResult();
  };

  aufg11_example = function() {
    var a, b, c;
    a = new ErrorInterval(62.4, 0.2);
    b = new ErrorInterval(11.2, 0.2);
    c = new ErrorInterval(9.2, 0.2);
    return a.sub(b).div(c).endResult();
  };

  aufg11 = function() {
    var s, t;
    t = new ErrorInterval(71, 2);
    s = new ErrorInterval(400, 5);
    return new ErrorInterval(1000, 0).div(s.div(t)).endResult();
  };

  aufg12 = function() {
    var alpha, mu, sinAlpha;
    mu = new ErrorInterval(632.8, 0);
    alpha = new ErrorInterval(13.4, 0.5);
    sinAlpha = alpha.apply(function(val) {
      return Math.sin(val * (Math.PI / 180));
    });
    return mu.div(sinAlpha).scalar(0.001).endResult();
  };

  sin = function(v) {
    return Math.sin(v * (Math.PI / 180));
  };

  cos = function(v) {
    return Math.cos(v * (Math.PI / 180));
  };

  tan = function(v) {
    return Math.tan(v * (Math.PI / 180));
  };

  module.exports = {
    ErrorInterval: ErrorInterval,
    aufg4: aufg4,
    aufg6: aufg6,
    aufg8: aufg8,
    aufg9: aufg9,
    aufg10: aufg10,
    aufg11_example: aufg11_example,
    aufg11: aufg11,
    aufg12: aufg12,
    sin: sin,
    cos: cos,
    tan: tan,
    createFromAnalogMeasurement: createFromAnalogMeasurement,
    createFromDigitalMeasurement: createFromDigitalMeasurement
  };

}).call(this);

//# sourceMappingURL=physik.js.map