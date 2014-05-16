`import EllaCubeComponent        from './components/ella-cube-component'`
`import EllaCubeFaceComponent    from './components/ella-cube-face-component'`
`import EllaCubeTemplate         from './templates/main-css'`
`import { Application }          from 'ember'`

Application.initializer
  name: 'ella-cube',
  initialize: (container) ->
    container.register('component:ella-cube',                 EllaCubeComponent)
    container.register('component:ella-cube-face',            EllaCubeFaceComponent)
    container.register('template:components/ella-cube-css',   EllaCubeTemplate)

`
export {
  EllaCubeComponent
}
`
