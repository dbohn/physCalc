(function() {
  var form, median, parser, radius, relError, result, resultContainer;

  parser = require('./parser');

  form = document.querySelector('form[name=calculator_input]');

  resultContainer = document.querySelector('.result_container');

  result = resultContainer.querySelector('.result');

  median = result.querySelector('.median');

  radius = result.querySelector('.radius');

  relError = result.querySelector('.rel_error');

  form.addEventListener('submit', function(ev) {
    var query, resError;
    ev.preventDefault();
    query = form[0].value;
    resError = parser.parse(query);
    resultContainer.style.display = 'block';
    median.innerHTML = resError.median;
    radius.innerHTML = resError.radius;
    relError.innerHTML = resError.relativeError();
    return console.log(parser.parse(query));
  });

}).call(this);

//# sourceMappingURL=index.js.map