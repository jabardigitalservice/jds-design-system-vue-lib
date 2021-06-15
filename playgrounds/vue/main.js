import Vue from 'vue'
import App from './App.vue'

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

/**
 * commonJS
 */
// window.Vue = Vue
// const { Button } = require('@jabardigitalservice/jds-design-system/lib/jds-design-system.common')
// Vue.component('JdsButton', Button)

/**
 * WC
*/
// window.Vue = Vue
// require('@jabardigitalservice/jds-design-system/wc/jds.js')

new Vue({
  el: '#app',
  render: (h) => h(App),
}).$mount('#app')
