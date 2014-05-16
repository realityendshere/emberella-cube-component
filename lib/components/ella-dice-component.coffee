`import { Component, get, set, computed, observer, typeOf } from 'ember'`
`import EllaCubeComponent from './ella-cube-component'`

EllaDiceComponent =
  rolls: 0

  random: ->
    Math.floor(Math.random() * get(@, 'faces.length'))

  defaultAction: ->
    @incrementProperty('rolls')

  rollsDidChange: observer(->
    Ember.run.next => set(@, 'show', @random())
  , 'rolls')

`export default EllaCubeComponent.extend(EllaDiceComponent)`
