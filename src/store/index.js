import Vue from 'vue'
import Vuex from 'vuex'
import { getChartData, getData, getDictionaries } from '../api/index'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    defects: [],
    chartData: {},
    dictionaries: null,
    filters: {
      'System': [],
      'Состояние': [],
      'Найдено при': [],
      'Критичность': [],
      'Тип Дефекта': [],
      'Метод обнаружения': [],
      'reopens_amount': [],
      'Дата создания': [],
      'Дата изменения': [],
      'Дата закрытия': []
    },
    chartFilters: {
      'System': [],
      'Критичность': [],
      'Дата создания': []
    }
  },
  getters: {
    defects: s => s.defects,
    chartData: s => s.chartData,
    dictionaries: s => s.dictionaries,
    filters: s => s.filters,
    chartFilters: s => s.chartFilters
  },
  mutations: {
    saveDefects (state, defects) {
      state.defects = defects
    },
    saveChartData (state, chartData) {
      state.chartData = chartData
    },
    saveDictionaries (state, dictionaries) {
      state.dictionaries = dictionaries
    },
    setSystemFilter (state, value) {
      state.filters['System'] = value
    },
    setConditionFilter (state, value) {
      state.filters['Состояние'] = value
    },
    setTestFilter (state, value) {
      state.filters['Найдено при'] = value
    },
    setCriticalFilter (state, value) {
      state.filters['Критичность'] = value
    },
    setDefectTypeFilter (state, value) {
      state.filters['Тип Дефекта'] = value
    },
    setMethodFilter (state, value) {
      state.filters['Метод обнаружения'] = value
    },
    setReopensFilter (state, { from, to }) {
      state.filters['reopens_amount'] = [from, to]
    },
    setCreationDateFilter (state, value) {
      state.filters['Дата создания'] = value
    },
    setChangeDateFilterFilter (state, value) {
      state.filters['Дата изменения'] = value
    },
    setCloseDateFilter (state, value) {
      state.filters['Дата закрытия'] = value
    },
    setCreationDateChartFilter (state, value) {
      state.chartFilters['Дата создания'] = value
    },
    setSystemChartFilter (state, value) {
      state.chartFilters['System'] = value
    },
    setCriticalChartFilter (state, value) {
      state.chartFilters['Критичность'] = value
    }
  },
  actions: {
    async getDefects ({ commit }, { page, pageSize, filters }) {
      commit('saveDefects', await getData(page, pageSize, filters))
    },
    async getChartData ({ commit }, chartFilter) {
      commit('saveChartData', null)
      commit('saveChartData', await getChartData(chartFilter))
    },
    async getDictionaries ({ commit }) {
      commit('saveDictionaries', await getDictionaries())
    }
  },
  modules: {
  },
  strict: true
})
