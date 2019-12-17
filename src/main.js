import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Table, TableColumn, Loading, Pagination, Container, Icon, DatePicker, Input, InputNumber } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'

// configure language
locale.use(lang)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Container)
Vue.use(DatePicker)
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Loading.directive)

Vue.component('multiselect', Multiselect)

Vue.config.productionTip = false
Vue.prototype.$loading = Loading.service

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
