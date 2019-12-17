<template>
  <div class="chart-wrapper">
    <h2>График зарегистрированных дефектов</h2>
    <h3>Фильтры:</h3>
    <div class="chart-filters">
        <div class="chart-filters__item">
          <span>Период</span>
          <el-date-picker
            v-model="creationDateFilter"
            type="monthrange"
            align="right"
            value-format="timestamp"
            unlink-panels
            range-separator="To"
            start-placeholder="Start month"
            end-placeholder="End month"
            :picker-options="pickerOptions"/>
        </div>
        <div class="chart-filters__item">
          <span>Система</span>
          <multiselect multiple placeholder="Выбирете систему" v-model="systemFilter"
                       :options="(dictionaries && Array.from(dictionaries.System)) || []"
                       selectLabel deselectLabel/>
        </div>
        <div class="chart-filters__item">
          <span>Критичность</span>
          <multiselect multiple placeholder="Выбирете критичность" v-model="criticalFilter"
                       :options="(dictionaries && Array.from(dictionaries['Критичность'])) || []"
                       selectLabel deselectLabel/>
        </div>
      </div>
    <chart v-if="chartData && Object.keys(chartData).length" :chartData="chartData" :style="{ height: '600px', position: 'relative' }"/>
    <el-container v-else style="height: 300px"
                  v-loading="loading"
                  element-loading-text="Loading..."
                  element-loading-background="rgba(0, 0, 0, 0.8)"></el-container>
  </div>
</template>

<script>
import chart from '@/components/chart.vue'
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ChartLayout',
  components: {
    chart
  },
  data () {
    return {
      loading: null,
      pickerOptions: {
        shortcuts: [{
          text: 'This month',
          onClick (picker) {
            picker.$emit('pick', [new Date(), new Date()])
          }
        }, {
          text: 'This year',
          onClick (picker) {
            const end = new Date()
            const start = new Date(new Date().getFullYear(), 0)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: 'Last 6 months',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setMonth(start.getMonth() - 6)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  watch: {
    chartFilters: {
      handler: async function (val) {
        this.loading = true
        await this.$store.dispatch('getChartData', val)
        this.loading = false
      },
      deep: true
    }
  },
  computed: {
    ...mapGetters(['chartData', 'chartFilters', 'dictionaries']),
    creationDateFilter: {
      get () {
        return this.chartFilters['Дата создания']
      },
      set (val) {
        this.setCreationDateChartFilter(val)
      }
    },
    criticalFilter: {
      get () {
        return this.chartFilters['Критичность']
      },
      set (val) {
        this.setCriticalChartFilter(val)
      }
    },
    systemFilter: {
      get () {
        return this.chartFilters.System
      },
      set (val) {
        this.setSystemChartFilter(val)
      }
    }
  },
  async created () {
    this.loading = true
    await this.$store.dispatch('getChartData', this.chartFilters)
    this.loading = false
  },
  methods: {
    ...mapMutations(['setCreationDateChartFilter', 'setSystemChartFilter', 'setCriticalChartFilter'])
  }
}
</script>
<style lang="scss">
  .chart-wrapper {
    margin: auto;
    padding: 0 50px;
  }
  .chart-filters {
    margin: 1rem;
    display: flex;
    justify-content: center;
    .chart-filters__item {
      margin: 1rem;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      width: 290px;
    }
  }
</style>
