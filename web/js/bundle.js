(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  var error, errorContainer, errorElem, form, median, parser, parsertools, radius, relError, result, resultContainer;

  parser = require('./parser');

  parsertools = require('./parsertools');

  form = document.querySelector('form[name=calculator_input]');

  resultContainer = document.querySelector('.result_container');

  errorContainer = document.querySelector('.error_container');

  result = resultContainer.querySelector('.result');

  errorElem = errorContainer.querySelector('.error');

  median = result.querySelector('.median');

  radius = result.querySelector('.radius');

  relError = result.querySelector('.rel_error');

  form.addEventListener('submit', function (ev) {
    var err, query, resError;
    ev.preventDefault();
    query = form[0].value;
    if (query === '') {
      return;
    }
    try {
      resError = parser.parse(query);
      resError = parsertools.convVal(resError);
      resultContainer.classList.remove('hide');
      form.classList.add('has-success');
      median.innerHTML = resError.getMedian();
      radius.innerHTML = resError.getRadius();
      return relError.innerHTML = resError.relativeError();
    } catch (_error) {
      err = _error;
      console.log(err);
      if (err === 'Exponent must not have error') {
        return error('Der absolute Fehler des Exponenten muss 0 sein!');
      } else {
        return error('Der Ausdruck enthält syntaktische Fehler!');
      }
    }
  });

  form[0].addEventListener('change', function (ev) {
    form.classList.remove('has-error');
    form.classList.remove('has-success');
    errorContainer.classList.add('hide');
    return resultContainer.classList.add('hide');
  });

  error = function (msg) {
    form.classList.add('has-error');
    form.classList.remove('has-success');
    errorContainer.classList.remove('hide');
    return errorElem.innerHTML = msg;
  };
}).call(undefined);

//# sourceMappingURL=index.js.map

},{"./parser":2,"./parsertools":3}],2:[function(require,module,exports){
"use strict";

module.exports = (function () {
  /*
   * Generated by PEG.js 0.8.0.
   *
   * http://pegjs.majda.cz/
   */

  function peg$subclass(child, parent) {
    function ctor() {
      this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
  }

  function SyntaxError(message, expected, found, offset, line, column) {
    this.message = message;
    this.expected = expected;
    this.found = found;
    this.offset = offset;
    this.line = line;
    this.column = column;

    this.name = "SyntaxError";
  }

  peg$subclass(SyntaxError, Error);

  function parse(input) {
    var options = arguments.length > 1 ? arguments[1] : {},
        peg$FAILED = {},
        peg$startRuleFunctions = { start: peg$parsestart },
        peg$startRuleFunction = peg$parsestart,
        peg$c0 = peg$FAILED,
        peg$c1 = "=",
        peg$c2 = { type: "literal", value: "=", description: "\"=\"" },
        peg$c3 = function peg$c3(term) {
      return parsertools.endResult(term);
    },
        peg$c4 = "+",
        peg$c5 = { type: "literal", value: "+", description: "\"+\"" },
        peg$c6 = function peg$c6(left, right) {
      return parsertools.add(left, right);
    },
        peg$c7 = "-",
        peg$c8 = { type: "literal", value: "-", description: "\"-\"" },
        peg$c9 = function peg$c9(left, right) {
      return parsertools.sub(left, right);
    },
        peg$c10 = "*",
        peg$c11 = { type: "literal", value: "*", description: "\"*\"" },
        peg$c12 = function peg$c12(left, right) {
      return parsertools.mult(left, right);
    },
        peg$c13 = "/",
        peg$c14 = { type: "literal", value: "/", description: "\"/\"" },
        peg$c15 = function peg$c15(left, right) {
      return parsertools.div(left, right);
    },
        peg$c16 = /^[a-zA-Z]/,
        peg$c17 = { type: "class", value: "[a-zA-Z]", description: "[a-zA-Z]" },
        peg$c18 = "^",
        peg$c19 = { type: "literal", value: "^", description: "\"^\"" },
        peg$c20 = function peg$c20(operator, operand, right) {
      return parsertools.pow(parsertools.applyOperator(operator.join(""), operand), right);
    },
        peg$c21 = function peg$c21(left, right) {
      return parsertools.pow(left, right);
    },
        peg$c22 = function peg$c22(operator, right) {
      return parsertools.applyOperator(operator.join(""), right);
    },
        peg$c23 = "(",
        peg$c24 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c25 = ")",
        peg$c26 = { type: "literal", value: ")", description: "\")\"" },
        peg$c27 = function peg$c27(additive) {
      return additive;
    },
        peg$c28 = "[",
        peg$c29 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c30 = "+-",
        peg$c31 = { type: "literal", value: "+-", description: "\"+-\"" },
        peg$c32 = "]",
        peg$c33 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c34 = function peg$c34(median, derivation) {
      return parsertools.create(median, Math.abs(derivation));
    },
        peg$c35 = { type: "other", description: "number" },
        peg$c36 = null,
        peg$c37 = [],
        peg$c38 = /^[0-9.]/,
        peg$c39 = { type: "class", value: "[0-9.]", description: "[0-9.]" },
        peg$c40 = function peg$c40(sign, digits) {
      return sign === null ? parseFloat(digits.join("")) : -1 * parseFloat(digits.join(""));
    },
        peg$c41 = /^[ \t\r\n]/,
        peg$c42 = { type: "class", value: "[ \\t\\r\\n]", description: "[ \\t\\r\\n]" },
        peg$currPos = 0,
        peg$reportedPos = 0,
        peg$cachedPos = 0,
        peg$cachedPosDetails = { line: 1, column: 1, seenCR: false },
        peg$maxFailPos = 0,
        peg$maxFailExpected = [],
        peg$silentFails = 0,
        peg$result;

    if ("startRule" in options) {
      if (!(options.startRule in peg$startRuleFunctions)) {
        throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
      }

      peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
    }

    function text() {
      return input.substring(peg$reportedPos, peg$currPos);
    }

    function offset() {
      return peg$reportedPos;
    }

    function line() {
      return peg$computePosDetails(peg$reportedPos).line;
    }

    function column() {
      return peg$computePosDetails(peg$reportedPos).column;
    }

    function expected(description) {
      throw peg$buildException(null, [{ type: "other", description: description }], peg$reportedPos);
    }

    function error(message) {
      throw peg$buildException(message, null, peg$reportedPos);
    }

    function peg$computePosDetails(pos) {
      function advance(details, startPos, endPos) {
        var p, ch;

        for (p = startPos; p < endPos; p++) {
          ch = input.charAt(p);
          if (ch === "\n") {
            if (!details.seenCR) {
              details.line++;
            }
            details.column = 1;
            details.seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            details.line++;
            details.column = 1;
            details.seenCR = true;
          } else {
            details.column++;
            details.seenCR = false;
          }
        }
      }

      if (peg$cachedPos !== pos) {
        if (peg$cachedPos > pos) {
          peg$cachedPos = 0;
          peg$cachedPosDetails = { line: 1, column: 1, seenCR: false };
        }
        advance(peg$cachedPosDetails, peg$cachedPos, pos);
        peg$cachedPos = pos;
      }

      return peg$cachedPosDetails;
    }

    function peg$fail(expected) {
      if (peg$currPos < peg$maxFailPos) {
        return;
      }

      if (peg$currPos > peg$maxFailPos) {
        peg$maxFailPos = peg$currPos;
        peg$maxFailExpected = [];
      }

      peg$maxFailExpected.push(expected);
    }

    function peg$buildException(message, expected, pos) {
      function cleanupExpected(expected) {
        var i = 1;

        expected.sort(function (a, b) {
          if (a.description < b.description) {
            return -1;
          } else if (a.description > b.description) {
            return 1;
          } else {
            return 0;
          }
        });

        while (i < expected.length) {
          if (expected[i - 1] === expected[i]) {
            expected.splice(i, 1);
          } else {
            i++;
          }
        }
      }

      function buildMessage(expected, found) {
        function stringEscape(s) {
          function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
          }

          return s.replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
            return "\\x0" + hex(ch);
          }).replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
            return "\\x" + hex(ch);
          }).replace(/[\u0180-\u0FFF]/g, function (ch) {
            return "\\u0" + hex(ch);
          }).replace(/[\u1080-\uFFFF]/g, function (ch) {
            return "\\u" + hex(ch);
          });
        }

        var expectedDescs = new Array(expected.length),
            expectedDesc,
            foundDesc,
            i;

        for (i = 0; i < expected.length; i++) {
          expectedDescs[i] = expected[i].description;
        }

        expectedDesc = expected.length > 1 ? expectedDescs.slice(0, -1).join(", ") + " or " + expectedDescs[expected.length - 1] : expectedDescs[0];

        foundDesc = found ? "\"" + stringEscape(found) + "\"" : "end of input";

        return "Expected " + expectedDesc + " but " + foundDesc + " found.";
      }

      var posDetails = peg$computePosDetails(pos),
          found = pos < input.length ? input.charAt(pos) : null;

      if (expected !== null) {
        cleanupExpected(expected);
      }

      return new SyntaxError(message !== null ? message : buildMessage(expected, found), expected, found, pos, posDetails.line, posDetails.column);
    }

    function peg$parsestart() {
      var s0, s1, s2, s3;

      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 61) {
        s1 = peg$c1;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c2);
        }
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsews();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseadditive();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c3(s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseadditive();
      }

      return s0;
    }

    function peg$parseadditive() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsemultiplicative();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsews();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 43) {
            s3 = peg$c4;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c5);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsews();
            if (s4 !== peg$FAILED) {
              s5 = peg$parseadditive();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c6(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsemultiplicative();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsews();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 45) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parsews();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseadditive();
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c9(s1, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parsemultiplicative();
        }
      }

      return s0;
    }

    function peg$parsemultiplicative() {
      var s0, s1, s2, s3, s4, s5;

      s0 = peg$currPos;
      s1 = peg$parsepower();
      if (s1 !== peg$FAILED) {
        s2 = peg$parsews();
        if (s2 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 42) {
            s3 = peg$c10;
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c11);
            }
          }
          if (s3 !== peg$FAILED) {
            s4 = peg$parsews();
            if (s4 !== peg$FAILED) {
              s5 = peg$parsemultiplicative();
              if (s5 !== peg$FAILED) {
                peg$reportedPos = s0;
                s1 = peg$c12(s1, s5);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parsepower();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsews();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 47) {
              s3 = peg$c13;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c14);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parsews();
              if (s4 !== peg$FAILED) {
                s5 = peg$parsemultiplicative();
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c15(s1, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parsepower();
        }
      }

      return s0;
    }

    function peg$parsepower() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c16.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c17);
        }
      }
      if (s2 !== peg$FAILED) {
        if (peg$c16.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c17);
          }
        }
        if (s3 !== peg$FAILED) {
          if (peg$c16.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c17);
            }
          }
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsews();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseprimary();
          if (s3 !== peg$FAILED) {
            s4 = peg$parsews();
            if (s4 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 94) {
                s5 = peg$c18;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c19);
                }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsews();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseprimary();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c20(s1, s3, s7);
                    s0 = s1;
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        s1 = peg$parseprimary();
        if (s1 !== peg$FAILED) {
          s2 = peg$parsews();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 94) {
              s3 = peg$c18;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c19);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parsews();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseprimary();
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c21(s1, s5);
                  s0 = s1;
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parsesine();
        }
      }

      return s0;
    }

    function peg$parsesine() {
      var s0, s1, s2, s3, s4;

      s0 = peg$currPos;
      s1 = peg$currPos;
      if (peg$c16.test(input.charAt(peg$currPos))) {
        s2 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s2 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c17);
        }
      }
      if (s2 !== peg$FAILED) {
        if (peg$c16.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c17);
          }
        }
        if (s3 !== peg$FAILED) {
          if (peg$c16.test(input.charAt(peg$currPos))) {
            s4 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s4 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c17);
            }
          }
          if (s4 !== peg$FAILED) {
            s2 = [s2, s3, s4];
            s1 = s2;
          } else {
            peg$currPos = s1;
            s1 = peg$c0;
          }
        } else {
          peg$currPos = s1;
          s1 = peg$c0;
        }
      } else {
        peg$currPos = s1;
        s1 = peg$c0;
      }
      if (s1 !== peg$FAILED) {
        s2 = peg$parsews();
        if (s2 !== peg$FAILED) {
          s3 = peg$parseprimary();
          if (s3 !== peg$FAILED) {
            peg$reportedPos = s0;
            s1 = peg$c22(s1, s3);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      if (s0 === peg$FAILED) {
        s0 = peg$parseprimary();
      }

      return s0;
    }

    function peg$parseprimary() {
      var s0, s1, s2, s3, s4, s5, s6, s7;

      s0 = peg$parsenumber();
      if (s0 === peg$FAILED) {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c23;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c24);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseadditive();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s3 = peg$c25;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c26);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c27(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 91) {
            s1 = peg$c28;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c29);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsenumber();
            if (s2 !== peg$FAILED) {
              s3 = peg$parsews();
              if (s3 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c30) {
                  s4 = peg$c30;
                  peg$currPos += 2;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c31);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parsews();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parsenumber();
                    if (s6 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 93) {
                        s7 = peg$c32;
                        peg$currPos++;
                      } else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c33);
                        }
                      }
                      if (s7 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c34(s2, s6);
                        s0 = s1;
                      } else {
                        peg$currPos = s0;
                        s0 = peg$c0;
                      }
                    } else {
                      peg$currPos = s0;
                      s0 = peg$c0;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$c0;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$c0;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$c0;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$c0;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$c0;
          }
        }
      }

      return s0;
    }

    function peg$parsenumber() {
      var s0, s1, s2, s3;

      peg$silentFails++;
      s0 = peg$currPos;
      if (input.charCodeAt(peg$currPos) === 45) {
        s1 = peg$c7;
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c8);
        }
      }
      if (s1 === peg$FAILED) {
        s1 = peg$c36;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c38.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c39);
          }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c38.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c39);
              }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c40(s1, s2);
          s0 = s1;
        } else {
          peg$currPos = s0;
          s0 = peg$c0;
        }
      } else {
        peg$currPos = s0;
        s0 = peg$c0;
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c35);
        }
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1;

      s0 = [];
      if (peg$c41.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c42);
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c41.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c42);
          }
        }
      }

      return s0;
    }

    var parsertools = require("./parsertools");

    peg$result = peg$startRuleFunction();

    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
      return peg$result;
    } else {
      if (peg$result !== peg$FAILED && peg$currPos < input.length) {
        peg$fail({ type: "end", description: "end of input" });
      }

      throw peg$buildException(null, peg$maxFailExpected, peg$maxFailPos);
    }
  }

  return {
    SyntaxError: SyntaxError,
    parse: parse
  };
})();

},{"./parsertools":3}],3:[function(require,module,exports){

/*
 * Glue code between Physik-Library and parser
 * @author David Bohn <david.bohn@cancrisoft.net>
 */

'use strict';

(function () {
  var Physik, add, applyOperator, convVal, create, div, endResult, mult, pow, sub;

  Physik = require('./physik');

  add = function (a, b) {
    a = convVal(a);
    b = convVal(b);
    return a.add(b);
  };

  sub = function (a, b) {
    a = convVal(a);
    b = convVal(b);
    return a.sub(b);
  };

  mult = function (a, b) {
    a = convVal(a);
    b = convVal(b);
    return a.mult(b);
  };

  div = function (a, b) {
    a = convVal(a);
    b = convVal(b);
    return a.div(b);
  };

  pow = function (base, exp) {
    if (exp instanceof Physik.ErrorInterval && exp.radius !== 0) {
      throw 'Exponent must not have error';
    }
    exp = exp instanceof Physik.ErrorInterval ? exp.median : exp;
    base = convVal(base);
    return base.pow(exp);
  };

  endResult = function (a) {
    if (a instanceof Physik.ErrorInterval) {
      return a.endResult();
    } else {
      return a;
    }
  };

  create = function (median, derivation) {
    return new Physik.ErrorInterval(median, derivation);
  };

  applyOperator = function (operator, operand) {
    operator = operator.toLowerCase();
    operand = convVal(operand);
    switch (operator) {
      case 'sin':
        operand = operand.apply(Physik.sin);
        break;
      case 'cos':
        operand = operand.apply(Physik.cos);
        break;
      case 'tan':
        operand = operand.apply(Physik.tan);
        break;
      default:
        operand = operand;
    }
    return operand;
  };

  convVal = function (a) {
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
}).call(undefined);

//# sourceMappingURL=parsertools.js.map

},{"./physik":4}],4:[function(require,module,exports){
'use strict';

(function () {
  var ErrorInterval, aufg10, aufg11, aufg11_example, aufg12, aufg4, aufg6, aufg8, aufg9, cos, decimalPlaces, log10, significantDigitsCeiling, sin, tan;

  decimalPlaces = function (num) {
    var match;
    match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  };

  log10 = Math.log10 || function (x) {
    return Math.log(x) / Math.LN10;
  };

  significantDigitsCeiling = function (num, n) {
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

  ErrorInterval = (function () {
    function ErrorInterval(median, radius) {
      this.median = parseFloat(median);
      this.radius = parseFloat(radius);
    }

    ErrorInterval.prototype.relativeError = function () {
      return parseFloat((this.radius / this.median).toPrecision(2));
    };

    ErrorInterval.prototype.add = function (o) {
      var a, da;
      a = this.median + o.median;
      da = (this.radius + o.radius).toPrecision(2);
      return new ErrorInterval(a.toFixed(decimalPlaces(da)), da);
    };

    ErrorInterval.prototype.sub = function (o) {
      var a, da;
      a = this.median - o.median;
      da = (this.radius + o.radius).toPrecision(2);
      return new ErrorInterval(a.toFixed(decimalPlaces(da)), da);
    };

    ErrorInterval.prototype.mult = function (o) {
      var a, da, rel;
      a = this.median * o.median;
      rel = (this.relativeError() + o.relativeError()).toPrecision(2);
      da = (rel * a).toPrecision(2);
      return new ErrorInterval(a.toFixed(decimalPlaces(da)), da);
    };

    ErrorInterval.prototype.div = function (o) {
      var a, da, rel;
      a = this.median / o.median;
      rel = (this.relativeError() + o.relativeError()).toPrecision(2);
      da = (rel * a).toPrecision(2);
      return new ErrorInterval(a.toFixed(decimalPlaces(da)), da);
    };

    ErrorInterval.prototype.pow = function (exp) {
      var a, da, rel;
      a = Math.pow(this.median, exp);
      rel = (this.relativeError() * Math.abs(exp)).toPrecision(2);
      da = (rel * a).toPrecision(2);
      return new ErrorInterval(a.toFixed(decimalPlaces(da)), da);
    };

    ErrorInterval.prototype.scalar = function (c) {
      return this.mult(new ErrorInterval(c, 0));
    };

    ErrorInterval.prototype.apply = function (f) {
      var dk, k;
      k = f(this.median);
      dk = Math.abs(f(this.median + this.radius) - k).toPrecision(2);
      return new ErrorInterval(k.toFixed(decimalPlaces(dk)), dk);
    };

    ErrorInterval.prototype.endResult = function () {
      var resRadius, resZentralwert;
      resRadius = significantDigitsCeiling(this.radius, 1);
      resZentralwert = this.median.toFixed(decimalPlaces(resRadius));
      return new ErrorInterval(resZentralwert, resRadius);
    };

    ErrorInterval.prototype.toString = function () {
      return this.median + ' ' + this.radius;
    };

    ErrorInterval.prototype.getMedian = function () {
      return this.median.toFixed(decimalPlaces(this.radius));
    };

    ErrorInterval.prototype.getRadius = function () {
      return '' + this.radius;
    };

    return ErrorInterval;
  })();

  aufg4 = function () {
    return new ErrorInterval(52.684063, 0.0176228).endResult();
  };

  aufg6 = function () {
    return new ErrorInterval(34.7, 7.6).relativeError();
  };

  aufg8 = function () {
    var l1, l2, l3;
    l1 = new ErrorInterval(200, 0.5);
    l2 = new ErrorInterval(200, 0.5);
    l3 = new ErrorInterval(104.7, 1.5);
    return l1.add(l2).add(l3).endResult();
  };

  aufg9 = function () {
    var s, t;
    s = new ErrorInterval(100, 10);
    t = new ErrorInterval(11.2, 0.3);
    return s.div(t).scalar(3.6).endResult();
  };

  aufg10 = function () {
    var r, t0, t1;
    r = new ErrorInterval(1, 0.002);
    t0 = new ErrorInterval(20, 0.11);
    t1 = new ErrorInterval(2.4, 0.2);
    return t0.div(t1).pow(0.5).mult(r).endResult();
  };

  aufg11_example = function () {
    var a, b, c;
    a = new ErrorInterval(62.4, 0.2);
    b = new ErrorInterval(11.2, 0.2);
    c = new ErrorInterval(9.2, 0.2);
    return a.sub(b).div(c).endResult();
  };

  aufg11 = function () {
    var s, t;
    t = new ErrorInterval(71, 2);
    s = new ErrorInterval(400, 5);
    return new ErrorInterval(1000, 0).div(s.div(t)).endResult();
  };

  aufg12 = function () {
    var alpha, mu, sinAlpha;
    mu = new ErrorInterval(632.8, 0);
    alpha = new ErrorInterval(13.4, 0.5);
    sinAlpha = alpha.apply(function (val) {
      return Math.sin(val * (Math.PI / 180));
    });
    return mu.div(sinAlpha).scalar(0.001).endResult();
  };

  sin = function (v) {
    return Math.sin(v * (Math.PI / 180));
  };

  cos = function (v) {
    return Math.cos(v * (Math.PI / 180));
  };

  tan = function (v) {
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
    tan: tan
  };
}).call(undefined);

//# sourceMappingURL=physik.js.map

},{}]},{},[1]);
