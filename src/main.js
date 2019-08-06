import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import '@/style/index.less'
import axios from '@/api'
import components from '@/components'
Vue.prototype.$http = axios
Vue.use(components)
Vue.config.productionTip = false
Vue.use(Element)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
