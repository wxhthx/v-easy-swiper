/**!
 * @license MIT
 * Alex.Wen
 * Xi'an
 * wenxinghua1990@163.com
 */
import Swiper from './components/Swiper.vue'
// let installed = false

const swiperplugin = {}
swiperplugin.installed = false
// Plugin API
// *********
swiperplugin.install = function (Vue, opts = {}) {
  if (swiperplugin.installed) {
    return
  }
  // const name = opts.name || 'v-easy-swiper'
  Vue.component('swiper', Swiper)
  swiperplugin.installed = true
}
export default swiperplugin
