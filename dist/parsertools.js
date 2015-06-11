
/*
 * Glue code between Physik-Library and parser
 * @author David Bohn <david.bohn@cancrisoft.net>
 */

(function() {
  var Physik, acos, add, addVariable, applyOperator, asin, atan, cleanVariables, convVal, create, createFromAnalogue, createFromDigital, div, endResult, mult, pow, removeVariable, resolveVariable, sub, variables;

  Physik = require('./physik');

  variables = {};

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

  createFromDigital = function(median, percentage, digit) {
    return Physik.createFromDigitalMeasurement(convVal(median), Math.abs(percentage), Math.abs(digit));
  };

  createFromAnalogue = function(measured, grade, interval) {
    return Physik.createFromAnalogMeasurement(convVal(measured), Math.abs(grade), Math.abs(interval));
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
      case "asn":
        operand = operand.apply(asin);
        break;
      case "asin":
        operand = operand.apply(asin);
        break;
      case "acs":
        operand = operand.apply(acos);
        break;
      case "acos":
        operand = operand.apply(acos);
        break;
      case "atn":
        operand = operand.apply(atan);
        break;
      case "atan":
        operand = operand.apply(atan);
        break;
      case "ln":
        operand = operand.apply(Math.log);
        break;
      case "log":
        operand = operand.apply(Physik.log10);
        break;
      default:
        operand = operand;
    }
    return operand;
  };

  convVal = function(a) {
    if (!(a instanceof Physik.ErrorInterval)) {
      return create(a, 0);
    } else {
      return a;
    }
  };

  asin = function(rad) {
    return Math.asin(rad) * (180 / Math.PI);
  };

  acos = function(rad) {
    return Math.acos(rad) * (180 / Math.PI);
  };

  atan = function(rad) {
    return Math.atan(rad) * (180 / Math.PI);
  };

  resolveVariable = function(variable) {
    return variables[variable];
  };

  addVariable = function(varname, errorInterval) {
    return variables[varname] = errorInterval;
  };

  removeVariable = function(varname) {
    return delete variables[varname];
  };

  cleanVariables = function() {
    return variables = {};
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
    applyOperator: applyOperator,
    createFromDigital: createFromDigital,
    createFromAnalogue: createFromAnalogue,
    resolveVariable: resolveVariable,
    addVariable: addVariable,
    removeVariable: removeVariable
  };

}).call(this);

//# sourceMappingURL=parsertools.js.map