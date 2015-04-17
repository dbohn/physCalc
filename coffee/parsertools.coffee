###
# Glue code between Physik-Library and parser
# @author David Bohn <david.bohn@cancrisoft.net>
###

Physik = require('./physik');

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

applyOperator = (operator, operand) ->
	operator = operator.toLowerCase()
	operand = convVal(operand)
	# TODO: throw exception for unknown operand!
	switch operator
		when "sin" then operand = operand.apply(Physik.sin)
		when "cos" then operand = operand.apply(Physik.cos)
		when "tan" then operand = operand.apply(Physik.tan)
		else operand = operand
	console.log(operator)
	operand

convVal = (a) ->
	if !(a instanceof Physik.ErrorInterval) then create(a, 0) else a

module.exports = {add, sub, mult, div, pow, create, endResult, convVal, applyOperator}