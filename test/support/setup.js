document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');

App = Ember.Application.create({});

App.rootElement = '#ember-testing';

emq.globalize();
App.setupForTesting();
App.injectTestHelpers();


setResolver(Ember.DefaultResolver.extend({
  testSubjects: {
    'component:ella-cube': Emberella.Component.EllaCubeComponent,
    'component:ella-cube-face': Emberella.Component.EllaCubeFaceComponent,
    'component:ella-dice': Emberella.Component.EllaDiceComponent
  },
  resolve: function(fullName) {
    return this.testSubjects[fullName] || this._super.apply(this, arguments);
  }
}).create());


Function.prototype.compile = function() {
  var template = this.toString().split('\n').slice(1,-1).join('\n') + '\n';
  return Ember.Handlebars.compile(template);
}

function lookupComponent(id) {
  return Ember.View.views[id];
}

function buildComponent(test, props) {
  props = props || {};
  var component = test.subject(Ember.merge({
    template: function(){/*
      {{ella-cube-face value='1'}}
      {{ella-cube-face value='2'}}
      {{ella-cube-face value='3'}}
      {{ella-cube-face value='4'}}
      {{ella-cube-face value='5'}}
      {{ella-cube-face value='6'}}
    */}.compile()
  }, props));
  test.append();
  return component;
}
