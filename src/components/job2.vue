<template>
  <div class="ec">
    <div id="main" ref="chart" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from 'axios';

export default {
  name: 'job2-chart',
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
      // 处理数据，聚合地区消费额
      const regionData = data.reduce((acc, curr) => {
        acc[curr.region] = (acc[curr.region] || 0) + curr.pay_money;
        return acc;
      }, {});

      // 准备饼状图数据
      const chartData = Object.keys(regionData).map(key => ({
        name: key,
        value: regionData[key],
      }));

      console.log('饼状图数据:', chartData);

      this.initChart(chartData);
    },
    initChart(chartData) {
      this.chart = echarts.init(this.$refs.chart);
      const option = {
        title: {
          text: '各地区消费总额占比',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
        },
        series: [
          {
            name: '消费总额',
            type: 'pie',
            radius: '50%',
            data: chartData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
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
