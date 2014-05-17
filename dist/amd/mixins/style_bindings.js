define(
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