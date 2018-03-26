// import Vue from 'vue'
// import ElementUI from 'element-ui'

import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import './common/css/main.css'
import store from './store/index.vue'

Vue.use(ElementUI)
import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueTools from './common/js/tools.vue'
Vue.use(VueTools)

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
