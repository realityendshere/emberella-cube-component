Emberella Cube Component
==========================================

The `EllaCubeComponent` is an experimental, "visually interesting" UI component
designed to illustrate the importantance of tools dedicated to the creation of
small, sharable code libraries (e.g. components, mixins, and helpers).

Its construction was aided by the [Emberella Component Blueprint][emberella-blueprint]
and developed for a talk at the [Southern California Ember Meetup][sc-meetup].

This component displays a "3D" select menu with up to 6 visible options in the
shape of a cube. Like a select menu, each cube face will display its designated
value or custom content.


Quick Example Usage
==========================================

To create a simple, 6-sided cube:

```
{{#ella-cube}}
  {{ella-cube-face value='A'}}
  {{ella-cube-face value='B'}}
  {{ella-cube-face value='C'}}
  {{ella-cube-face value='D'}}
  {{ella-cube-face value='E'}}
  {{ella-cube-face value='F'}}
{{/ella-cube}}
```

To inject custom content into your cube's faces:

```
{{#ella-cube value=value size=300}}
  {{#ella-cube-face value='1'}}One{{/ella-cube-face}}
  {{#ella-cube-face value='2'}}Two{{/ella-cube-face}}
  {{#ella-cube-face value='3'}}Three{{/ella-cube-face}}
  {{#ella-cube-face value='4'}}Four{{/ella-cube-face}}
  {{#ella-cube-face value='5'}}Five{{/ella-cube-face}}
  {{#ella-cube-face value='6'}}Six{{/ella-cube-face}}
{{/ella-cube}}
```

Here's a 6-sided die:

```
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
```

[emberella]: https://github.com/realityendshere/emberella "Emberella"
[emberella-blueprint]: https://github.com/realityendshere/emberella-component-blueprint "Emberella Component Blueprint"
[ember]: http://emberjs.com "Ember.js"
[ember-components]: http://emberjs.com/guides/components/ "Ember Component Guide"
[broccoli]: https://github.com/joliss/broccoli "Broccoli"
[testem]: https://github.com/airportyh/testem "Test'em 'Scripts!"
[grunt]: http://gruntjs.com "Grunt"
[bower]: http://bower.io "Bower"
[ember-cli]: http://iamstef.net/ember-cli/ "Ember CLI"
[ic-tabs]: https://github.com/instructure/ic-tabs "IC Tabs"
[npm]: https://www.npmjs.org "NPM"
[example]: http://localhost:7357/examples/index.html "Example Component"
[es6-dist]: https://github.com/rpflorence/broccoli-dist-es6-module "broccoli-dist-es6-module"
[joliss]: https://github.com/joliss "Jo Liss on GitHub"
[rpflorence]: https://github.com/rpflorence "Ryan Florence on GitHub"
[sc-meetup]: http://www.meetup.com/Ember-SC/ "Southern California Ember Meetup"
