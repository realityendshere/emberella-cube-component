moduleForComponent('ella-cube', 'EllaCubeComponent', {
  needs: [
    'component:ella-cube-face'
  ]
});

test('component should use "ella-cube" for tagName', function() {
  expect(1);
  var component = buildComponent(this);

  ok(component.get('tagName') === 'ella-cube');
});

test('component should have default "size" of 200', function() {
  expect(1);
  var component = buildComponent(this);

  ok(component.get('size') === 200);
});

test('setting component "size" should update size and leave default size as is', function() {
  expect(2);
  var component = buildComponent(this);

  Ember.run(function() {component.set('size', 150);});

  ok(component.get('size') === 150);
  ok(component.get('defaultSize') === 200);
});

test('setting component "size" should update inline cube styles', function() {
  expect(2);
  var component = buildComponent(this);

  equal(component.$().attr('style'), "width:200px;height:200px;perspective:1200px;-webkit-perspective:1200px;");

  Ember.run(function() {component.set('size', 150);});

  equal(component.$().attr('style'), "width:150px;height:150px;perspective:900px;-webkit-perspective:900px;");
});

test('component "faces" should be an array with a length of 6', function() {
  expect(2);
  var component = buildComponent(this);

  ok(Ember.typeOf(component.get('faces')) === 'array');
  ok(component.get('faces.length') === 6);
});

test('component should show first face (index of 0)', function() {
  expect(2);
  var component = buildComponent(this);

  ok(component.get('show') === 0);

  equal(component.$().attr('data-show-face'), "0");
});

test('clicking component should show next face', function() {
  expect(6);
  var component = buildComponent(this);

  ok(component.get('show') === 0);
  equal(component.$().attr('data-show-face'), "0");

  click('#' + component.get('elementId'));

  andThen(function() {
    ok(component.get('show') === 1);
    equal(component.$().attr('data-show-face'), "1");
  });

  click('#' + component.get('elementId'));

  andThen(function() {
    ok(component.get('show') === 2);
    equal(component.$().attr('data-show-face'), "2");
  });
});

test('clicking component when on last face should show first face', function() {
  expect(4);
  var component = buildComponent(this);

  Ember.run(function() {component.set('show', 5);});

  ok(component.get('show') === 5);
  equal(component.$().attr('data-show-face'), "5");

  click('#' + component.get('elementId'));

  andThen(function() {
    ok(component.get('show') === 0);
    equal(component.$().attr('data-show-face'), "0");
  });
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
