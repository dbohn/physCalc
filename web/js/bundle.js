(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

(function () {
  var e, r, n, t, s, i, a, o, u, c, l, d, h, m, L;u = require("./parser"), c = require("./parsertools"), a = document.querySelector("form[name=calculator_input]"), m = document.querySelector(".result_container"), t = document.querySelector(".error_container"), h = m.querySelector(".result"), s = t.querySelector(".error"), i = t.querySelector(".infotext"), o = h.querySelector(".median"), l = h.querySelector(".radius"), d = h.querySelector(".rel_error"), a.addEventListener("submit", function (t) {
    var s, i, h, L;if ((t.preventDefault(), h = a[0].value.trim(), "" !== h)) try {
      return (L = u.parse(h), L = c.convVal(L), m.classList.remove("hide"), a.classList.add("has-success"), o.innerHTML = L.getMedian(), l.innerHTML = L.getRadius(), d.innerHTML = L.relativeError());
    } catch (f) {
      return (i = f, console.log(i), i instanceof u.SyntaxError ? (s = "Es wurde " + e(i.expected) + " erwartet. Gefunden wurde aber " + r(i.found) + ".", n("Der Ausdruck enthält einen syntaktische Fehler an Position " + i.column + "!", s)) : n("Exponent must not have error" === i ? "Der absolute Fehler des Exponenten muss 0 sein!" : "Ein unbekannter Fehler ist aufgetreten!"));
    }
  }), a[0].addEventListener("change", function (e) {
    return (a.classList.remove("has-error"), a.classList.remove("has-success"), t.classList.add("hide"), m.classList.add("hide"));
  }), r = function (e) {
    return null === e ? "nichts" : "\"" + e + "\"";
  }, e = function (e) {
    return 1 === e.length ? L(e[0]) : e.slice(0, e.length - 1).map(L).join(", ") + " oder " + L(e[e.length - 1]);
  }, L = function (e) {
    return "end" === e.type ? "das Eingabeende" : e.description;
  }, n = function (e) {
    return (a.classList.add("has-error"), a.classList.remove("has-success"), t.classList.remove("hide"), s.innerHTML = e, i.innerHTML = "", 2 === arguments.length ? i.innerHTML = arguments[1] : void 0);
  };
}).call(undefined);

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
        peg$c16 = "^",
        peg$c17 = { type: "literal", value: "^", description: "\"^\"" },
        peg$c18 = function peg$c18(operator, operand, right) {
      return parsertools.pow(parsertools.applyOperator(operator.join(""), operand), right);
    },
        peg$c19 = function peg$c19(left, right) {
      return parsertools.pow(left, right);
    },
        peg$c20 = function peg$c20(operator, right) {
      return parsertools.applyOperator(operator.join(""), right);
    },
        peg$c21 = "(",
        peg$c22 = { type: "literal", value: "(", description: "\"(\"" },
        peg$c23 = ")",
        peg$c24 = { type: "literal", value: ")", description: "\")\"" },
        peg$c25 = function peg$c25(additive) {
      return additive;
    },
        peg$c26 = "[",
        peg$c27 = { type: "literal", value: "[", description: "\"[\"" },
        peg$c28 = "+-",
        peg$c29 = { type: "literal", value: "+-", description: "\"+-\"" },
        peg$c30 = "]",
        peg$c31 = { type: "literal", value: "]", description: "\"]\"" },
        peg$c32 = function peg$c32(median, derivation) {
      return parsertools.create(median, Math.abs(derivation));
    },
        peg$c33 = { type: "other", description: "eine Zahl" },
        peg$c34 = null,
        peg$c35 = [],
        peg$c36 = /^[0-9.]/,
        peg$c37 = { type: "class", value: "[0-9.]", description: "[0-9.]" },
        peg$c38 = function peg$c38(sign, digits) {
      return sign === null ? parseFloat(digits.join("")) : -1 * parseFloat(digits.join(""));
    },
        peg$c39 = { type: "other", description: "ein Buchstabe" },
        peg$c40 = /^[a-zA-Z]/,
        peg$c41 = { type: "class", value: "[a-zA-Z]", description: "[a-zA-Z]" },
        peg$c42 = { type: "other", description: "ein Leerzeichen" },
        peg$c43 = /^[ \t\r\n]/,
        peg$c44 = { type: "class", value: "[ \\t\\r\\n]", description: "[ \\t\\r\\n]" },
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
      s2 = peg$parseletter();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseletter();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseletter();
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
                s5 = peg$c16;
                peg$currPos++;
              } else {
                s5 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c17);
                }
              }
              if (s5 !== peg$FAILED) {
                s6 = peg$parsews();
                if (s6 !== peg$FAILED) {
                  s7 = peg$parseprimary();
                  if (s7 !== peg$FAILED) {
                    peg$reportedPos = s0;
                    s1 = peg$c18(s1, s3, s7);
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
              s3 = peg$c16;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c17);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parsews();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseprimary();
                if (s5 !== peg$FAILED) {
                  peg$reportedPos = s0;
                  s1 = peg$c19(s1, s5);
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
      s2 = peg$parseletter();
      if (s2 !== peg$FAILED) {
        s3 = peg$parseletter();
        if (s3 !== peg$FAILED) {
          s4 = peg$parseletter();
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
            s1 = peg$c20(s1, s3);
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
          s1 = peg$c21;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c22);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseadditive();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s3 = peg$c23;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c24);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$reportedPos = s0;
              s1 = peg$c25(s2);
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
            s1 = peg$c26;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c27);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parsenumber();
            if (s2 !== peg$FAILED) {
              s3 = peg$parsews();
              if (s3 !== peg$FAILED) {
                if (input.substr(peg$currPos, 2) === peg$c28) {
                  s4 = peg$c28;
                  peg$currPos += 2;
                } else {
                  s4 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c29);
                  }
                }
                if (s4 !== peg$FAILED) {
                  s5 = peg$parsews();
                  if (s5 !== peg$FAILED) {
                    s6 = peg$parsenumber();
                    if (s6 !== peg$FAILED) {
                      if (input.charCodeAt(peg$currPos) === 93) {
                        s7 = peg$c30;
                        peg$currPos++;
                      } else {
                        s7 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c31);
                        }
                      }
                      if (s7 !== peg$FAILED) {
                        peg$reportedPos = s0;
                        s1 = peg$c32(s2, s6);
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
        s1 = peg$c34;
      }
      if (s1 !== peg$FAILED) {
        s2 = [];
        if (peg$c36.test(input.charAt(peg$currPos))) {
          s3 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s3 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c37);
          }
        }
        if (s3 !== peg$FAILED) {
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c36.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c37);
              }
            }
          }
        } else {
          s2 = peg$c0;
        }
        if (s2 !== peg$FAILED) {
          peg$reportedPos = s0;
          s1 = peg$c38(s1, s2);
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
          peg$fail(peg$c33);
        }
      }

      return s0;
    }

    function peg$parseletter() {
      var s0, s1;

      peg$silentFails++;
      if (peg$c40.test(input.charAt(peg$currPos))) {
        s0 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s0 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c41);
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c39);
        }
      }

      return s0;
    }

    function peg$parsews() {
      var s0, s1;

      peg$silentFails++;
      s0 = [];
      if (peg$c43.test(input.charAt(peg$currPos))) {
        s1 = input.charAt(peg$currPos);
        peg$currPos++;
      } else {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c44);
        }
      }
      while (s1 !== peg$FAILED) {
        s0.push(s1);
        if (peg$c43.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c44);
          }
        }
      }
      peg$silentFails--;
      if (s0 === peg$FAILED) {
        s1 = peg$FAILED;
        if (peg$silentFails === 0) {
          peg$fail(peg$c42);
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
"use strict";

(function () {
  var n, r, t, e, a, o, u, i, c, s;n = require("./physik"), r = function (n, r) {
    return (n = e(n), r = e(r), n.add(r));
  }, s = function (n, r) {
    return (n = e(n), r = e(r), n.sub(r));
  }, i = function (n, r) {
    return (n = e(n), r = e(r), n.mult(r));
  }, o = function (n, r) {
    return (n = e(n), r = e(r), n.div(r));
  }, c = function (r, t) {
    if (t instanceof n.ErrorInterval && 0 !== t.radius) throw "Exponent must not have error";return (t = t instanceof n.ErrorInterval ? t.median : t, r = e(r), r.pow(t));
  }, u = function (r) {
    return r instanceof n.ErrorInterval ? r.endResult() : r;
  }, a = function (r, t) {
    return new n.ErrorInterval(r, t);
  }, t = function (r, t) {
    switch ((r = r.toLowerCase(), t = e(t), r)) {case "sin":
        t = t.apply(n.sin);break;case "cos":
        t = t.apply(n.cos);break;case "tan":
        t = t.apply(n.tan);break;default:
        t = t;}return t;
  }, e = function (r) {
    return r instanceof n.ErrorInterval ? r : a(r, 0);
  }, module.exports = { add: r, sub: s, mult: i, div: o, pow: c, create: a, endResult: u, convVal: e, applyOperator: t };
}).call(undefined);

},{"./physik":4}],4:[function(require,module,exports){
"use strict";

(function () {
  var t, n, e, r, i, o, a, u, s, d, c, h, f, l, p;c = function (t) {
    var n;return (n = ("" + t).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/), n ? Math.max(0, (n[1] ? n[1].length : 0) - (n[2] ? +n[2] : 0)) : 0);
  }, h = Math.log10 || function (t) {
    return Math.log(t) / Math.LN10;
  }, f = function (t, n) {
    var e, r, i, o;return 0 === t ? 0 : (e = Math.ceil(h(0 > t ? -t : t)), i = n - Math.floor(e), r = Math.pow(10, i), o = Math.ceil(t * r), o / r);
  }, t = (function () {
    function t(t, n) {
      this.median = parseFloat(t), this.radius = parseFloat(n);
    }return (t.prototype.relativeError = function () {
      return parseFloat((this.radius / this.median).toPrecision(2));
    }, t.prototype.add = function (n) {
      var e, r;return (e = this.median + n.median, r = (this.radius + n.radius).toPrecision(2), new t(e.toFixed(c(r)), r));
    }, t.prototype.sub = function (n) {
      var e, r;return (e = this.median - n.median, r = (this.radius + n.radius).toPrecision(2), new t(e.toFixed(c(r)), r));
    }, t.prototype.mult = function (n) {
      var e, r, i;return (e = this.median * n.median, i = (this.relativeError() + n.relativeError()).toPrecision(2), r = (i * e).toPrecision(2), new t(e.toFixed(c(r)), r));
    }, t.prototype.div = function (n) {
      var e, r, i;return (e = this.median / n.median, i = (this.relativeError() + n.relativeError()).toPrecision(2), r = (i * e).toPrecision(2), new t(e.toFixed(c(r)), r));
    }, t.prototype.pow = function (n) {
      var e, r, i;return (e = Math.pow(this.median, n), i = (this.relativeError() * Math.abs(n)).toPrecision(2), r = (i * e).toPrecision(2), new t(e.toFixed(c(r)), r));
    }, t.prototype.scalar = function (n) {
      return this.mult(new t(n, 0));
    }, t.prototype.apply = function (n) {
      var e, r;return (r = n(this.median), e = Math.abs(n(this.median + this.radius) - r).toPrecision(2), new t(r.toFixed(c(e)), e));
    }, t.prototype.endResult = function () {
      var n, e;return (n = f(this.radius, 1), e = this.median.toFixed(c(n)), new t(e, n));
    }, t.prototype.toString = function () {
      return this.median + " " + this.radius;
    }, t.prototype.getMedian = function () {
      return this.median.toFixed(c(this.radius));
    }, t.prototype.getRadius = function () {
      return "" + this.radius;
    }, t);
  })(), o = function () {
    return new t(52.684063, 0.0176228).endResult();
  }, a = function () {
    return new t(34.7, 7.6).relativeError();
  }, u = function () {
    var n, e, r;return (n = new t(200, 0.5), e = new t(200, 0.5), r = new t(104.7, 1.5), n.add(e).add(r).endResult());
  }, s = function () {
    var n, e;return (n = new t(100, 10), e = new t(11.2, 0.3), n.div(e).scalar(3.6).endResult());
  }, n = function () {
    var n, e, r;return (n = new t(1, 0.002), e = new t(20, 0.11), r = new t(2.4, 0.2), e.div(r).pow(0.5).mult(n).endResult());
  }, r = function () {
    var n, e, r;return (n = new t(62.4, 0.2), e = new t(11.2, 0.2), r = new t(9.2, 0.2), n.sub(e).div(r).endResult());
  }, e = function () {
    var n, e;return (e = new t(71, 2), n = new t(400, 5), new t(1000, 0).div(n.div(e)).endResult());
  }, i = function () {
    var n, e, r;return (e = new t(632.8, 0), n = new t(13.4, 0.5), r = n.apply(function (t) {
      return Math.sin(t * (Math.PI / 180));
    }), e.div(r).scalar(0.001).endResult());
  }, l = function (t) {
    return Math.sin(t * (Math.PI / 180));
  }, d = function (t) {
    return Math.cos(t * (Math.PI / 180));
  }, p = function (t) {
    return Math.tan(t * (Math.PI / 180));
  }, module.exports = { ErrorInterval: t, aufg4: o, aufg6: a, aufg8: u, aufg9: s, aufg10: n, aufg11_example: r, aufg11: e, aufg12: i, sin: l, cos: d, tan: p };
}).call(undefined);

},{}]},{},[1]);
