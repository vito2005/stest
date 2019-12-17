<template>
  <div class="chart-wrapper">
    <h2>График зарегистрированных дефектов</h2>
    <div class="block">
      <span>Период: </span>
      <el-date-picker
        v-model="dateRangeValue"
        type="monthrange"
        align="right"
        unlink-panels
        range-separator="To"
        start-placeholder="Start month"
        end-placeholder="End month"
        :picker-options="pickerOptions">
      </el-date-picker>
      {{dateRangeValue}}

      <span>Система: </span>
      <multiselect v-model="value" :options="options"></multiselect>
      <span>Критичность: </span>
      <multiselect v-model="value" :options="options"></multiselect>
    </div>
    <chart v-if="Object.keys(chartData).length" :chartData="chartData" :style="{ height: '600px', position: 'relative' }"/>
    <el-container v-else style="height: 300px"
                  v-loading="loading"
                  element-loading-text="Loading..."
                  element-loading-background="rgba(0, 0, 0, 0.8)"></el-container>
  </div>
</template>

<script>
import chart from '@/components/chart.vue'
import { mapGetters } from 'vuex'

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
      },
      dateRangeValue: '',
      options: [1, 2, 3],
      value: ''
    }
  },
  computed: {
    ...mapGetters(['chartData'])
  },
  async created () {
    this.loading = true
    await this.$store.dispatch('getChartData')
    this.loading = false
  }
}
</script>
<style>
  .chart-wrapper {
    margin: auto;
    padding: 0 50px;
  }
  .block {
    margin: 1rem;
  }
</style>
