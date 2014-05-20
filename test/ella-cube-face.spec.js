moduleForComponent('ella-cube-face', 'EllaCubeFaceComponent');

// Test Markup Structure

test('component should use "ella-cube-face" for tagName', function() {
  expect(1);
  var component = buildComponent(this, {
    template: function(){/*
      Hello
    */}.compile()
  });

  equal(component.get('tagName'), 'ella-cube-face');
});

// Default values

test('component should have default "ariaRole" value of "option"', function() {
  expect(1);
  var component = buildComponent(this, {
    template: function(){/*
      Hello
    */}.compile()
  });

  equal(component.get('ariaRole'), 'option');
});

// Parent detection

test('component should detect it is not in an ella-cube view', function() {
  expect(1);
  var component = buildComponent(this, {
    template: function(){/*
      Hello
    */}.compile()
  });

  ok(!component.get('isValidParentView'));
});

test('component should render with "display:none" if it is not in a valid parentView', function() {
  expect(1);
  var component = buildComponent(this, {
    template: function(){/*
      Hello
    */}.compile()
  });

  ok(component.$().attr('style').indexOf('display:none') >= 0);
});
