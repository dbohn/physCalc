# Calculcation of errors
# @author Luca Keidel <info@lucakeidel.de>

index = 0
ids = 'abcdefghijklmnopqrstuvwxyz'
used = []

generateID = ->
  if index >= ids.length
   m = index++
   return ids[(m % ids.length)] + Math.floor (m / ids.length)
  return ids[index++]

getNewID = (c) ->

  if arguments.length > 0
    used.push(c)
    c
  else
    candidate = generateID()
    while used.indexOf(candidate) >= 0
      candidate = generateID()
    used.push(candidate)
    if arguments.length > 0
      candidate+='\\['+c+'\\]'
    candidate



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

resetIDGenerator = ->
  index = 0
  used = []

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
    
    @calculated = false
    if arguments.length >= 3
      @id = getNewID(arguments[2])
      if arguments.length == 4 and arguments[3]
        @calculated = true
    else
      @id = getNewID()
    @steps = []

    @unparsedMedian = median
    @unparsedRadius = radius

  # returns the relative Error
  # @return [Float] relative error
  #
  relativeError: -> 
    Math.abs parseFloat (@radius / @median).toPrecision(2)

  rawRelativeError: ->
    Math.abs parseFloat (@radius / @median)

  # Adds another interval
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  add: (o) ->
    a = @median + o.median
    da = @radius + o.radius

    res = new ErrorInterval(a, da, @.getID()+'+'+o.getID(), true)
    res.steps = @.steps.concat(o.steps)
    res.steps.push('$\\Delta '+res.getID()+' = \\Delta '+@.getID()+' + '+'\\Delta '+o.getID()+' = '+res.getRadius()+'$')
    res

  # Subtracts another interval
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  sub: (o) ->
    a = @median - o.median
    da = @radius + o.radius

    res = new ErrorInterval(a, da,  @.getID()+'-'+o.getID() ,true)
    res.steps = @.steps.concat(o.steps)
    res.steps.push('$\\Delta '+res.getID()+' = \\Delta '+@.getID()+' + '+'\\Delta '+o.getID()+' = '+res.getRadius()+'$')
    res


  # Multiplies with another interval
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  mult: (o) ->
    a = @median * o.median
    rel = @.rawRelativeError() + o.rawRelativeError()
    da = rel * a

    res = new ErrorInterval(a, da, @.getID()+' \\cdot '+o.getID(), true)
    res.steps = @.steps.concat(o.steps)
    res.steps.push('$\\Delta '+res.getID()+' = \\left(\\delta '+@.getID()+' + \\delta '+o.getID()+'\\right) \\cdot '+@.getID()+' \\cdot '+o.getID()+' = '+res.getRadius()+'$')
    res


  # Divides by another interval
  #
  # @param [ErrorInterval] o the other interval
  # @return [ErrorInterval] result
  div: (o) ->
    a = @median / o.median
    rel = @.rawRelativeError() + o.rawRelativeError()
    da = rel * a

    res = new ErrorInterval(a, da, '\\frac{'+@.getID()+'}{'+o.getID()+'}', true)
    res.steps = @.steps.concat(o.steps)
    res.steps.push('$\\Delta '+res.getID()+' = \\left(\\delta '+@.getID()+' + \\delta '+o.getID()+'\\right) \\cdot \\left(\\frac{'+@.getID()+'}{'+o.getID()+'}\\right) = '+res.getRadius()+'$')
    res


  # Calculates the power
  #
  # @param [Float] exp the exponent
  # @return [ErrorInterval] result
  pow: (exp) ->
    a = Math.pow(@median, exp)
    rel = @.rawRelativeError() * Math.abs(exp)
    da = rel * a

    expID = exp
    if exp < 0 then expID = '\\left('+exp+'\\right)'

    res = new ErrorInterval(a, da, @.getID()+'^'+expID, true)
    res.steps = @.steps
    res.steps.push('$\\Delta '+res.getID()+' = \\left|'+exp+'\\right| \\cdot \\delta '+@.getID()+' \\cdot '+res.getID()+' = '+res.getRadius()+'$')
    res


  # Multiplies the interval with a scalar
  #
  # @param [Number] c the scalar
  # @return [ErrorInterval] result
  scalar: (c) ->
    (@mult new ErrorInterval(c,0))

  # Applys a function @code{f} to the interval.
  # The function has to accept one parameter and
  # has to return a numerical value.
  #
  # @param [Function] f the function
  # @return [ErrorInterval] result
  apply: (f, name) ->
    if arguments.length < 2
      name = getNewID()
    k = f(@median)
    dk = Math.abs(f((@median + @radius)) - k)
    res = new ErrorInterval(k, dk, '\\text{'+name+'} \\left('+@.getID()+'\\right)' ,true)
    res.steps = @.steps
    res.steps.push('$\\Delta '+res.getID()+' = \\left| \\text{'+name+'}\\left('+@.getID()+' + \\Delta '+@.getID()+'\\right) - \\text{'+name+'}\\left('+@.getID()+'\\right)\\right| = '+res.getRadius()+'$')
    res

  # Create an error interval based on this interval
  # with the precision of end results.
  #
  # @return [ErrorInterval] result
  endResult: ->
    resRadius = significantDigitsCeiling(@radius, 1)
    resMedian = @median.toFixed  (decimalPlaces resRadius)

    res = new EndResult(resMedian, resRadius, @.id, @.steps)
    res.steps = @.steps
    res


  # @return [String]
  toString: ->
    '\\left['+@.getMedian()+'\\pm'+@.getRadius()+'\\right]'

  getID: ->
    if @.calculated then '\\left('+@.id+'\\right)'
    else @.id

  # Returns the median with the same number of digits after the comma 
  # as the radius
  #
  # @return [String]
  getMedian: ->
    @median.toFixed(decimalPlaces(@.getRadius()))

  # Returns the radius
  #
  # @return [String]
  getRadius: ->
    (''+@radius.toPrecision(2))

class EndResult extends ErrorInterval

  constructor: (median, radius, id, steps) ->
    @median = parseFloat(median)
    @radius = parseFloat(radius)

    @id = id
    @calculated = true
    @steps = steps
    if @steps.length > 0
      @steps[@steps.length - 1] = @.steps[@.steps.length - 1].replace(/([^=\s]*)$/, @.getRadius()) + '$'
  
  getRadius: ->
    (''+@radius.toPrecision(1))


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
  new ErrorInterval(val.median, (dk+da))

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
  da += d * Math.pow(10, -decimalPlaces val.unparsedMedian) 

  if arguments.length >= 4
    new ErrorInterval(val.median, da, arguments[3])
  else
    new ErrorInterval(val.median, da)

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

module.exports = {ErrorInterval, log10, sin, cos, tan, createFromAnalogMeasurement, createFromDigitalMeasurement, resetIDGenerator}