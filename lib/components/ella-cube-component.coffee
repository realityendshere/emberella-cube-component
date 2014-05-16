`import { Component, get, set, computed, observer, typeOf } from 'ember'`
`import StyleBindingsMixin from '../mixins/style_bindings'`

###
@module emberella
@submodule emberella-components
###

EllaCubeComponent =
  tagName: 'ella-cube'

  attributeBindings: ['data-show-face']

  styleBindings: ['size:width', 'size:height', 'perspective', '-webkit-perspective']

  defaultSize: 200

  layout: Ember.Handlebars.compile '<ella-cube>{{yield}}</ella-cube>'

  show: 0

  faces: null

  'data-show-face': computed.alias 'show'

  size: computed.defaultTo 'defaultSize'

  perspective: computed(->
    get(@, 'size') * 6
  ).property 'size'

  '-webkit-perspective': computed.readOnly 'perspective'

  click: (e) ->
    set(@, 'show', 0) if @incrementProperty('show') >= get(@, 'faces.length')

  registerCubeFace: (childView) ->
    get(@, 'faces').pushObject(childView)

  unregisterCubeFace: (childView) ->
    get(@, 'faces').removeObject(childView)

  setupFaces: Ember.on 'init', ->
    set(@, 'faces', Ember.A()) unless typeOf(get(@, 'faces')) is 'array'

  valueDidChange: observer(->
    faces = get @, 'faces'
    currentFace = faces.findBy('value', get(@, 'value'))
    set(@, 'show', faces.indexOf(currentFace)) if currentFace?
  , 'value', 'faces.@each.value')

  showDidChange: observer(->
    faces = get @, 'faces'
    currentFace = faces[get @, 'show']
    set(@, 'value', get(currentFace, 'value')) if currentFace?
  , 'show')

`export default Component.extend(StyleBindingsMixin, EllaCubeComponent)`
