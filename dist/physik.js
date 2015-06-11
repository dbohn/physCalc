(function() {
  var EndResult, ErrorInterval, cos, createFromAnalogMeasurement, createFromDigitalMeasurement, decimalPlaces, getNewID, ids, index, log10, resetIDGenerator, significantDigitsCeiling, sin, tan,
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

  resetIDGenerator = function() {
    return index = 0;
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
      this.steps = [];
      this.unparsedMedian = median;
      this.unparsedRadius = radius;
    }

    ErrorInterval.prototype.relativeError = function() {
      return parseFloat((this.radius / this.median).toPrecision(2));
    };

    ErrorInterval.prototype.add = function(o) {
      var a, da, res;
      a = this.median + o.median;
      da = this.radius + o.radius;
      res = new ErrorInterval(a, da, this.getID() + '+' + o.getID(), true);
      res.steps = this.steps.concat(o.steps);
      res.steps.push('$\\Delta ' + res.getID() + ' = \\Delta ' + this.getID() + ' + ' + '\\Delta ' + o.getID() + ' = ' + res.radius + '$');
      return res;
    };

    ErrorInterval.prototype.sub = function(o) {
      var a, da, res;
      a = this.median - o.median;
      da = this.radius + o.radius;
      res = new ErrorInterval(a, da, this.getID() + '-' + o.getID(), true);
      res.steps = this.steps.concat(o.steps);
      res.steps.push('$\\Delta ' + res.getID() + ' = \\Delta ' + this.getID() + ' + ' + '\\Delta ' + o.getID() + ' = ' + res.radius + '$');
      return res;
    };

    ErrorInterval.prototype.mult = function(o) {
      var a, da, rel, res;
      a = this.median * o.median;
      rel = (this.relativeError() + o.relativeError()).toPrecision(2);
      da = rel * a;
      res = new ErrorInterval(a, da, this.getID() + ' \\cdot ' + o.getID(), true);
      res.steps = this.steps.concat(o.steps);
      res.steps.push('$\\Delta ' + res.getID() + ' = \\left(\\delta ' + this.getID() + ' + \\delta ' + o.getID() + '\\right) \\cdot ' + this.getID() + ' \\cdot ' + o.getID() + ' = ' + res.radius + '$');
      return res;
    };

    ErrorInterval.prototype.div = function(o) {
      var a, da, rel, res;
      a = this.median / o.median;
      rel = (this.relativeError() + o.relativeError()).toPrecision(2);
      da = rel * a;
      res = new ErrorInterval(a, da, '\\frac{' + this.getID() + '}{' + o.getID() + '}', true);
      res.steps = this.steps.concat(o.steps);
      res.steps.push('$\\Delta ' + res.getID() + ' = \\left(\\delta ' + this.getID() + ' + \\delta ' + o.getID() + '\\right) \\cdot \\left(\\frac{' + this.getID() + '}{' + o.getID() + '}\\right) = ' + res.radius + '$');
      return res;
    };

    ErrorInterval.prototype.pow = function(exp) {
      var a, da, expID, rel, res;
      a = Math.pow(this.median, exp);
      rel = (this.relativeError() * Math.abs(exp)).toPrecision(2);
      da = rel * a;
      expID = exp;
      if (exp < 0) {
        expID = '\\left(' + exp + '\\right)';
      }
      res = new ErrorInterval(a, da, this.getID() + '^' + expID, true);
      res.steps = this.steps;
      res.steps.push('$\\Delta ' + res.getID() + ' = \\|' + exp + '\\| \\cdot \\delta ' + this.getID() + ' \\cdot ' + res.getID() + ' = ' + res.radius + '$');
      return res;
    };

    ErrorInterval.prototype.scalar = function(c) {
      return this.mult(new ErrorInterval(c, 0));
    };

    ErrorInterval.prototype.apply = function(f) {
      var dk, k;
      k = f(this.median);
      console.log(k);
      dk = Math.abs(f(this.median + this.radius) - k);
      return new ErrorInterval(k, dk);
    };

    ErrorInterval.prototype.endResult = function() {
      var res, resMedian, resRadius;
      resRadius = significantDigitsCeiling(this.radius, 1);
      resMedian = this.median.toFixed(decimalPlaces(resRadius));
      res = new EndResult(resMedian, resRadius, this.id, this.steps);
      res.steps = this.steps;
      return res;
    };

    ErrorInterval.prototype.toString = function() {
      return '\\[' + this.getMedian() + '\\pm' + this.getRadius() + '\\]';
    };

    ErrorInterval.prototype.getID = function() {
      if (this.calculated) {
        return '\\left(' + this.id + '\\right)';
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

    function EndResult(median, radius, id, steps) {
      this.median = parseFloat(median);
      this.radius = parseFloat(radius);
      this.id = id;
      this.calculated = true;
      this.steps = steps;
      if (this.steps.length > 0) {
        this.steps[this.steps.length - 1] = this.steps[this.steps.length - 1].replace(/([^=\s]*)$/, this.radius) + '$';
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
    return new ErrorInterval(val.median, dk + da);
  };

  createFromDigitalMeasurement = function(val, p, d) {
    var da;
    da = (p / 100) * val.median;
    da += d * Math.pow(10, -decimalPlaces(val.unparsedMedian));
    if (arguments.length >= 4) {
      return new ErrorInterval(val.median, da, arguments[3]);
    } else {
      return new ErrorInterval(val.median, da);
    }
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
    createFromDigitalMeasurement: createFromDigitalMeasurement,
    resetIDGenerator: resetIDGenerator
  };

}).call(this);

//# sourceMappingURL=physik.js.map