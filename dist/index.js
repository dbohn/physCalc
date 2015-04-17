(function() {
  var connectList, convertFound, error, errorContainer, errorElem, errorInfo, form, median, parser, parsertools, radius, relError, result, resultContainer, stringifyItem;

  parser = require('./parser');

  parsertools = require('./parsertools');

  form = document.querySelector('form[name=calculator_input]');

  resultContainer = document.querySelector('.result_container');

  errorContainer = document.querySelector('.error_container');

  result = resultContainer.querySelector('.result');

  errorElem = errorContainer.querySelector('.error');

  errorInfo = errorContainer.querySelector('.infotext');

  median = result.querySelector('.median');

  radius = result.querySelector('.radius');

  relError = result.querySelector('.rel_error');

  form.addEventListener('submit', function(ev) {
    var desc, err, query, resError;
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
      if (err instanceof parser.SyntaxError) {
        desc = 'Es wurde ' + connectList(err.expected) + ' erwartet. Gefunden wurde aber ' + convertFound(err.found) + '.';
        return error('Der Ausdruck enthält einen syntaktische Fehler an Position ' + err.column + '!', desc);
      } else if (err === 'Exponent must not have error') {
        return error('Der absolute Fehler des Exponenten muss 0 sein!');
      } else {
        return error('Ein unbekannter Fehler ist aufgetreten!');
      }
    }
  });

  form[0].addEventListener('change', function(ev) {
    form.classList.remove('has-error');
    form.classList.remove('has-success');
    errorContainer.classList.add('hide');
    return resultContainer.classList.add('hide');
  });

  convertFound = function(found) {
    if (found === null) {
      return 'nichts';
    } else {
      return '"' + found + '"';
    }
  };

  connectList = function(list) {
    if (list.length === 1) {
      return stringifyItem(list[0]);
    }
    return list.slice(0, list.length - 1).map(stringifyItem).join(", ") + ' oder ' + stringifyItem(list[list.length - 1]);
  };

  stringifyItem = function(item) {
    if (item.type === 'end') {
      return 'das Eingabeende';
    } else {
      return item.description;
    }
  };

  error = function(msg) {
    form.classList.add('has-error');
    form.classList.remove('has-success');
    errorContainer.classList.remove('hide');
    errorElem.innerHTML = msg;
    errorInfo.innerHTML = '';
    if (arguments.length === 2) {
      return errorInfo.innerHTML = arguments[1];
    }
  };

}).call(this);

//# sourceMappingURL=index.js.map