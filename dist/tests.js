
/*
 * Tests for error calculation
 * @author Luca Keidel <info@lucakeidel.de>
 */

(function() {
  var Physik, aufg10, aufg11, aufg11_example, aufg12, aufg12_script, aufg4, aufg6, aufg8, aufg9;

  Physik = require('./physik');

  aufg4 = function() {
    return new Physik.ErrorInterval(52.684063, 0.0176228).endResult();
  };

  aufg6 = function() {
    return new Physik.ErrorInterval(34.7, 7.6).relativeError();
  };

  aufg8 = function() {
    var l1, l2, l3;
    l1 = new Physik.ErrorInterval(200, 0.5);
    l2 = new Physik.ErrorInterval(200, 0.5);
    l3 = new Physik.ErrorInterval(104.7, 1.5);
    return l1.add(l2).add(l3).endResult();
  };

  aufg9 = function() {
    var s, t;
    s = new Physik.ErrorInterval(100, 10);
    t = new Physik.ErrorInterval(11.2, 0.3);
    return s.div(t).scalar(3.6).endResult();
  };

  aufg10 = function() {
    var r, t0, t1;
    r = new Physik.ErrorInterval(1.000, 0.002);
    t0 = new Physik.ErrorInterval(20.00, 0.11);
    t1 = new Physik.ErrorInterval(2.4, 0.2);
    return t0.div(t1).pow(0.5).mult(r).endResult();
  };

  aufg11_example = function() {
    var a, b, c;
    a = new Physik.ErrorInterval(62.4, 0.2);
    b = new Physik.ErrorInterval(11.2, 0.2);
    c = new Physik.ErrorInterval(9.2, 0.2);
    return a.sub(b).div(c).endResult();
  };

  aufg11 = function() {
    var s, t;
    t = new Physik.ErrorInterval(71, 2);
    s = new Physik.ErrorInterval(400, 5);
    return new Physik.ErrorInterval(1000, 0).div(s.div(t)).endResult();
  };

  aufg12 = function() {
    var alpha, mu, sinAlpha;
    mu = new Physik.ErrorInterval(632.8, 0);
    alpha = new Physik.ErrorInterval(13.4, 0.5);
    sinAlpha = alpha.apply(Physik.sin);
    return mu.div(sinAlpha).scalar(0.001).endResult();
  };

  aufg12_script = function() {
    var alpha, mu, sinAlpha;
    mu = new Physik.ErrorInterval(546.1, 0.1);
    alpha = new Physik.ErrorInterval(19.13, 0.04);
    sinAlpha = alpha.apply(Physik.sin);
    return mu.div(sinAlpha).scalar(0.001).endResult();
  };

  module.exports = {
    aufg4: aufg4,
    aufg6: aufg6,
    aufg8: aufg8,
    aufg9: aufg9,
    aufg10: aufg10,
    aufg11_example: aufg11_example,
    aufg11: aufg11,
    aufg12: aufg12,
    aufg12_script: aufg12_script
  };

}).call(this);

//# sourceMappingURL=tests.js.map