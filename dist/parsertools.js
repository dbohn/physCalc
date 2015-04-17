
/*
 * Glue code between Physik-Library and parser
 * @author David Bohn <david.bohn@cancrisoft.net>
 */

(function() {
  var Physik, add, applyOperator, convVal, create, div, endResult, mult, pow, sub;

  Physik = require('./physik');

  add = function(a, b) {
    a = convVal(a);
    b = convVal(b);
    return a.add(b);
  };

  sub = function(a, b) {
    a = convVal(a);
    b = convVal(b);
    return a.sub(b);
  };

  mult = function(a, b) {
    a = convVal(a);
    b = convVal(b);
    return a.mult(b);
  };

  div = function(a, b) {
    a = convVal(a);
    b = convVal(b);
    return a.div(b);
  };

  pow = function(base, exp) {
    if (exp instanceof Physik.ErrorInterval && exp.radius !== 0) {
      throw 'Exponent must not have error';
    }
    exp = exp instanceof Physik.ErrorInterval ? exp.median : exp;
    base = convVal(base);
    return base.pow(exp);
  };

  endResult = function(a) {
    if (a instanceof Physik.ErrorInterval) {
      return a.endResult();
    } else {
      return a;
    }
  };

  create = function(median, derivation) {
    return new Physik.ErrorInterval(median, derivation);
  };

  applyOperator = function(operator, operand) {
    operator = operator.toLowerCase();
    operand = convVal(operand);
    switch (operator) {
      case "sin":
        operand = operand.apply(Physik.sin);
        break;
      case "cos":
        operand = operand.apply(Physik.cos);
        break;
      case "tan":
        operand = operand.apply(Physik.tan);
        break;
      default:
        operand = operand;
    }
    console.log(operator);
    return operand;
  };

  convVal = function(a) {
    if (!(a instanceof Physik.ErrorInterval)) {
      return create(a, 0);
    } else {
      return a;
    }
  };

  module.exports = {
    add: add,
    sub: sub,
    mult: mult,
    div: div,
    pow: pow,
    create: create,
    endResult: endResult,
    convVal: convVal,
    applyOperator: applyOperator
  };

}).call(this);

//# sourceMappingURL=parsertools.js.map