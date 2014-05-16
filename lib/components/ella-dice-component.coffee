`import { Component, get, set, computed, observer, typeOf } from 'ember'`
`import EllaCubeComponent from './ella-cube-component'`

EllaDiceComponent =
  classNameBindings: ['rolling']

  rolls: 0

  rolling: false

  onRoll: null

  random: ->
    @randomInt(0, get(@, 'faces.length') - 1)

  randomInt: (min, max) ->
    Math.floor(Math.random() * (max - min + 1)) + min

  defaultAction: ->
    @incrementProperty('rolls') unless get(@, 'rolling')

  rollsDidChange: observer(->
    set(@, 'rolling', true)
    wait = @randomInt(100, 500)

    Ember.run.later(=>
      set(@, 'rolling', false)
      set(@, 'show', @random())
      Ember.run.next => @sendAction('onRoll') if typeOf(get(@, 'onRoll')) is 'string'
    , wait)
  , 'rolls')

`export default EllaCubeComponent.extend(EllaDiceComponent)`
