###
# Glue code between Physik-Library and parser
# @author David Bohn <david.bohn@cancrisoft.net>
###

Physik = require('./physik');

variables = {};

# Adds two values, which should be either ErrorIntervals or numerical values
#
# @param [Float|Physik.ErrorInterval] Should be a ErrorInterval, otherwise it will be converted
# @param [Float|Physik.ErrorInterval] Should be a ErrorInterval, otherwise it will be converted
# @return [Physik.ErrorInterval] The sum of a and b
add = (a, b) ->
	a = convVal(a)
	b = convVal(b)
	a.add(b)

# Subtracts two values, which should be either ErrorIntervals or numerical values
#
# @param [Float|Physik.ErrorInterval] Should be a ErrorInterval, otherwise it will be converted
# @param [Float|Physik.ErrorInterval] Should be a ErrorInterval, otherwise it will be converted
# @return [Physik.ErrorInterval] The sum of a and b
sub = (a, b) ->
	a = convVal(a)
	b = convVal(b)
	a.sub(b)

# Mutliplies two values, which should be either ErrorIntervals or numerical values
#
# @param [Float|Physik.ErrorInterval] Should be a ErrorInterval, otherwise it will be converted
# @param [Float|Physik.ErrorInterval] Should be a ErrorInterval, otherwise it will be converted
# @return [Physik.ErrorInterval] The sum of a and b
mult = (a, b) ->
	a = convVal(a)
	b = convVal(b)
	a.mult(b)

# Divides a by b, which should be either ErrorIntervals or numerical values
#
# @param [Float|Physik.ErrorInterval] Should be a ErrorInterval, otherwise it will be converted
# @param [Float|Physik.ErrorInterval] Should be a ErrorInterval, otherwise it will be converted
# @return [Physik.ErrorInterval] The sum of a and b
div = (a, b) ->
	a = convVal(a)
	b = convVal(b)
	a.div(b)

# Calculates base to the power of exp
#
# @param [Float|Physik.ErrorInterval] Should be a ErrorInterval, otherwise it will be converted
# @param [Float|Physik.ErrorInterval] If it is an ErrorInterval, the radius *must* be 0
# @return [Physik.ErrorInterval] base^exp
pow = (base, exp) ->
	if exp instanceof Physik.ErrorInterval and exp.radius != 0 then throw 'Exponent must not have error'
	exp = if exp instanceof Physik.ErrorInterval then exp.median else exp
	base = convVal(base)
	base.pow(exp)

# If the given parameter is an ErrorInterval, a valid representation for a end result will be
# generated. Otherwise itself will be returned
#
# @param [Physik.ErrorInterval|Float] Formats an ErrorInterval according the rules
endResult = (a) ->
	if a instanceof Physik.ErrorInterval then a.endResult() else a

# Creates a new ErrorInterval
#
# @param [Float] The main value
# @param [Float] The error radius around the main value
create = (median, derivation) ->
	new Physik.ErrorInterval(median, derivation)

createNamed = (median, derivation, name) ->
	new Physik.ErrorInterval(median, derivation, name)

createFromDigital = (median, percentage, digit) ->
	if arguments.length >= 4
		return Physik.createFromDigitalMeasurement(convVal(median), Math.abs(percentage), Math.abs(digit), arguments[3])
	Physik.createFromDigitalMeasurement(convVal(median), Math.abs(percentage), Math.abs(digit))

createFromAnalogue = (measured, grade, interval) ->
	Physik.createFromAnalogMeasurement(convVal(measured), Math.abs(grade), Math.abs(interval))

applyOperator = (operator, operand) ->
	operator = operator.toLowerCase()
	operand = convVal(operand)
	# TODO: throw exception for unknown operand!
	switch operator
		when "sin" then operand = operand.apply(Physik.sin, "sin")
		when "cos" then operand = operand.apply(Physik.cos, "cos")
		when "tan" then operand = operand.apply(Physik.tan, "tan")
		when "asn" then operand = operand.apply(asin, "asin")
		when "asin" then operand = operand.apply(asin, "asin")
		when "acs" then operand = operand.apply(acos, "acos")
		when "acos" then operand = operand.apply(acos, "acos")
		when "atn" then operand = operand.apply(atan, "atan")
		when "atan" then operand = operand.apply(atan, "atan")
		when "ln" then operand = operand.apply(Math.log, "ln")
		when "log" then operand = operand.apply(Physik.log10, "log")
		else operand = operand
	operand

convVal = (a) ->
	if !(a instanceof Physik.ErrorInterval) then create(a, 0) else a

asin = (rad) ->
	Math.asin(rad)*(180/Math.PI)

acos = (rad) ->
	Math.acos(rad)*(180/Math.PI)

atan = (rad) ->
	Math.atan(rad)*(180/Math.PI)

resolveVariable = (variable) ->
	# console.log(variables)
	throw new UnknownIdentifierError variable if not variableExists variable
	variables[variable];
	# create(0, 0)

addVariable = (varname, errorInterval) ->
	variables[varname] = errorInterval

removeVariable = (varname) ->
	delete variables[varname]

variableExists = (varname) ->
	# console.log(varname, variables, variables.hasOwnProperty(varname))
	variables.hasOwnProperty(varname)

cleanVariables = () ->
	variables = {}

resetParser = () ->
	Physik.resetIDGenerator()

UnknownIdentifierError = (identifier) ->
	@name = 'UnknownIdentifierError'
	@identifier = identifier
	@stack = (new Error).stack

UnknownIdentifierError:: = new Error

module.exports = {
	add, sub, mult, div, pow,
	create, endResult, convVal, createNamed,
	applyOperator, createFromDigital,
	createFromAnalogue, resolveVariable,
	addVariable, removeVariable,
	resetParser, variableExists,
	UnknownIdentifierError
}
