(function() {
  var EndResult, ErrorInterval, cos, createFromAnalogMeasurement, createFromDigitalMeasurement, decimalPlaces, log10, significantDigitsCeiling, sin, tan,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

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
      return new EndResult(resMedian, resRadius);
    };

    ErrorInterval.prototype.intermediateResult = function() {
      var resMedian, resRadius;
      resRadius = this.radius.toPrecision(2);
      resMedian = this.median.toFixed(decimalPlaces(resRadius));
      return new ErrorInterval(resMedian, resRadius);
    };

    ErrorInterval.prototype.toString = function() {
      return '[' + this.getMedian() + '+-' + this.getRadius() + ']';
    };

    ErrorInterval.prototype.getMedian = function() {
      return this.median.toFixed(decimalPlaces(this.getRadius()));
    };

    ErrorInterval.prototype.getRadius = function() {
      return '' + this.radius.toPrecision(2);
    };

    return ErrorInterval;

  })();

  EndResult = (function(superClass) {
    extend(EndResult, superClass);

    function EndResult() {
      return EndResult.__super__.constructor.apply(this, arguments);
    }

    EndResult.prototype.getRadius = function() {
      return '' + this.radius.toPrecision(1);
    };

    return EndResult;

  })(ErrorInterval);

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
    log10: log10,
    sin: sin,
    cos: cos,
    tan: tan,
    createFromAnalogMeasurement: createFromAnalogMeasurement,
    createFromDigitalMeasurement: createFromDigitalMeasurement
  };

}).call(this);

//# sourceMappingURL=physik.js.map