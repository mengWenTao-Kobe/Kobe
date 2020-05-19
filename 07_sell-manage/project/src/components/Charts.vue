<template>
  <!-- 图表容器 -->
  <div id="main"></div>
</template>

<script>
// 引入echarts
import echarts from "echarts";

export default {
  props: ["title", "legend", "xData", "series"],
  mounted() {
    this.drawCharts();
  },
  // 侦听器
  watch: {
    xData() {
      // console.log("x轴数据变化");
      this.drawCharts();
    },
    series() {
      // console.log("y轴数据变化");
      this.drawCharts();
    }
  },
  methods: {
    // 绘制图表函数
    drawCharts() {
      // 获取dom初始化图表
      let myChart = echarts.init(document.getElementById("main"));

      // 配置项
      let option = {
        title: {
          text: this.title
        },
        // 提示框
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        // 图例
        legend: {
          data: this.legend
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "5.5%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xData
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        // 核心数据
        series: this.series
      };

      // 应用配置，生成图表
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="less" scoped>
#main {
  width: 600px;
  height: 400px;
}
</style>