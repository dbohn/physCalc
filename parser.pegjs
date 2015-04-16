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

power
  = left:number "^" right:primary { return parsertools.pow(left, right); }
  / "(" additive:additive ")" "^" right:primary { return parsertools.pow(additive, right); }
  / "[" median:number ws "+-" ws derivation:number "]" "^" right:primary { return parsertools.pow(parsertools.create(median, derivation), right); }
  / primary

primary
  = number
  / "(" additive:additive ")" { return additive; }
  / "[" median:number ws "+-" ws derivation:number "]" { return parsertools.create(median, derivation); }

number "number"
  = digits:[0-9.]+ { return parseFloat(digits.join("")); }

ws = [ \t\r\n]*