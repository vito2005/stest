import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Table, TableColumn, Loading, Pagination, Container, Icon } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Container)
Vue.use(Icon)
Vue.use(Loading.directive)
Vue.config.productionTip = false
Vue.prototype.$loading = Loading.service

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
