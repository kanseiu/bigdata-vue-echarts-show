<template>
  <div class="ec">
    <div id="main" ref="chart" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';

export default {
  name: 'job1-chart',
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart);
    this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.post('/api/getJobData');
        if (response.data.success && response.data.code === 200) {
          this.processData(response.data.result);
        }
      } catch (error) {
        console.error('请求数据失败:', error);
      }
    },
    processData(data) {
      const aggregatedData = data.reduce((acc, curr) => {
        acc[curr.province] = (acc[curr.province] || 0) + curr.pay_money;
        return acc;
      }, {});

      const sortedData = Object.entries(aggregatedData)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5);

      const provinces = sortedData.map(item => item[0]);
      const payMoney = sortedData.map(item => item[1]);

      console.log('柱状图数据：', provinces)
      console.log('柱状图数据：', payMoney)

      this.initChart(provinces, payMoney);
    },
    initChart(provinces, payMoney) {
      const option = {
        title: {
          text: '消费额最高的省份',
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: provinces,
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: '消费额',
            type: 'bar',
            data: payMoney,
          },
        ],
      };

      this.chart.setOption(option);
    },
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  },
};
</script>

<style scoped>
.ec {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
