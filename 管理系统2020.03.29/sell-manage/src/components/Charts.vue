<template>
  <!-- 容器 -->
  <div id="box"></div>
</template>

<script>
// 引入echarts
import echarts from "echarts";

export default {
  // 组件通讯接收父组件的数据
  props: {
    title: {
      type: String,
      default: ""
    },
    legendData: {
      type: Array,
      default: () => []
    },
    xData: {
      type: Array,
      default: () => []
    },
    yData: {
      type: Array,
      default: () => []
    }
  },

  // 生命周期函数
  mounted() {
    // 调用绘制报表
    this.drawCharts();
  },

  methods: {
    // 绘制报表函数
    drawCharts() {
      // 初始化echarts
      let myCharts = echarts.init(document.getElementById("box"));
      // 配置项
      let option = {
        title: {
          //标题
          text: this.title
        },
        tooltip: {
          //提示框组件
          trigger: "axis" //触发方式
        },
        legend: {
          //图例
          data: this.legendData
        },
        xAxis: {
          //X轴
          type: "category",
          boundaryGap: false,
          // x轴的数据
          data: this.xData
        },
        yAxis: {
          //Y轴
          type: "value"
        },
        /* series: [
        //核心数据
        {
          name: "订单",
          type: "line",
          stack: "总量",
          data: this.totalData.orderData //y轴的数据
        },
        {
          name: "金额",
          type: "line",
          stack: "总量",
          data: this.totalData.amountData
        }
      ] */
        series: this.yData
      };
      // 应用配置 渲染页面
      myCharts.setOption(option);
    }
  },
  // 侦听器
  watch: {
    // 假如父组件有搜索按钮，点击搜索更新日期，重新发请求更新响应数据
    // 此时传进来的数据就会改变，用侦听器侦听到数据改变，重新绘制图表
    xData() {
      // console.log("x轴数据变化");
      // this.drawCharts();
    },
    yData() {
      // console.log("y轴数据变化");
      // this.drawCharts();
    }
  }
};
</script>

<style lang="less" scoped>
#box {
  height: 400px;
  background: white;
  padding: 20px;
}
</style>