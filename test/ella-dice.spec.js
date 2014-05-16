moduleForComponent('ella-dice', 'EllaDiceComponent', {
  needs: [
    'component:ella-cube',
    'component:ella-cube-face'
  ]
});

test('component should use "ella-cube" for tagName', function() {
  expect(1);
  var component = buildComponent(this);

  ok(component.get('tagName') === 'ella-cube');
});

test('component should evenly distribute random numbers', function() {
  expect(6);
  var component = buildComponent(this),
      results = {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0
      },
      times = 60000,
      exact = Math.ceil(times / 6),
      range = Math.ceil(times * 0.01),
      random;

  for(i = 0; i < times; ++i) {
    random = component.random();
    results[random+'']++;
  }

  ok(!!(results['0'] >= (exact - range) && results['0'] <= (exact + range)));
  ok(!!(results['1'] >= (exact - range) && results['1'] <= (exact + range)));
  ok(!!(results['2'] >= (exact - range) && results['2'] <= (exact + range)));
  ok(!!(results['3'] >= (exact - range) && results['3'] <= (exact + range)));
  ok(!!(results['4'] >= (exact - range) && results['4'] <= (exact + range)));
  ok(!!(results['5'] >= (exact - range) && results['5'] <= (exact + range)));

});

