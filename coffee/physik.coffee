# Calculcation of errors
# @author Luca Keidel <info@lucakeidel.de>

# Returns the number of digits after the comma
#
# @param [Float] num the number
#
decimalPlaces = (num) ->
  match = (''+num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/)
  return 0 if not match
  Math.max(0, (if match[1] then match[1].length else 0) - (if match[2] then +match[2] else 0))

# Math.log10
log10 = Math.log10 or (x) ->
  Math.log(x) / Math.LN10

# Get the significant digits of a float.
# Contrary to @code{toPrecision} this function ceils the result
# Based on http://stackoverflow.com/a/1581007
#
# @param [Float] num the number
# @param [Integer] n amount of significant digits desired
#
significantDigitsCeiling = (num, n) ->

  if num is 0 then return 0
 
  d = Math.ceil(log10(if num < 0 then -num else num))
  power = n - Math.floor(d)

  magnitude = Math.pow(10, power)
  shifted = Math.ceil(num * magnitude)
  shifted / magnitude


# Represents an error interval
class ErrorInterval

  # Constructs a new error interval (a +/- Delta a)
  #
  # @param [Float] median of the interval (a)
  # @param [Float] radius of the interval (Delta a)
  #
  constructor: (median, radius) ->
    @median = parseFloat(median)
    @radius = parseFloat(radius)


  # returns the relative Error
  # @return [Float] relative error
  #
  relativeError: -> 
    parseFloat (@radius / @median).toPrecision(2)

  # Adds another interval
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  add: (o) ->
    a = @median + o.median
    da = @radius + o.radius
    new ErrorInterval(a, da).intermediateResult()

  # Subtracts another interval
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  sub: (o) ->
    a = @median - o.median
    da = @radius + o.radius
    new ErrorInterval(a, da).intermediateResult()

  # Multiplies with another interval
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  mult: (o) ->
    a = @median * o.median
    rel = (@.relativeError() + o.relativeError()).toPrecision(2)
    da = (rel * a).toPrecision(2)

    new ErrorInterval(a, da).intermediateResult()

  # Divides by another interval
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  div: (o) ->
    a = @median / o.median
    rel = (@.relativeError() + o.relativeError()).toPrecision(2)
    da = (rel * a).toPrecision(2)

    new ErrorInterval(a, da).intermediateResult()

  # Calculates the power
  #
  # @param [Float] exp the exponent
  # @return [ErrorInterval] result
  pow: (exp) ->
    a = Math.pow(@median, exp)
    rel = (@.relativeError() * Math.abs(exp)).toPrecision(2)
    da = (rel * a).toPrecision(2)

    new ErrorInterval(a, da).intermediateResult()

  # Multiplies the interval with a scalar
  #
  # @param [Number] c the scalar
  # @return [ErrorInterval] result
  scalar: (c) ->
    (@mult new ErrorInterval(c,0)).intermediateResult()

  # Applys a function @code{f} to the interval.
  # The function has to accept one parameter and
  # has to return a numerical value.
  #
  # @param [Function] f the function
  # @return [ErrorInterval] result
  apply: (f) ->
    k = f(@median)
    dk = Math.abs(f((@median + @radius)) - k)
    new ErrorInterval(k, dk).intermediateResult()

  # Create an error interval based on this interval
  # with the precision of end results.
  #
  # @return [ErrorInterval] result
  endResult: ->
    resRadius = significantDigitsCeiling(@radius, 1)
    resMedian = @median.toFixed  (decimalPlaces resRadius)

    new ErrorInterval(resMedian, resRadius)

  # Create an error interval based on this interval
  # with the precision of intermediate results.
  #
  # @return [ErrorInterval] result
  intermediateResult: ->
    resRadius = @radius.toPrecision(2)
    resMedian = @median.toFixed  (decimalPlaces resRadius)
  
    new ErrorInterval(resMedian, resRadius)    

  # @return [String]
  toString: ->
    @median+' '+@radius

  # Returns the median with the same number of digits after the comma 
  # as the radius
  #
  # @return [String]
  getMedian: ->
    @median.toFixed(decimalPlaces(@radius))

  # Returns the radius
  #
  # @return [String]
  getRadius: ->
    (''+@radius)


# Creates an error interval based on an
# analog measurement
#
# @param [ErrorInterval] val the datum
# @param [Float] k the quality
# @param [Float] range range
# 
# @return [ErrorInterval] result
createFromAnalogMeasurement = (val, k, range) ->
  dk = (k / 100) * range
  da = val.radius
  new ErrorInterval(val.median, (dk+da)).intermediateResult()

# Creates an error interval based on an
# digital measurement
#
# @param [ErrorInterval] val the datum
# @param [Float] p 
# @param [Integer] d
# 
# @return [ErrorInterval] result
createFromDigitalMeasurement = (val, p, d) ->
  da = ((p / 100) * val.median)
  da += d * Math.pow(10, -decimalPlaces val.median)  
  new ErrorInterval(val.median, da).intermediateResult()

# Sinus function which can be used in 
# the ErrorInterval.apply() function
#
# @param [Float] v Value
# 
# @return [Float] result
sin = (v) ->
  Math.sin(v * (Math.PI / 180))

# Cosinus function which can be used in 
# the ErrorInterval.apply() function
#
# @param [Float] v Value
# 
# @return [Float] result
cos = (v) ->
  Math.cos(v * (Math.PI / 180))

# Tangens function which can be used in 
# the ErrorInterval.apply() function
#
# @param [Float] v Value
# 
# @return [Float] result
tan = (v) ->
  Math.tan(v * (Math.PI / 180))

module.exports = {ErrorInterval, sin, cos, tan, createFromAnalogMeasurement, createFromDigitalMeasurement}