module('main');

test('Components are registered on an application', function() {
  expect(3);
  var container = {
    registry: {},
    register: function(name, definition) {
      this.registry[name] = definition;
    }
  };
  var initializer = Ember.Application.initializers['ella-cube'];
  initializer.initialize(container);
  strictEqual(container.registry['component:ella-cube'], Emberella.Component.EllaCubeComponent);
  strictEqual(container.registry['component:ella-cube-face'], Emberella.Component.EllaCubeFaceComponent);
  strictEqual(container.registry['component:ella-dice'], Emberella.Component.EllaDiceComponent);
});

