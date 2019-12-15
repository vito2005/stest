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
