{
 var parsertools = require('./parsertools');
}

start
  = "=" ws term:additive {return parsertools.endResult(term)}
  / additive

additive
  = left:multiplicative ws "+" ws right:additive { return parsertools.add(left, right); }
  / left:multiplicative ws "-" ws right:additive { return parsertools.sub(left, right); }
  / multiplicative

multiplicative
  = left:power ws "*" ws right:multiplicative { return parsertools.mult(left, right); }
  / left:power ws "/" ws right:multiplicative { return parsertools.div(left, right); }
  / power

/*power
  = left:number ws "^" ws right:primary { return parsertools.pow(left, right); }
  / "(" additive:additive ")" ws "^" ws right:primary { return parsertools.pow(additive, right); }
  / "[" median:number ws "+-" ws derivation:number "]" ws "^" ws right:primary { return parsertools.pow(parsertools.create(median, derivation), right); }
  / primary*/

power
  = operator:([a-zA-Z][a-zA-Z][a-zA-Z]) ws operand:primary ws "^" ws right:primary { return parsertools.pow(parsertools.applyOperator(operator.join(""), operand), right)}
  / left:primary ws "^" ws right:primary { return parsertools.pow(left, right); }
  / sine

sine
  = operator:([a-zA-Z][a-zA-Z][a-zA-Z]) ws right:primary { return parsertools.applyOperator(operator.join(""), right); }
  / primary

primary
  = number
  / "(" additive:additive ")" { return additive; }
  / "[" median:number ws "+-" ws derivation:number "]" { return parsertools.create(median, Math.abs(derivation)); }

number "number"
  = sign:"-"? digits:[0-9.]+ { return sign === null ? parseFloat(digits.join("")) : (-1)*parseFloat(digits.join("")); }

ws = [ \t\r\n]*