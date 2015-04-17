(function() {
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

  form.addEventListener('submit', function(ev) {
    var err, query, resError;
    ev.preventDefault();
    query = form[0].value.trim();
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

  form[0].addEventListener('change', function(ev) {
    form.classList.remove('has-error');
    form.classList.remove('has-success');
    errorContainer.classList.add('hide');
    return resultContainer.classList.add('hide');
  });

  error = function(msg) {
    form.classList.add('has-error');
    form.classList.remove('has-success');
    errorContainer.classList.remove('hide');
    return errorElem.innerHTML = msg;
  };

}).call(this);

//# sourceMappingURL=index.js.map