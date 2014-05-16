`import { Component, get, set, computed } from 'ember'`
`import StyleBindingsMixin from '../mixins/style_bindings'`

###
@module emberella
@submodule emberella-components
###

EllaCubeFaceComponent =
  tagName: 'ella-cube-face'

  styleBindings: ['-webkit-transform', 'transform']

  layout: Ember.Handlebars.compile '
    <div>
      {{#if template}}
        {{yield}}
      {{else}}
        {{content}}
      {{/if}}
    </div>
  '

  faces: computed.readOnly 'parentView.faces'

  size: computed.readOnly 'parentView.size'

  content: computed.defaultTo 'value'

  faceIndex: computed(->
    get(@, 'faces').indexOf @
  ).property('faces', 'faces.[]', 'faces.@each.value')

  transform: computed(->
    'scale3d(1, 1, 1) ' + get(@, 'rotation') + ' translateZ(' + (get(@, 'size')/2) + 'px)'
  ).property('rotation', 'size')

  '-webkit-transform': computed.readOnly 'transform'

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

  registerWithParent: Ember.on 'didInsertElement', ->
    get(@, 'parentView').registerCubeFace @

  unregisterWithParent: Ember.on 'willDestroyElement', ->
    get(@, 'parentView').unregisterCubeFace @

`export default Component.extend(StyleBindingsMixin, EllaCubeFaceComponent)`
