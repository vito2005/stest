<template>
  <div class="chart-wrapper">
    <h2>График зарегистрированных дефектов</h2>
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
      loading: null
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
</style>
