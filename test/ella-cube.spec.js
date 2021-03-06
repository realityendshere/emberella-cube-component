moduleForComponent('ella-cube', 'EllaCubeComponent', {
  needs: [
    'component:ella-cube-face'
  ]
});

// Test Markup Structure

test('component should use "ella-cube" for tagName', function() {
  expect(1);
  var component = buildComponent(this);

  equal(component.get('tagName'), 'ella-cube');
});

test('component should contain 6 ella-cube-face elements', function() {
  expect(1);
  var component = buildComponent(this);

  equal(component.$('ella-cube-face').size(), 6);
});

// Default values

test('component should have default "size" of 200', function() {
  expect(1);
  var component = buildComponent(this);

  equal(component.get('size'), 200);
});

test('component should have default "disabled" value of false', function() {
  expect(1);
  var component = buildComponent(this);

  ok(!component.get('disabled'));
});

test('component should have default "ariaRole" value of "select"', function() {
  expect(1);
  var component = buildComponent(this);

  equal(component.get('ariaRole'), 'select');
});

test('component should show first face (index of 0)', function() {
  expect(2);
  var component = buildComponent(this);

  ok(component.get('show') === 0);

  equal(component.$().attr('data-show-face'), "0");
});

test('component "faces" should be an array with a length of 6', function() {
  expect(2);
  var component = buildComponent(this);

  equal(Ember.typeOf(component.get('faces')), 'array');
  equal(component.get('faces.length'), 6);
});

// Property/Attribute behavior

test('disabled component should render with disabled="disabled"', function() {
  expect(2);
  var component = buildComponent(this, {
    disabled: true
  });

  equal(component.$().attr('disabled'), 'disabled');

  Ember.run(function() {component.set('disabled', false);});

  ok(!component.$().attr('disabled'));
});

test('setting component "size" should update size and leave default size as is', function() {
  expect(2);
  var component = buildComponent(this);

  Ember.run(function() {component.set('size', 150);});

  equal(component.get('size'), 150);
  equal(component.get('defaultSize'), 200);
});

test('setting component "size" should update inline cube styles', function() {
  expect(2);
  var component = buildComponent(this);

  equal(component.$().attr('style'), "width:200px;height:200px;perspective:1200px;-webkit-perspective:1200px;");

  Ember.run(function() {component.set('size', 150);});

  equal(component.$().attr('style'), "width:150px;height:150px;perspective:900px;-webkit-perspective:900px;");
});

test('component value should match currently showing face', function() {
  expect(3);
  var component = buildComponent(this);

  Ember.run(function() {component.set('show', 0);});

  equal(component.get('value'), 1);

  Ember.run(function() {component.set('show', 5);});

  equal(component.get('value'), 6);

  Ember.run(function() {component.set('show', 2);});

  equal(component.get('value'), 3);
});

test('component show should match currently set value', function() {
  expect(3);
  var component = buildComponent(this);

  Ember.run(function() {component.set('value', '1');});

  equal(component.get('show'), 0);

  Ember.run(function() {component.set('value', '5');});

  equal(component.get('show'), 4);

  Ember.run(function() {component.set('value', '2');});

  equal(component.get('show'), 1);
});

// Events and Actions

test('clicking component should show next face', function() {
  expect(6);
  var component = buildComponent(this);

  equal(component.get('show'), 0);
  equal(component.$().attr('data-show-face'), "0");

  click('#' + component.get('elementId'));

  andThen(function() {
    equal(component.get('show'), 1);
    equal(component.$().attr('data-show-face'), "1");
  });

  click('#' + component.get('elementId'));

  andThen(function() {
    equal(component.get('show'), 2);
    equal(component.$().attr('data-show-face'), "2");
  });
});

test('clicking component when on last face should show first face', function() {
  expect(4);
  var component = buildComponent(this);

  Ember.run(function() {component.set('show', 5);});

  equal(component.get('show'), 5);
  equal(component.$().attr('data-show-face'), "5");

  click('#' + component.get('elementId'));

  andThen(function() {
    equal(component.get('show'), 0);
    equal(component.$().attr('data-show-face'), "0");
  });
});

test('clicking component when it is disabled should do nothing', function() {
  expect(5);
  var component = buildComponent(this);

  equal(component.get('disabled'), false);

  equal(component.get('show'), 0);
  equal(component.$().attr('data-show-face'), "0");

  Ember.run(function() {component.set('disabled', true);});

  click('#' + component.get('elementId'));

  andThen(function() {
    equal(component.get('show'), 0);
    equal(component.$().attr('data-show-face'), "0");
  });
});

// Cube Face rendering

test('each cube face should display its value as its content when no content provided', function() {
  expect(6);
  var component = buildComponent(this);

  component.$('ella-cube-face').each(function(i, face) {
    equal(Ember.$(face).text().trim(), i + 1);
  });
});

test('each cube face should display its content if provided', function() {
  expect(6);
  var component = buildComponent(this, {
    template: function(){/*
      {{#ella-cube-face value='1'}}One{{/ella-cube-face}}
      {{#ella-cube-face value='2'}}Two{{/ella-cube-face}}
      {{#ella-cube-face value='3'}}Three{{/ella-cube-face}}
      {{#ella-cube-face value='4'}}Four{{/ella-cube-face}}
      {{#ella-cube-face value='5'}}Five{{/ella-cube-face}}
      {{#ella-cube-face value='6'}}Six{{/ella-cube-face}}
    */}.compile()
  });

  component.$('ella-cube-face').each(function(i, face) {
    var content = ['One', 'Two', 'Three', 'Four', 'Five', 'Six']
    equal(Ember.$(face).text().trim(), content[i]);
  });
});
