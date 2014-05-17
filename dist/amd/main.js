define(
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