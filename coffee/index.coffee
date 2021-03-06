parser = require('./parser')
parsertools = require('./parsertools')
# jquery = require('../bower_components/jquery/dist/jquery')

form = document.querySelector('form[name=calculator_input]')
resultContainer = document.querySelector('.result_container')
errorContainer = document.querySelector('.error_container')
result = resultContainer.querySelector('.result')
errorElem = errorContainer.querySelector('.error')
errorInfo = errorContainer.querySelector('.infotext')
median = result.querySelector('.median')
radius = result.querySelector('.radius')
relError = result.querySelector('.rel_error')

form.addEventListener('submit', (ev) ->
	ev.preventDefault()
	query = form[0].value.trim()
	if query is '' then return
	try
		resError = parser.parse(query)
		resError = parsertools.convVal(resError)
		resultContainer.classList.remove('hide')
		form.classList.add('has-success')
		median.innerHTML = resError.getMedian()
		radius.innerHTML = resError.getRadius()
		relError.innerHTML = resError.relativeError()
	catch err
		console.log(err)
		if err instanceof parser.SyntaxError
			desc = 'Es wurde ' + connectList(err.expected) + ' erwartet. Gefunden wurde aber ' + convertFound(err.found) + '.'
			error('Der Ausdruck enthält einen syntaktische Fehler an Position ' + err.column + '!', desc)
		else if err == 'Exponent must not have error'
			error('Der absolute Fehler des Exponenten muss 0 sein!')
		else
			error('Ein unbekannter Fehler ist aufgetreten!')
)

form[0].addEventListener('change', (ev) ->
	form.classList.remove('has-error')
	form.classList.remove('has-success')
	errorContainer.classList.add('hide')
	resultContainer.classList.add('hide')
)

convertFound = (found) ->
	if found == null then 'nichts' else '"' + found + '"'

connectList = (list) ->
	if (list.length == 1) then return stringifyItem(list[0])
	list.slice(0, list.length - 1).map(stringifyItem).join(", ") + ' oder ' + stringifyItem(list[list.length - 1])

stringifyItem = (item) ->
	if item.type == 'end' then 'das Eingabeende' else item.description

error = (msg) ->
	form.classList.add('has-error')
	form.classList.remove('has-success')
	errorContainer.classList.remove('hide')
	errorElem.innerHTML = msg
	errorInfo.innerHTML = ''
	if arguments.length == 2
		errorInfo.innerHTML = arguments[1]