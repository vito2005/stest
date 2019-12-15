import Vue from 'vue'
import VueRouter from 'vue-router'
import TableLayout from '../views/TableLayout'
import ChartLayout from '../views/ChartLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/table',
    name: 'table',
    component: TableLayout
  },
  {
    path: '/chart',
    name: 'chart',
    component: ChartLayout
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
