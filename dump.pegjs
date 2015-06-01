{
    var parsertools = require('./parsertools');
    function leftAssoc(rest, val) {
        if (!rest.length) return val;
        var last = rest.pop();
        var operator = last[1];
        switch (operator){
            case "+":
                return parsertools.add(rest, last[0]);
                //return leftAssoc(rest, last[0]) + val; break;
            case "-":
                return parsertools.sub(rest, last[0]);
                //return leftAssoc(rest, last[0]) - val; break;
            case "*":
                return parsertools.mult(rest, last[0]);
                //return leftAssoc(rest, last[0]) * val; break;
            case "/":
                return parsertools.div(rest, last[0]);
                //return leftAssoc(rest, last[0]) / val; break;
        }
      // return {left:leftAssoc(rest, last[0]), operator:last[1], right:val};
    }

    function rightAssoc(val, rest) {
        if (!rest.length) return val;
        var first = rest.shift();
        var operator = first[0];
        switch (operator) {
            case "^":
                return Math.pow(val, rightAssoc(first[1], rest)); break;
        }
      // return {left:val, operator:first[0], right:rightAssoc(first[1], rest)};
    }
}

start = additive

additive = rest:(multiplicative ("+" / "-"))* v:multiplicative
     { return leftAssoc(rest, v); }

multiplicative = rest:(power ("*" / "/"))* v:power
     { return leftAssoc(rest, v); }

power = v:value rest:(("^") value)*
     { return rightAssoc(v, rest); }

value = number
      / "[" median:number ws "+-" ws derivation:number "]" { return parsertools.create(median, derivation); }
      / "(" expression:additive ")" { return expression; }

number "number"
  = sign:"-"? digits:[0-9.]+ { return sign === null ? parseFloat(digits.join("")) : (-1)*parseFloat(digits.join("")); }

ws = [ \t\r\n]*