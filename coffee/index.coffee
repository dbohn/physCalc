parser = require('./parser')
# jquery = require('../bower_components/jquery/dist/jquery')

form = document.querySelector('form[name=calculator_input]')
resultContainer = document.querySelector('.result_container')
result = resultContainer.querySelector('.result')
median = result.querySelector('.median')
radius = result.querySelector('.radius')
relError = result.querySelector('.rel_error')

form.addEventListener('submit', (ev) ->
	ev.preventDefault()
	query = form[0].value
	resError = parser.parse(query)
	resultContainer.style.display = 'block'
	median.innerHTML = resError.median
	radius.innerHTML = resError.radius
	relError.innerHTML = resError.relativeError()
	console.log(parser.parse(query))
)