import Vue from 'vue'
import App from './App'
import swiperplugin from '../index.js'

Vue.use(swiperplugin, {})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
