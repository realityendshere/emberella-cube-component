`import { Component, get, set, computed, typeOf } from 'ember'`
`import StyleBindingsMixin from '../mixins/style_bindings'`

###
@module emberella
@submodule emberella-components
###

CUBE_FACE_LAYOUT = Ember.Handlebars.compile '
  <div>
    {{#if template}}
      {{yield}}
    {{else}}
      {{content}}
    {{/if}}
  </div>
'


###
  The `EllaCubeFaceComponent` is designed to operate as a child view of an
  `EllaCubeComponent`. It contains content and a value to display on the face
  of a rotatable cube.

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

  @class EllaCubeFaceComponent
  @namespace Emberella
  @extends Ember.Component
  @uses Ember.StyleBindingsMixin
###
EllaCubeFaceComponent =
  ###
    The type of element to render this view into. By default, cube faces will
    appear as `<ella-cube-face/>` elements.

    @property tagName
    @type String
    @default 'ella-cube-face'
  ###
  tagName: 'ella-cube-face'

  ###
    HTML attributes that should be bound to this object's properties.

    @property attributeBindings
    @type Array
    @default ['value', 'aria-selected']
  ###
  attributeBindings: ['value', 'aria-selected']

  ###
    Styles that should be bound to this object's properties.

    @property styleBindings
    @type Array
    @default ['-webkit-transform', 'transform']
  ###
  styleBindings: ['-webkit-transform', 'transform', 'display']

  ###
    The ARIA role for this component.

    TODO: Complete ARIA support.

    @property ariaRole
    @type String
    @default 'option'
  ###
  ariaRole: 'option'

  ###
    The templated layout for this component.

    @property layout
    @type Ember.Handlebars
    @readOnly
    @final
  ###
  layout: computed(-> CUBE_FACE_LAYOUT).readOnly()

  ###
    Alias for "faces" on parentView.

    @property faces
    @type Array
    @readOnly
  ###
  faces: computed.readOnly 'parentView.faces'

  ###
    Alias for "show" on parentView.

    @property show
    @type Integer
    @readOnly
  ###
  show: computed.readOnly 'parentView.show'

  ###
    Alias for "size" on parentView.

    @property size
    @type Integer
    @readOnly
  ###
  size: computed.readOnly 'parentView.size'

  ###
    Content to display. If no content, then defaults to "value".

    @property content
    @type String
  ###
  content: computed.defaultTo 'value'

  ###
    Computed index of this cube face among its sibling cube faces.

    @property faceIndex
    @type Integer
  ###
  faceIndex: computed(->
    get(@, 'faces')?.indexOf @
  ).property('faces', 'faces.[]', 'faces.@each.value')

  ###
    Computed selected state of this cube face.

    @property selected
    @type Boolean
  ###
  selected: computed(->
    get(@, 'show') is get(@, 'faceIndex')
  ).property('faceIndex', 'show')

  ###
    Computed "transform" style.

    @property transform
    @type String
  ###
  transform: computed(->
    'scale3d(1, 1, 1) ' + get(@, 'rotation') + ' translateZ(' + (get(@, 'size')/2) + 'px)'
  ).property('rotation', 'size')

  ###
    Computed "-webkit-transform" style.

    @property -webkit-transform
    @type String
    @readOnly
  ###
  '-webkit-transform': computed.readOnly 'transform'

  ###
    Computed "aria-selected" attribute.

    @property aria-selected
    @type String
    @readOnly
  ###
  'aria-selected': computed(->
    get(@, 'selected') + ''
  ).property('selected').readOnly()

  ###
    Computed "display" style.

    @property display
    @type String
  ###
  display: computed(->
    if get(@, 'isValidParentView') then null else 'none !important'
  ).property('isValidParentView').readOnly()

  ###
    Computed "rotation" style.

    @property rotation
    @type String
  ###
  rotation: computed(->
    styles = [
      'rotateY(0deg)'
      'rotateX(180deg)'
      'rotateY(90deg)'
      'rotateY(-90deg)'
      'rotateX(90deg)'
      'rotateX(-90deg)'
    ]
    styles[(get(@, 'faceIndex') % 6)] ? 'rotateY(0deg)'
  ).property('faceIndex', 'size')

  ###
    isValidParentView determines if the parentView is a valid container for
    cube face components.

    @property isValidParentView
    @type Boolean
  ###
  isValidParentView: computed(->
    !!(typeOf(get(@, 'parentView.registerCubeFace')) is 'function' and typeOf(get(@, 'parentView.unregisterCubeFace')) is 'function')
  ).property('parentView', 'parentView.registerCubeFace', 'parentView.unregisterCubeFace').readOnly()

  ###
    Register this cube face instance with its parent view.

    @method registerWithParent
  ###
  registerWithParent: Ember.on 'didInsertElement', ->
    registerCubeFace = get @, 'parentView.registerCubeFace'
    registerCubeFace.call(get(@, 'parentView'), @) if typeOf(registerCubeFace) is 'function'

  ###
    Unregister this cube face instance from its parent view.

    @method unregisterWithParent
  ###
  unregisterWithParent: Ember.on 'willDestroyElement', ->
    unregisterCubeFace = get @, 'parentView.unregisterCubeFace'
    unregisterCubeFace.call(get(@, 'parentView'), @) if typeOf(unregisterCubeFace) is 'function'

`export default Component.extend(StyleBindingsMixin, EllaCubeFaceComponent)`
