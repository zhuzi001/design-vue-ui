import Vue from 'vue'
import App from './App.vue'
import router from './router'

import DesignUI from '../packages'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
Vue.use(Antd)
Vue.use(DesignUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
