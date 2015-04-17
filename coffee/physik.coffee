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

  # Construct a new error interval (a +/- Delta a)
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
    da = (@radius + o.radius).toPrecision(2)

    new ErrorInterval(a.toFixed(decimalPlaces(da)), da)

  # Subtracts another interval
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  sub: (o) ->
    a = @median - o.median
    da = (@radius + o.radius).toPrecision(2)

    new ErrorInterval(a.toFixed(decimalPlaces(da)), da)

  # Multiplies with another interval
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  mult: (o) ->
    a = @median * o.median
    rel = (@.relativeError() + o.relativeError()).toPrecision(2)
    da = (rel * a).toPrecision(2)

    new ErrorInterval(a.toFixed(decimalPlaces(da)), da)

  # Divides by another interval
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  div: (o) ->
    a = @median / o.median
    rel = (@.relativeError() + o.relativeError()).toPrecision(2)
    da = (rel * a).toPrecision(2)

    new ErrorInterval(a.toFixed(decimalPlaces(da)), da)

  # Calculates the power
  #
  # @param [Float] exp the exponent
  # @return [ErrorInterval] result
  pow: (exp) ->
    a = Math.pow(@median, exp)
    rel = (@.relativeError() * Math.abs(exp)).toPrecision(2)
    da = (rel * a).toPrecision(2)

    new ErrorInterval(a.toFixed(decimalPlaces(da)), da)

  # Multiplies the interval with a scalar
  #
  # @param [Number] c the scalar
  # @return [ErrorInterval] result
  scalar: (c) ->
    @mult new ErrorInterval(c,0)

  # Applys a function @code{f} to the interval.
  # The function has to accept one parameter and
  # has to return a numerical value.
  #
  # @param [Function] f the function
  # @return [ErrorInterval] result
  apply: (f) ->
    k = f(@median)

    dk = Math.abs(f((@median + @radius)) - k).toPrecision(2)

    new ErrorInterval(k.toFixed(decimalPlaces(dk)), dk)

  # Create an error interval based on this interval
  # with the precision of end results.
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  endResult: ->
    resRadius = significantDigitsCeiling(@radius, 1)
    resZentralwert = @median.toFixed  (decimalPlaces resRadius)

    new ErrorInterval(resZentralwert, resRadius)

  # @return [String]
  toString: ->
    @median+' '+@radius



aufg4 = ->
  new ErrorInterval(52.684063, 0.0176228).endResult()

aufg6 = ->
  new ErrorInterval(34.7, 7.6).relativeError()

aufg8 = ->
  l1 = new ErrorInterval(200, 0.5)
  l2 = new ErrorInterval(200, 0.5)
  l3 = new ErrorInterval(104.7, 1.5)
  l1.add(l2).add(l3).endResult()

aufg9 = ->
  s = new ErrorInterval(100,10)
  t = new ErrorInterval(11.2,0.3)
  s.div(t).scalar(3.6).endResult()

aufg10 = ->
  r = new ErrorInterval(1.000,0.002)
  t0 = new ErrorInterval(20.00,0.11)
  t1 = new ErrorInterval(2.4,0.2)
  t0.div(t1).pow(0.5).mult(r).endResult()


aufg11_example = ->
  a = new ErrorInterval(62.4,0.2)
  b = new ErrorInterval(11.2,0.2)
  c = new ErrorInterval(9.2,0.2)
  a.sub(b).div(c).endResult()


aufg11 = ->
  t = new ErrorInterval(71, 2)
  s = new ErrorInterval(400, 5)
  new ErrorInterval(1000,0).div(s.div(t)).endResult()

aufg12 = ->
  mu = new ErrorInterval(632.8, 0)
  alpha = new ErrorInterval(13.4, 0.5)
  sinAlpha = alpha.apply((val) -> Math.sin(val * (Math.PI/180)));
  mu.div(sinAlpha).scalar(0.001).endResult()

sin = (v) ->
  Math.sin(v * (Math.PI / 180))

cos = (v) ->
  Math.cos(v * (Math.PI / 180))

tan = (v) ->
  Math.tan(v * (Math.PI / 180))

module.exports = {ErrorInterval, aufg4, aufg6, aufg8, aufg9, aufg10, aufg11_example, aufg11, aufg12, sin, cos, tan}