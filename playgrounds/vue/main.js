import Vue from 'vue'
import App from './App.vue'
import '@jabardigitalservice/jds-design-system/css/jds-design-system.css'

/** 
 * register all components globally using Plugin
 */ 
import { DesignSystem } from '@jabardigitalservice/jds-design-system/esm'
Vue.use(DesignSystem)

/**
 * register component ala carte
 */
// import { Button } from '@jabardigitalservice/jds-design-system/esm'
// Vue.component('JdsButton', Button)
// Vue.component('JdsInputText', InputText)

new Vue({
  el: '#app',
  render: (h) => h(App),
}).$mount('#app')
