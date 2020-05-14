<template>
  <div class="home">
    <ul class="header">
      <li>
        <img src="../../assets/images/总订单.png" alt />
        <div>
          <p class="one">总订单</p>
          <p class="two">{{totalData.totalOrder}}</p>
        </div>
      </li>
      <li>
        <img src="../../assets/images/总销售额.png" alt />
        <div>
          <p class="one">总销售额</p>
          <p class="two">{{totalData.totalAmount}}</p>
        </div>
      </li>
      <li>
        <img src="../../assets/images/今日订单数.png" alt />
        <div>
          <p class="one">今日订单数</p>
          <p class="two">{{totalData.todayOrder}}</p>
        </div>
      </li>
      <li>
        <img src="../../assets/images/今日销售额.png" alt />
        <div>
          <p class="one">今日销售额</p>
          <p class="two">{{totalData.totayAmount}}</p>
        </div>
      </li>
    </ul>
    <!-- 准备一个有宽高的echarts容器 -->
    <div id="echartsBox"></div>

    <!-- 使用报表组件 -->
    <Charts
      v-if="totalData.xData.length"
      :title="'数据统计'"
      :legendData="['订单','金额']"
      :xData="totalData.xData"
      :yData="yData"
    ></Charts>
  </div>
</template>

<script>
// 引入组件
import Charts from "@/components/Charts.vue";
// 引入charts
import echarts from "echarts";

// 引入请求函数
import { getTotalData } from "@/api/charts";

export default {
  // 注册组件
  components: {
    Charts
  },

  // 生命周期函数
  /* async */ created() {},
  async mounted() {
    // 拿数据之后才渲染，要不然echarts读数据的时候还没拿到数据
    let totalData = await getTotalData();
    // console.log(totalData);
    this.totalData = totalData;
    this.flag = true;
    // 初始化echarts
    let myCharts = echarts.init(document.getElementById("echartsBox"));
    // 配置echarts
    let option = {
      title: {
        //标题
        text: "数据统计"
      },
      tooltip: {
        //提示框组件
        trigger: "axis" //触发方式
      },
      legend: {
        //图例
        data: ["订单", "金额"]
      },
      xAxis: {
        //X轴
        type: "category",
        boundaryGap: false, //留白
        // x轴的数据
        data: this.totalData.xData
      },
      yAxis: {
        //Y轴
        type: "value"
      },
      series: [
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
      ]
    };
    // 应用配置
    myCharts.setOption(option);
  },
  // 数据
  data() {
    return {
      totalData: {
        totalOrder: 0, //总订单
        totalAmount: 0, //总销售额
        todayOrder: 0, //今日订单
        totayAmount: 0, //今日销售额
        xData: [], //x轴数据
        orderData: [], //订单数据
        amountData: [] //金额数据
      },
      flag: false
    };
  },
  // 计算属性
  computed: {
    yData() {
      return [
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
      ];
    }
  }
};
</script>

<style lang="less" scoped>
#echartsBox {
  height: 400px;
  background: white;
  padding: 20px;
}
.header {
  margin: 30px 0;
  display: flex;
  justify-content: space-around;
  li {
    width: 20%;
    height: 100px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    div {
      .one {
        color: #cecece;
        margin-bottom: 10px;
      }
    }
  }
}
</style>