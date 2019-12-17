<template>
  <div>
    <canvas ref="canvas">
    </canvas>
  </div>
</template>

<script>
import { Bar } from './lib/BaseCharts'

export default {
  extends: Bar,
  props: {
    chartData: Object
  },
  watch: {
    chartData: {
      handler: async function (val) {
        if (val && Object.keys(val).length) {
          this.renderChart({
            labels: Object.keys(val),
            datasets: [
              {
                label: 'Количество дефектов',
                backgroundColor: '#f87979',
                data: Object.values(val)
              }
            ]
          }, { responsive: true, maintainAspectRatio: false })
        }
      },
      deep: true
    }
  },
  mounted () {
    this.renderChart({
      labels: Object.keys(this.chartData),
      datasets: [
        {
          label: 'Количество дефектов',
          backgroundColor: '#f87979',
          data: Object.values(this.chartData)
        }
      ]
    }, { responsive: true, maintainAspectRatio: false })
  }
}
</script>
