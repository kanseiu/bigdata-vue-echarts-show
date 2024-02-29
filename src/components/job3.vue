<template>
  <div class="ec">
    <div id="main" ref="chart" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script>
import axios from 'axios'
import * as echarts from 'echarts'

export default {
  name: 'job3-chart',
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.post('/api/getJob3Data').then(response => {
        const data = response.data.result
        const chartData = this.processData(data)
        console.log(chartData) // 打印数据结构到控制台
        this.drawChart(chartData)
      })
    },
    processData(data) {
      const countByYear = {}
      data.forEach(item => {
        if (countByYear[item.year]) {
          countByYear[item.year] += 1
        } else {
          countByYear[item.year] = 1
        }
      })
      const sortedYears = Object.keys(countByYear).sort((a, b) => a - b)
      const seriesData = sortedYears.map(year => countByYear[year])
      return {
        years: sortedYears,
        seriesData
      }
    },
    drawChart(chartData) {
      const chart = echarts.init(this.$refs.chart)
      const option = {
        title: {
          text: '年度商品上架数量'
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: chartData.years
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: chartData.seriesData,
          type: 'line'
        }]
      }
      chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.ec {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
