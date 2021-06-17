import * as components from './components'

export * from './components'
export const DesignSystem = {
  install (Vue) {
    Object.entries(components).forEach(([name, c]) => {
      Vue.component(name, c)
    })
  }
}
