`import { Component, get, set, computed, observer, typeOf } from 'ember'`
`import EllaCubeComponent from './ella-cube-component'`

###
  The `EllaDiceComponent` extends `EllaCubeComponent` with functionality
  suitable for digitally recreating a 6-sided die.

  @example
    {{#ella-dice}}
      {{#ella-cube-face value=1 classNames='one'}}
        <div class="pip">&bull;</div>
      {{/ella-cube-face}}
      {{#ella-cube-face value=6 classNames='six'}}
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
      {{/ella-cube-face}}
      {{#ella-cube-face value=3 classNames="three"}}
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
      {{/ella-cube-face}}
      {{#ella-cube-face value=4 classNames="four"}}
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
      {{/ella-cube-face}}
      {{#ella-cube-face value=5 classNames="five"}}
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
      {{/ella-cube-face}}
      {{#ella-cube-face value=2 classNames="two"}}
        <div class="pip">&bull;</div>
        <div class="pip">&bull;</div>
      {{/ella-cube-face}}
    {{/ella-dice}}

  @class EllaDiceComponent
  @namespace Emberella
  @extends EllaCubeComponent
###

EllaDiceComponent =
  ###
    Class names to be added when the associated property is `true`.

    @property classNameBindings
    @type Array
    @default ['rolling']
  ###
  classNameBindings: ['rolling']

  ###
    The named action to call upon the completion of rolling the dice.

    @property onRoll
    @type String
  ###
  onRoll: null

  ###
    The current state of this die instance.

    @property rolling
    @type Boolean
    @default false
  ###
  rolling: false

  ###
    The number of times this die instance has been rolled.

    @property rolls
    @type Integer
    @default 0
  ###
  rolls: 0

  ###
    The default behavior of this die component. (Increments "rolls" by 1)

    @method defaultAction
  ###
  defaultAction: ->
    @incrementProperty('rolls') unless get(@, 'rolling')

  ###
    Pick a random integer between 0 and the number of registered cube faces.

    @method randomFace
    @return Integer
  ###
  randomFace: ->
    @randomInt(0, get(@, 'faces.length') - 1)

  ###
    Pick a random integer between min and max.

    @method randomInt
    @param Integer The minimum possible value (inclusive)
    @param Integer The maximum possible value (exclusive)
    @return Integer
  ###
  randomInt: (min, max) ->
    Math.floor(Math.random() * (max - min + 1)) + min

  rollsDidChange: observer(->
    set(@, 'rolling', true)
    wait = @randomInt(100, 500)

    Ember.run.later(=>
      set(@, 'rolling', false)
      set(@, 'show', @randomFace())
      Ember.run.next => @sendAction('onRoll') if typeOf(get(@, 'onRoll')) is 'string'
    , wait)
  , 'rolls')

`export default EllaCubeComponent.extend(EllaDiceComponent)`
