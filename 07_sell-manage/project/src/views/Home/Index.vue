<template>
  <div class="index">
    <!-- 面板组件 -->
    <Panel class="card">
      <!-- 标题 -->
      <span slot="title">后台首页</span>
      <!-- 内容 -->
      <div class="content" slot="content">
        <!-- 使用报表组件 -->
        <Charts :title="title" :xData="xData" :legend="legend" :series="series" v-if="xData.length"></Charts>
      </div>
    </Panel>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";
import MyButton from "@/components/MyButton.vue";
import Charts from "@/components/Charts.vue";
import { totalData } from "@/api/charts";

export default {
  components: {
    Panel,
    MyButton,
    Charts
  },
  // 一进来就获取数据，给到this
  async created() {
    let {
      totalOrder,
      totalAmount,
      todayOrder,
      totayAmount,
      xData,
      orderData,
      amountData
    } = await totalData();
    this.totalOrder = totalOrder;
    this.totalAmount = totalAmount;
    this.todayOrder = todayOrder;
    this.totayAmount = totayAmount;
    this.xData = xData;
    this.orderData = orderData;
    this.amountData = amountData;
  },
  data() {
    return {
      totalOrder: 5486, //总订单
      totalAmount: 202466, //总销售额
      todayOrder: 189, //今日订单
      totayAmount: 2189, //今日销售额
      /* xData: [
        //x轴数据
        "2019/11/17",
        "2019/11/18",
        "2019/11/19",
        "2019/11/20",
        "2019/11/21",
        "2019/11/22",
        "2019/11/23"
      ],
      orderData: [120, 132, 101, 134, 90, 230, 210], //订单数据
      amountData: [220, 282, 191, 234, 290, 330, 310], //金额数据 */
      xData: [], //X轴数据
      orderData: [], //订单数据
      amountData: [], //金额数据
      title: "数据统计",
      legend: ["订单数据", "金额数据"]
    };
  },
  computed: {
    series() {
      return [
        {
          name: this.legend[0],
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: this.orderData
        },
        {
          name: this.legend[1],
          type: "line",
          stack: "总量",
          areaStyle: {},
          data: this.amountData
        }
      ];
    }
  }
};
</script>

<style lang="less" scoped>
</style>