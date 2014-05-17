"use strict";
var EllaCubeComponent = require("./components/ella-cube-component")["default"] || require("./components/ella-cube-component");
var EllaCubeFaceComponent = require("./components/ella-cube-face-component")["default"] || require("./components/ella-cube-face-component");
var EllaDiceComponent = require("./components/ella-dice-component")["default"] || require("./components/ella-dice-component");
var EllaCubeTemplate = require("./templates/main-css")["default"] || require("./templates/main-css");
var Application = require("ember").Application;
Application.initializer({
  name: 'ella-cube',
  initialize: function(container) {
    container.register('component:ella-cube', EllaCubeComponent);
    container.register('component:ella-cube-face', EllaCubeFaceComponent);
    container.register('component:ella-dice', EllaDiceComponent);
    return container.register('template:components/ella-cube-css', EllaCubeTemplate);
  }
});


exports.EllaCubeComponent = EllaCubeComponent;
exports.EllaCubeFaceComponent = EllaCubeFaceComponent;
exports.EllaDiceComponent = EllaDiceComponent;