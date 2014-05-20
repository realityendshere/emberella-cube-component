define("ella-cube/components/ella-cube-component",
  ["ember","../mixins/style_bindings","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var get = __dependency1__.get;
    var set = __dependency1__.set;
    var computed = __dependency1__.computed;
    var observer = __dependency1__.observer;
    var typeOf = __dependency1__.typeOf;
    var isEmpty = __dependency1__.isEmpty;
    var StyleBindingsMixin = __dependency2__["default"] || __dependency2__;

    /*
    @module emberella
    @submodule emberella-components
     */
    var CUBE_LAYOUT, DEFAULT_CUBE_SIZE, EllaCubeComponent;

    DEFAULT_CUBE_SIZE = 200;

    CUBE_LAYOUT = Ember.Handlebars.compile('<ella-cube>{{yield}}</ella-cube>');


    /*
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
     */

    EllaCubeComponent = {

      /*
        The type of element to render this view into. By default, cubes will appear
        as `<ella-cube/>` elements.
      
        @property tagName
        @type String
        @default 'ella-cube'
       */
      tagName: 'ella-cube',

      /*
        HTML attributes that should be bound to this object's properties.
      
        @property attributeBindings
        @type Array
        @default ['data-show-face', '_disabled:disabled']
       */
      attributeBindings: ['data-show-face', '_disabled:disabled'],

      /*
        Styles that should be bound to this object's properties.
      
        @property styleBindings
        @type Array
        @default ['size:width', 'size:height', 'perspective', '-webkit-perspective']
       */
      styleBindings: ['size:width', 'size:height', 'perspective', '-webkit-perspective'],

      /*
        The ARIA role for this component.
      
        TODO: Complete ARIA support.
      
        @property ariaRole
        @type String
        @default 'select'
       */
      ariaRole: 'select',

      /*
        The default size (width and height in px) of the cube.
      
        @property defaultSize
        @type Integer
        @default 200
        @readOnly
        @final
       */
      defaultSize: computed(function() {
        return DEFAULT_CUBE_SIZE;
      }).readOnly(),

      /*
        The templated layout for this component.
      
        @property layout
        @type Ember.Handlebars
        @default '<ella-cube>{{yield}}</ella-cube>'
        @readOnly
        @final
       */
      layout: computed(function() {
        return CUBE_LAYOUT;
      }).readOnly(),

      /*
        The array of child views (typically instances of `EllaCubeFaceComponent`)
        registered with this cube component.
      
        @property faces
        @type Array
        @default null
       */
      disabled: false,

      /*
        The array of child views (typically instances of `EllaCubeFaceComponent`)
        registered with this cube component.
      
        @property faces
        @type Array
        @default null
       */
      faces: null,

      /*
        Which face of the cube to show (typically an integer between
        0 and 5 inclusive).
      
        @property show
        @type Integer
        @default 0
       */
      show: 0,

      /*
        The size (width and height in px) of the cube.
      
        @property size
        @type Integer
        @default 200
       */
      size: computed.defaultTo('defaultSize'),

      /*
        Computed HTML attribute.
      
        @property data-show-face
       */
      'data-show-face': computed.readOnly('show'),

      /*
        @private
      
        The disabled attribute string.
      
        @property _disabled
        @readOnly
       */
      _disabled: computed(function() {
        if (get(this, 'disabled')) {
          return 'disabled';
        } else {
          return null;
        }
      }).property('disabled').readOnly(),

      /*
        The computed "perspective" style.
      
        @property perspective
        @type Integer
        @default 1200
       */
      perspective: computed(function() {
        return get(this, 'size') * 6;
      }).property('size'),

      /*
        The computed "-webkit-perspective" style.
      
        @property -webkit-perspective
        @type Integer
        @default 1200
        @readOnly
       */
      '-webkit-perspective': computed.readOnly('perspective'),

      /*
        The default behavior of this cube component. (Increments "show" by 1)
      
        @method defaultAction
       */
      defaultAction: function() {
        if (this.incrementProperty('show') >= get(this, 'faces.length')) {
          return set(this, 'show', 0);
        }
      },

      /*
        Register a child cube face.
      
        @method registerCubeFace
        @param Ember.View A cube face to register
       */
      registerCubeFace: function(childView) {
        var faces;
        faces = get(this, 'faces');
        if (isEmpty(faces) && (get(this, 'value') == null)) {
          set(this, 'value', get(childView, 'value'));
        }
        return faces.pushObject(childView);
      },

      /*
        Unregister a child cube face.
      
        @method unregisterCubeFace
        @param Ember.View A cube face to unregister
       */
      unregisterCubeFace: function(childView) {
        return get(this, 'faces').removeObject(childView);
      },

      /*
        Handle click event.
      
        @event click
        @param Event
       */
      click: function(e) {
        if (get(this, 'disabled')) {
          return;
        }
        if (typeOf(get(this, 'action')) === 'string') {
          return this.sendAction();
        } else {
          return this.defaultAction();
        }
      },
      setupFaces: Ember.on('init', function() {
        if (typeOf(get(this, 'faces')) !== 'array') {
          return set(this, 'faces', Ember.A());
        }
      }),
      valueDidChange: observer(function() {
        var currentFace, faces;
        faces = get(this, 'faces');
        currentFace = faces.findBy('value', get(this, 'value'));
        if (currentFace != null) {
          return set(this, 'show', faces.indexOf(currentFace));
        }
      }, 'value', 'faces.@each.value'),
      showDidChange: observer(function() {
        var currentFace, faces;
        faces = get(this, 'faces');
        currentFace = faces[get(this, 'show')];
        if (currentFace != null) {
          return set(this, 'value', get(currentFace, 'value'));
        }
      }, 'show')
    };

    __exports__["default"] = Component.extend(StyleBindingsMixin, EllaCubeComponent);
  });
define("ella-cube/components/ella-cube-face-component",
  ["ember","../mixins/style_bindings","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var get = __dependency1__.get;
    var set = __dependency1__.set;
    var computed = __dependency1__.computed;
    var typeOf = __dependency1__.typeOf;
    var StyleBindingsMixin = __dependency2__["default"] || __dependency2__;

    /*
    @module emberella
    @submodule emberella-components
     */
    var CUBE_FACE_LAYOUT, EllaCubeFaceComponent;

    CUBE_FACE_LAYOUT = Ember.Handlebars.compile('<div> {{#if template}} {{yield}} {{else}} {{content}} {{/if}} </div>');


    /*
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
     */

    EllaCubeFaceComponent = {

      /*
        The type of element to render this view into. By default, cube faces will
        appear as `<ella-cube-face/>` elements.
      
        @property tagName
        @type String
        @default 'ella-cube-face'
       */
      tagName: 'ella-cube-face',

      /*
        HTML attributes that should be bound to this object's properties.
      
        @property attributeBindings
        @type Array
        @default ['value', 'aria-selected']
       */
      attributeBindings: ['value', 'aria-selected'],

      /*
        Styles that should be bound to this object's properties.
      
        @property styleBindings
        @type Array
        @default ['-webkit-transform', 'transform']
       */
      styleBindings: ['-webkit-transform', 'transform', 'display'],

      /*
        The ARIA role for this component.
      
        TODO: Complete ARIA support.
      
        @property ariaRole
        @type String
        @default 'option'
       */
      ariaRole: 'option',

      /*
        The templated layout for this component.
      
        @property layout
        @type Ember.Handlebars
        @readOnly
        @final
       */
      layout: computed(function() {
        return CUBE_FACE_LAYOUT;
      }).readOnly(),

      /*
        Alias for "faces" on parentView.
      
        @property faces
        @type Array
        @readOnly
       */
      faces: computed.readOnly('parentView.faces'),

      /*
        Alias for "show" on parentView.
      
        @property show
        @type Integer
        @readOnly
       */
      show: computed.readOnly('parentView.show'),

      /*
        Alias for "size" on parentView.
      
        @property size
        @type Integer
        @readOnly
       */
      size: computed.readOnly('parentView.size'),

      /*
        Content to display. If no content, then defaults to "value".
      
        @property content
        @type String
       */
      content: computed.defaultTo('value'),

      /*
        Computed index of this cube face among its sibling cube faces.
      
        @property faceIndex
        @type Integer
       */
      faceIndex: computed(function() {
        var _ref;
        return (_ref = get(this, 'faces')) != null ? _ref.indexOf(this) : void 0;
      }).property('faces', 'faces.[]', 'faces.@each.value'),

      /*
        Computed selected state of this cube face.
      
        @property selected
        @type Boolean
       */
      selected: computed(function() {
        return get(this, 'show') === get(this, 'faceIndex');
      }).property('faceIndex', 'show'),

      /*
        Computed "transform" style.
      
        @property transform
        @type String
       */
      transform: computed(function() {
        return 'scale3d(1, 1, 1) ' + get(this, 'rotation') + ' translateZ(' + (get(this, 'size') / 2) + 'px)';
      }).property('rotation', 'size'),

      /*
        Computed "-webkit-transform" style.
      
        @property -webkit-transform
        @type String
        @readOnly
       */
      '-webkit-transform': computed.readOnly('transform'),

      /*
        Computed "aria-selected" attribute.
      
        @property aria-selected
        @type String
        @readOnly
       */
      'aria-selected': computed(function() {
        return get(this, 'selected') + '';
      }).property('selected').readOnly(),

      /*
        Computed "display" style.
      
        @property display
        @type String
       */
      display: computed(function() {
        if (get(this, 'isValidParentView')) {
          return null;
        } else {
          return 'none !important';
        }
      }).property('isValidParentView').readOnly(),

      /*
        Computed "rotation" style.
      
        @property rotation
        @type String
       */
      rotation: computed(function() {
        var styles, _ref;
        styles = ['rotateY(0deg)', 'rotateX(180deg)', 'rotateY(90deg)', 'rotateY(-90deg)', 'rotateX(90deg)', 'rotateX(-90deg)'];
        return (_ref = styles[get(this, 'faceIndex') % 6]) != null ? _ref : 'rotateY(0deg)';
      }).property('faceIndex', 'size'),

      /*
        isValidParentView determines if the parentView is a valid container for
        cube face components.
      
        @property isValidParentView
        @type Boolean
       */
      isValidParentView: computed(function() {
        return !!(typeOf(get(this, 'parentView.registerCubeFace')) === 'function' && typeOf(get(this, 'parentView.unregisterCubeFace')) === 'function');
      }).property('parentView', 'parentView.registerCubeFace', 'parentView.unregisterCubeFace').readOnly(),

      /*
        Register this cube face instance with its parent view.
      
        @method registerWithParent
       */
      registerWithParent: Ember.on('didInsertElement', function() {
        var registerCubeFace;
        registerCubeFace = get(this, 'parentView.registerCubeFace');
        if (typeOf(registerCubeFace) === 'function') {
          return registerCubeFace.call(get(this, 'parentView'), this);
        }
      }),

      /*
        Unregister this cube face instance from its parent view.
      
        @method unregisterWithParent
       */
      unregisterWithParent: Ember.on('willDestroyElement', function() {
        var unregisterCubeFace;
        unregisterCubeFace = get(this, 'parentView.unregisterCubeFace');
        if (typeOf(unregisterCubeFace) === 'function') {
          return unregisterCubeFace.call(get(this, 'parentView'), this);
        }
      })
    };

    __exports__["default"] = Component.extend(StyleBindingsMixin, EllaCubeFaceComponent);
  });
define("ella-cube/components/ella-dice-component",
  ["ember","./ella-cube-component","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Component = __dependency1__.Component;
    var get = __dependency1__.get;
    var set = __dependency1__.set;
    var computed = __dependency1__.computed;
    var observer = __dependency1__.observer;
    var typeOf = __dependency1__.typeOf;
    var EllaCubeComponent = __dependency2__["default"] || __dependency2__;

    /*
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
     */
    var EllaDiceComponent;

    EllaDiceComponent = {

      /*
        Class names to be added when the associated property is `true`.
      
        @property classNameBindings
        @type Array
        @default ['rolling']
       */
      classNameBindings: ['rolling'],

      /*
        The named action to call upon the completion of rolling the dice.
      
        @property onRoll
        @type String
       */
      onRoll: null,

      /*
        The current state of this die instance.
      
        @property rolling
        @type Boolean
        @default false
       */
      rolling: false,

      /*
        The number of times this die instance has been rolled.
      
        @property rolls
        @type Integer
        @default 0
       */
      rolls: 0,

      /*
        The default behavior of this die component. (Increments "rolls" by 1)
      
        @method defaultAction
       */
      defaultAction: function() {
        if (!get(this, 'rolling')) {
          return this.incrementProperty('rolls');
        }
      },

      /*
        Pick a random integer between 0 and the number of registered cube faces.
      
        @method randomFace
        @return Integer
       */
      randomFace: function() {
        return this.randomInt(0, get(this, 'faces.length') - 1);
      },

      /*
        Pick a random integer between min and max.
      
        @method randomInt
        @param Integer The minimum possible value (inclusive)
        @param Integer The maximum possible value (exclusive)
        @return Integer
       */
      randomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      rollsDidChange: observer(function() {
        var wait;
        set(this, 'rolling', true);
        wait = this.randomInt(100, 500);
        return Ember.run.later((function(_this) {
          return function() {
            set(_this, 'rolling', false);
            set(_this, 'show', _this.randomFace());
            return Ember.run.next(function() {
              if (typeOf(get(_this, 'onRoll')) === 'string') {
                return _this.sendAction('onRoll');
              }
            });
          };
        })(this), wait);
      }, 'rolls')
    };

    __exports__["default"] = EllaCubeComponent.extend(EllaDiceComponent);
  });
define("ella-cube",
  ["./components/ella-cube-component","./components/ella-cube-face-component","./components/ella-dice-component","./templates/main-css","ember","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    var EllaCubeComponent = __dependency1__["default"] || __dependency1__;
    var EllaCubeFaceComponent = __dependency2__["default"] || __dependency2__;
    var EllaDiceComponent = __dependency3__["default"] || __dependency3__;
    var EllaCubeTemplate = __dependency4__["default"] || __dependency4__;
    var Application = __dependency5__.Application;
    Application.initializer({
      name: 'ella-cube',
      initialize: function(container) {
        container.register('component:ella-cube', EllaCubeComponent);
        container.register('component:ella-cube-face', EllaCubeFaceComponent);
        container.register('component:ella-dice', EllaDiceComponent);
        return container.register('template:components/ella-cube-css', EllaCubeTemplate);
      }
    });


    __exports__.EllaCubeComponent = EllaCubeComponent;
    __exports__.EllaCubeFaceComponent = EllaCubeFaceComponent;
    __exports__.EllaDiceComponent = EllaDiceComponent;
  });
define("ella-cube/mixins/style_bindings",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Mixin = __dependency1__.Mixin;
    var get = __dependency1__.get;
    var set = __dependency1__.set;
    var computed = __dependency1__.computed;
    var observer = __dependency1__.observer;
    var typeOf = __dependency1__.typeOf;
    var StyleBindingsMixin;

    StyleBindingsMixin = {
      concatenatedProperties: ['styleBindings'],
      attributeBindings: ['style'],
      unitType: 'px',
      createStyleString: function(styleName, property) {
        var value;
        value = this.get(property);
        if (value == null) {
          return;
        }
        return this.makeStyleProperty(styleName, value);
      },
      makeStyleProperty: function(styleName, value) {
        if (Ember.typeOf(value) === 'number') {
          value = value + this.get('unitType');
        }
        return "" + styleName + ":" + value + ";";
      },
      applyStyleBindings: Ember.on('init', function() {
        var lookup, properties, styleBindings, styleComputed, styles;
        styleBindings = this.styleBindings;
        if (!styleBindings) {
          return;
        }
        lookup = {};
        styleBindings.forEach(function(binding) {
          var property, style, _ref;
          _ref = binding.split(':'), property = _ref[0], style = _ref[1];
          return lookup[style || property] = property;
        });
        styles = Ember.keys(lookup);
        properties = styles.map(function(style) {
          return lookup[style];
        });
        styleComputed = Ember.computed((function(_this) {
          return function() {
            var styleString, styleTokens;
            styleTokens = styles.map(function(style) {
              return _this.createStyleString(style, lookup[style]);
            });
            styleString = styleTokens.join('');
            if (styleString.length !== 0) {
              return styleString;
            }
          };
        })(this));
        styleComputed.property.apply(styleComputed, properties);
        return Ember.defineProperty(this, 'style', styleComputed);
      })
    };

    __exports__["default"] = Mixin.create(StyleBindingsMixin);
  });
define("ella-cube/templates/main-css",
  ["ember","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Ember = __dependency1__["default"] || __dependency1__;
    __exports__["default"] = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [4,'>= 1.0.0'];
    helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
      


      data.buffer.push("@-webkit-keyframes rolldice {\n  0% {\n    -webkit-transform: translateZ(-100px) rotateX(45deg) rotateY(135deg);\n    transform: translateZ(-100px) rotateX(45deg) rotateY(135deg); }\n\n  10% {\n    -webkit-transform: translateZ(-100px) rotateX(90deg) rotateY(180deg);\n    transform: translateZ(-100px) rotateX(90deg) rotateY(180deg); }\n\n  20% {\n    -webkit-transform: translateZ(-100px) rotateX(120deg) rotateY(120deg);\n    transform: translateZ(-100px) rotateX(120deg) rotateY(120deg); }\n\n  30% {\n    -webkit-transform: translateZ(-100px) rotateX(73deg) rotateY(45deg);\n    transform: translateZ(-100px) rotateX(73deg) rotateY(45deg); }\n\n  40% {\n    -webkit-transform: translateZ(-100px) rotateX(101deg) rotateY(10deg);\n    transform: translateZ(-100px) rotateX(101deg) rotateY(10deg); }\n\n  50% {\n    -webkit-transform: translateZ(-100px) rotateX(164deg) rotateY(-32deg);\n    transform: translateZ(-100px) rotateX(164deg) rotateY(-32deg); }\n\n  60% {\n    -webkit-transform: translateZ(-100px) rotateX(111deg) rotateY(-60deg);\n    transform: translateZ(-100px) rotateX(111deg) rotateY(-60deg); }\n\n  70% {\n    -webkit-transform: translateZ(-100px) rotateX(60deg) rotateY(0deg);\n    transform: translateZ(-100px) rotateX(60deg) rotateY(0deg); }\n\n  80% {\n    -webkit-transform: translateZ(-100px) rotateX(30deg) rotateY(35deg);\n    transform: translateZ(-100px) rotateX(30deg) rotateY(35deg); }\n\n  90% {\n    -webkit-transform: translateZ(-100px) rotateX(-45deg) rotateY(95deg);\n    transform: translateZ(-100px) rotateX(-45deg) rotateY(95deg); }\n\n  100% {\n    -webkit-transform: translateZ(-100px) rotateX(-75deg) rotateY(158deg);\n    transform: translateZ(-100px) rotateX(-75deg) rotateY(158deg); } }\n\n@keyframes rolldice {\n  0% {\n    -webkit-transform: translateZ(-100px) rotateX(45deg) rotateY(135deg);\n    transform: translateZ(-100px) rotateX(45deg) rotateY(135deg); }\n\n  10% {\n    -webkit-transform: translateZ(-100px) rotateX(90deg) rotateY(180deg);\n    transform: translateZ(-100px) rotateX(90deg) rotateY(180deg); }\n\n  20% {\n    -webkit-transform: translateZ(-100px) rotateX(120deg) rotateY(120deg);\n    transform: translateZ(-100px) rotateX(120deg) rotateY(120deg); }\n\n  30% {\n    -webkit-transform: translateZ(-100px) rotateX(73deg) rotateY(45deg);\n    transform: translateZ(-100px) rotateX(73deg) rotateY(45deg); }\n\n  40% {\n    -webkit-transform: translateZ(-100px) rotateX(101deg) rotateY(10deg);\n    transform: translateZ(-100px) rotateX(101deg) rotateY(10deg); }\n\n  50% {\n    -webkit-transform: translateZ(-100px) rotateX(164deg) rotateY(-32deg);\n    transform: translateZ(-100px) rotateX(164deg) rotateY(-32deg); }\n\n  60% {\n    -webkit-transform: translateZ(-100px) rotateX(111deg) rotateY(-60deg);\n    transform: translateZ(-100px) rotateX(111deg) rotateY(-60deg); }\n\n  70% {\n    -webkit-transform: translateZ(-100px) rotateX(60deg) rotateY(0deg);\n    transform: translateZ(-100px) rotateX(60deg) rotateY(0deg); }\n\n  80% {\n    -webkit-transform: translateZ(-100px) rotateX(30deg) rotateY(35deg);\n    transform: translateZ(-100px) rotateX(30deg) rotateY(35deg); }\n\n  90% {\n    -webkit-transform: translateZ(-100px) rotateX(-45deg) rotateY(95deg);\n    transform: translateZ(-100px) rotateX(-45deg) rotateY(95deg); }\n\n  100% {\n    -webkit-transform: translateZ(-100px) rotateX(-75deg) rotateY(158deg);\n    transform: translateZ(-100px) rotateX(-75deg) rotateY(158deg); } }\n\nella-cube {\n  display: block;\n  position: relative;\n  -webkit-perspective-origin: 50% 50%;\n  perspective-origin: 50% 50%; }\n  ella-cube > ella-cube {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    -webkit-transform-style: preserve-3d;\n    transform-style: preserve-3d;\n    -webkit-transition: -webkit-transform 500ms;\n    transition: transform 500ms; }\n  ella-cube[data-show-face='0'] > ella-cube, ella-cube[data-show-face='6'] > ella-cube {\n    -webkit-transform: translateZ(-100px);\n    transform: translateZ(-100px); }\n  ella-cube[data-show-face='1'] > ella-cube {\n    -webkit-transform: translateZ(-100px) rotateX(-180deg);\n    transform: translateZ(-100px) rotateX(-180deg); }\n  ella-cube[data-show-face='2'] > ella-cube {\n    -webkit-transform: translateZ(-100px) rotateY(-90deg);\n    transform: translateZ(-100px) rotateY(-90deg); }\n  ella-cube[data-show-face='3'] > ella-cube {\n    -webkit-transform: translateZ(-100px) rotateY(90deg);\n    transform: translateZ(-100px) rotateY(90deg); }\n  ella-cube[data-show-face='4'] > ella-cube {\n    -webkit-transform: translateZ(-100px) rotateX(-90deg);\n    transform: translateZ(-100px) rotateX(-90deg); }\n  ella-cube[data-show-face='5'] > ella-cube {\n    -webkit-transform: translateZ(-100px) rotateX(90deg);\n    transform: translateZ(-100px) rotateX(90deg); }\n  ella-cube[disabled=\"disabled\"] {\n    opacity: 0.5; }\n  ella-cube.rolling > ella-cube {\n    -webkit-animation: rolldice 500ms infinite;\n    animation: rolldice 500ms infinite; }\n  ella-cube ella-cube-face {\n    display: table;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    -webkit-box-sizing: border-box;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n    outline-width: 2px;\n    outline-style: solid;\n    outline-color: #121212; }\n    ella-cube ella-cube-face > div {\n      display: table-cell;\n      vertical-align: middle;\n      text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.5); }\n    ella-cube ella-cube-face:nth-child(6n+1) {\n      background-color: rgba(30, 101, 199, 0.8); }\n    ella-cube ella-cube-face:nth-child(6n+2) {\n      background-color: rgba(31, 199, 30, 0.8); }\n    ella-cube ella-cube-face:nth-child(6n+3) {\n      background-color: rgba(165, 0, 77, 0.8); }\n    ella-cube ella-cube-face:nth-child(6n+4) {\n      background-color: rgba(179, 136, 198, 0.8); }\n    ella-cube ella-cube-face:nth-child(6n+5) {\n      background-color: rgba(240, 117, 36, 0.8); }\n    ella-cube ella-cube-face:nth-child(6n) {\n      background-color: rgba(136, 161, 198, 0.8); }\n\n@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {\n  ella-cube {\n    cursor: pointer !important; } }\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 568px) {\n  ella-cube {\n    cursor: pointer !important; } }\n\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\n  ella-cube {\n    cursor: pointer !important; } }\n");
      
    });
  });