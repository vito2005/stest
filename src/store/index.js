import Vue from 'vue'
import Vuex from 'vuex'
import { getChartData, getData } from '../api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defects: [],
    chartData: {}
  },
  getters: {
    defects: s => s.defects,
    chartData: s => s.chartData
  },
  mutations: {
    saveDefects (state, defects) {
      state.defects = defects
    },
    saveChartData (state, chartData) {
      state.chartData = chartData
    }
  },
  actions: {
    async getDefects ({ commit }, { page, pageSize }) {
      commit('saveDefects', await getData(page, pageSize))
    },
    async getChartData ({ commit }) {
      commit('saveChartData', await getChartData())
    }
  },
  modules: {
  },
  strict: true
})
