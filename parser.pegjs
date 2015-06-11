{
    var parsertools = require('./parsertools');
    function leftAssoc(rest, val) {
        
        if (!rest.length) return val;
        var last = rest.pop();
        var operator = last[2];

        switch (operator){
            case "+":
                return parsertools.add(leftAssoc(rest, last[0]), val);
                // return leftAssoc(rest, last[0]) + val; break;
            case "-":
                return parsertools.sub(leftAssoc(rest, last[0]), val);
                // return leftAssoc(rest, last[0]) - val; break;
            case "*":
                return parsertools.mult(leftAssoc(rest, last[0]), val);
                // return leftAssoc(rest, last[0]) * val; break;
            case "/":
                return parsertools.div(leftAssoc(rest, last[0]), val);
                //return leftAssoc(rest, last[0]) / val; break;
        }
        //return {left:leftAssoc(rest, last[0]), operator:last[2], right:val};
    }

    function rightAssoc(val, rest) {
        if (!rest.length) return val;
        var first = rest.shift();
        var operator = first[0];
        switch (operator) {
            case "^":
                return parsertools.pow(val, rightAssoc(first[1], rest)); break;
        }
        //return {left:val, operator:first[0], right:rightAssoc(first[1], rest)};
    }
}

start = 
    "=" ws term:additive { return parsertools.endResult(term); }
    / additive

additive = rest:(multiplicative ws ("+" / "-") ws )* v:multiplicative
     { return leftAssoc(rest, v); }

multiplicative = rest:(power ws ("*" / "/") ws )* v:power
     { return leftAssoc(rest, v); }

power = v:sine rest:(("^") sine)*
     { return rightAssoc(v, rest); }

sine
  = "@" operator:(letter)+ ws right:value { return parsertools.applyOperator(operator.join(""), right); }
  / value

value = number
      / "[" median:number ws "," ws percentage:number "%" ws "," ws digit:number "d" ws "]" { return parsertools.createFromDigital(median, percentage, digit); }
      / "[" ws measured:measurement ws "," ws grade:number ws "," ws interval:number ws "]" { return parsertools.createFromAnalogue(measured, grade, interval); }
      / "(" expression:additive ")" { return expression; }
      / variable
      / measurement

variable "eine Variable"
  = vari:(letter)+ { return parsertools.resolveVariable(vari.join("")); }

measurement = "[" median:number ws "+-" ws derivation:number "]" { return parsertools.create(median, Math.abs(derivation)); }

number "eine Zahl"
  = sign:"-"? digits:[0-9.]+ { return sign === null ? parseFloat(digits.join("")) : (-1)*parseFloat(digits.join("")); }

letter "ein Buchstabe" = [a-zA-Z]

ws "ein Leerzeichen" = [ \t\r\n]*