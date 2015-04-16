parser = require('./parser')
parsertools = require('./parsertools')
# jquery = require('../bower_components/jquery/dist/jquery')

form = document.querySelector('form[name=calculator_input]')
resultContainer = document.querySelector('.result_container')
errorContainer = document.querySelector('.error_container')
result = resultContainer.querySelector('.result')
errorElem = errorContainer.querySelector('.error')
median = result.querySelector('.median')
radius = result.querySelector('.radius')
relError = result.querySelector('.rel_error')

form.addEventListener('submit', (ev) ->
	ev.preventDefault()
	query = form[0].value
	try
		resError = parser.parse(query)
		resError = parsertools.convVal(resError)
		resultContainer.classList.remove('hide')
		median.innerHTML = resError.median
		radius.innerHTML = resError.radius
		relError.innerHTML = resError.relativeError()
	catch err
		if err == 'Exponent must not have error'
			error('Der absolute Fehler des Exponenten muss 0 sein!')
		else
			error('Der Ausdruck enthält syntaktische Fehler!')
)

form[0].addEventListener('change', (ev) ->
	form.classList.remove('has-error')
	errorContainer.classList.add('hide')
	resultContainer.classList.add('hide')
)

error = (msg) ->
	form.classList.add('has-error')
	errorContainer.classList.remove('hide')
	errorElem.innerHTML = msg