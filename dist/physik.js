(function() {
  var EndResult, ErrorInterval, cos, createFromAnalogMeasurement, createFromDigitalMeasurement, decimalPlaces, getNewID, ids, index, log10, significantDigitsCeiling, sin, tan,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  index = 0;

  ids = 'abcdefghijklmnopqrstuvwxyz';

  getNewID = function() {
    var m;
    if (index >= ids.length) {
      m = index++;
      return ids[m % ids.length] + Math.floor(m / ids.length);
    }
    return ids[index++];
  };

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
      this.calculated = false;
      if (arguments.length >= 3) {
        this.id = arguments[2];
        if (arguments.length === 4 && arguments[3]) {
          this.calculated = true;
        }
      } else {
        this.id = getNewID();
      }
      this.history = [];
    }

    ErrorInterval.prototype.relativeError = function() {
      return parseFloat((this.radius / this.median).toPrecision(2));
    };

    ErrorInterval.prototype.add = function(o) {
      var a, da, res;
      a = this.median + o.median;
      da = this.radius + o.radius;
      res = new ErrorInterval(a, da, this.getID() + '+' + o.getID(), true).intermediateResult();
      res.history = this.history.concat(o.history);
      res.history.push('Δ(' + res.getID() + ') = Δ' + this.getID() + ' + ' + 'Δ' + o.getID() + ' = ' + res.radius);
      return res;
    };

    ErrorInterval.prototype.sub = function(o) {
      var a, da, res;
      a = this.median - o.median;
      da = this.radius + o.radius;
      res = new ErrorInterval(a, da, this.getID() + '-' + o.getID(), true).intermediateResult();
      res.history = this.history.concat(o.history);
      res.history.push('Δ' + res.getID() + ' = Δ' + this.getID() + ' + ' + 'Δ' + o.getID() + ' = ' + res.radius);
      return res;
    };

    ErrorInterval.prototype.mult = function(o) {
      var a, da, rel, res;
      a = this.median * o.median;
      rel = (this.relativeError() + o.relativeError()).toPrecision(2);
      da = (rel * a).toPrecision(2);
      res = new ErrorInterval(a, da, this.getID() + '*' + o.getID(), true).intermediateResult();
      res.history = this.history.concat(o.history);
      res.history.push('Δ' + res.getID() + ' = (δ' + this.getID() + ' + δ' + o.getID() + ') * ' + this.getID() + ' * ' + o.getID() + ' = ' + res.radius);
      return res;
    };

    ErrorInterval.prototype.div = function(o) {
      var a, da, rel, res;
      a = this.median / o.median;
      rel = (this.relativeError() + o.relativeError()).toPrecision(2);
      da = (rel * a).toPrecision(2);
      res = new ErrorInterval(a, da, this.getID() + '/' + o.getID(), true).intermediateResult();
      res.history = this.history.concat(o.history);
      res.history.push('Δ' + res.getID() + ' = (δ' + this.getID() + ' + δ' + o.getID() + ') * (' + this.getID() + ' / ' + o.getID() + ') = ' + res.radius);
      return res;
    };

    ErrorInterval.prototype.pow = function(exp) {
      var a, da, expID, rel, res;
      a = Math.pow(this.median, exp);
      rel = (this.relativeError() * Math.abs(exp)).toPrecision(2);
      da = (rel * a).toPrecision(2);
      expID = exp;
      if (exp < 0) {
        expID = '(' + exp + ')';
      }
      res = new ErrorInterval(a, da, this.getID() + '^' + expID, true).intermediateResult();
      res.history = this.history;
      res.history.push('Δ' + res.getID() + ' = |' + exp + '| * δ' + this.getID() + ' * ' + this.getID() + ' = ' + res.radius);
      return res;
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
      var res, resMedian, resRadius;
      resRadius = significantDigitsCeiling(this.radius, 1);
      resMedian = this.median.toFixed(decimalPlaces(resRadius));
      res = new EndResult(resMedian, resRadius, this.id, this.history);
      res.history = this.history;
      return res;
    };

    ErrorInterval.prototype.intermediateResult = function() {
      var resMedian, resRadius;
      resRadius = this.radius.toPrecision(2);
      resMedian = this.median.toFixed(decimalPlaces(resRadius));
      return new ErrorInterval(resMedian, resRadius, this.id, this.calculated);
    };

    ErrorInterval.prototype.toString = function() {
      return '[' + this.getMedian() + '+-' + this.getRadius() + ']';
    };

    ErrorInterval.prototype.getID = function() {
      if (this.calculated) {
        return '(' + this.id + ')';
      } else {
        return this.id;
      }
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

    function EndResult(median, radius, id, history) {
      this.median = parseFloat(median);
      this.radius = parseFloat(radius);
      this.id = id;
      this.calculated = true;
      this.history = history;
      if (this.history.length > 0) {
        this.history[this.history.length - 1] = this.history[this.history.length - 1].replace(/([^=\s]*)$/, this.radius);
      }
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