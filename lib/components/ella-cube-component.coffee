`import { Component, get, set, computed, observer, typeOf, isEmpty } from 'ember'`
`import StyleBindingsMixin from '../mixins/style_bindings'`

###
@module emberella
@submodule emberella-components
###

DEFAULT_CUBE_SIZE = 200
CUBE_LAYOUT = Ember.Handlebars.compile '<ella-cube>{{yield}}</ella-cube>'

###
  The `EllaCubeComponent` is an experimental, "visually interesting" UI
  component designed to illustrate the importantance of tools dedicated to the
  creation of small, sharable code libraries (e.g. components, mixins, and
  helpers).

  This component, working in tandem with the `EllaCubeFaceComponent`, displays
  a "3D" select menu with up to 6 visible options in the shape of a cube. Like
  a select menu, each cube face will display its designated value or custom
  content.

  @example
    {{#ella-cube}}
      {{ella-cube-face value='A'}}
      {{ella-cube-face value='B'}}
      {{ella-cube-face value='C'}}
      {{ella-cube-face value='D'}}
      {{ella-cube-face value='E'}}
      {{ella-cube-face value='F'}}
    {{/ella-cube}}

  @example
    {{#ella-cube value=value size=300}}
      {{#ella-cube-face value='1'}}One{{/ella-cube-face}}
      {{#ella-cube-face value='2'}}Two{{/ella-cube-face}}
      {{#ella-cube-face value='3'}}Three{{/ella-cube-face}}
      {{#ella-cube-face value='4'}}Four{{/ella-cube-face}}
      {{#ella-cube-face value='5'}}Five{{/ella-cube-face}}
      {{#ella-cube-face value='6'}}Six{{/ella-cube-face}}
    {{/ella-cube}}

  @class EllaCubeComponent
  @namespace Emberella
  @extends Ember.Component
  @uses Ember.StyleBindingsMixin
###

EllaCubeComponent =
  ###
    The type of element to render this view into. By default, cubes will appear
    as `<ella-cube/>` elements.

    @property tagName
    @type String
    @default 'ella-cube'
  ###
  tagName: 'ella-cube'

  ###
    HTML attributes that should be bound to this object's properties.

    @property attributeBindings
    @type Array
    @default ['data-show-face', '_disabled:disabled']
  ###
  attributeBindings: ['data-show-face', '_disabled:disabled']

  ###
    Styles that should be bound to this object's properties.

    @property styleBindings
    @type Array
    @default ['size:width', 'size:height', 'perspective', '-webkit-perspective']
  ###
  styleBindings: ['size:width', 'size:height', 'perspective', '-webkit-perspective']

  ###
    The ARIA role for this component.

    TODO: Complete ARIA support.

    @property ariaRole
    @type String
    @default 'select'
  ###
  ariaRole: 'select'

  ###
    The default size (width and height in px) of the cube.

    @property defaultSize
    @type Integer
    @default 200
    @readOnly
    @final
  ###
  defaultSize: computed(-> DEFAULT_CUBE_SIZE).readOnly()

  ###
    The templated layout for this component.

    @property layout
    @type Ember.Handlebars
    @default '<ella-cube>{{yield}}</ella-cube>'
    @readOnly
    @final
  ###
  layout: computed(-> CUBE_LAYOUT).readOnly()

  ###
    The array of child views (typically instances of `EllaCubeFaceComponent`)
    registered with this cube component.

    @property faces
    @type Array
    @default null
  ###
  disabled: false

  ###
    The array of child views (typically instances of `EllaCubeFaceComponent`)
    registered with this cube component.

    @property faces
    @type Array
    @default null
  ###
  faces: null

  ###
    Which face of the cube to show (typically an integer between
    0 and 5 inclusive).

    @property show
    @type Integer
    @default 0
  ###
  show: 0

  ###
    The size (width and height in px) of the cube.

    @property size
    @type Integer
    @default 200
  ###
  size: computed.defaultTo 'defaultSize'

  ###
    Computed HTML attribute.

    @property data-show-face
  ###
  'data-show-face': computed.readOnly 'show'

  ###
    @private

    The disabled attribute string.

    @property _disabled
    @readOnly
  ###
  _disabled: computed(->
    if get(@, 'disabled') then 'disabled' else null
  ).property('disabled').readOnly()

  ###
    The computed "perspective" style.

    @property perspective
    @type Integer
    @default 1200
  ###
  perspective: computed(->
    get(@, 'size') * 6
  ).property 'size'

  ###
    The computed "-webkit-perspective" style.

    @property -webkit-perspective
    @type Integer
    @default 1200
    @readOnly
  ###
  '-webkit-perspective': computed.readOnly 'perspective'

  ###
    The default behavior of this cube component. (Increments "show" by 1)

    @method defaultAction
  ###
  defaultAction: ->
    set(@, 'show', 0) if @incrementProperty('show') >= get(@, 'faces.length')

  ###
    Register a child cube face.

    @method registerCubeFace
    @param Ember.View A cube face to register
  ###
  registerCubeFace: (childView) ->
    faces = get(@, 'faces')
    set(@, 'value', get(childView, 'value')) if isEmpty(faces) and !get(@, 'value')?
    faces.pushObject(childView)

  ###
    Unregister a child cube face.

    @method unregisterCubeFace
    @param Ember.View A cube face to unregister
  ###
  unregisterCubeFace: (childView) ->
    get(@, 'faces').removeObject(childView)

  ###
    Handle click event.

    @event click
    @param Event
  ###
  click: (e) ->
    return if get @, 'disabled'
    if typeOf(get(@, 'action')) is 'string' then @sendAction() else @defaultAction()

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
