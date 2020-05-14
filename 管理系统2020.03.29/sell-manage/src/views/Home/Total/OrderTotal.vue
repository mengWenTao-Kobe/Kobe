<template>
  <div class="orderTotal">
    <!-- 使用报表组件 -->
    <Charts v-if="yData.length" :title="'订单统计'" :legendData="['下单金额']" :xData="xData" :yData="yData"></Charts>
  </div>
</template>

<script>
// 引入报表组件
import Charts from "@/components/Charts.vue";
// 引入请求函数
import { getOrderTotal } from "@/api/charts.js";
// 引入moment
import moment from "moment";

export default {
  // 注册报表组件
  components: {
    Charts
  },

  // 生命周期函数
  async mounted() {
    // 请求数据
    let { data } = await getOrderTotal({
      date: JSON.stringify(["2020-04-10 00:42:09", "2020-04-10 00:42:35"])
    });
    // 处理时间格式
    data.forEach(v => {
      v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
    });
    this.data = data; //保存数据
    // console.log(this.data);
    // 生成x轴的数据
    this.xData = data.map(v => v.orderTime);
    // 生成y轴数据
    let yArray = data.map(v => v.orderAmount);
    this.yData = [
      {
        name: "下单金额",
        type: "line",
        stack: "总量",
        data: yArray //y轴的数据
      }
    ];
    // 加载图表组件，渲染图表
    this.flag = true;
  },

  // 数据
  data() {
    return {
      data: [
        //下单时间、订单金额
        { orderTime: "2020-04-09T15:45:35.000Z", orderAmount: 10 },
        { orderTime: "2020-04-09T15:45:38.000Z", orderAmount: 10 },
        { orderTime: "2020-04-09T15:45:41.000Z", orderAmount: 10 },
        { orderTime: "2020-04-09T15:45:43.000Z", orderAmount: 10 },
        { orderTime: "2020-04-09T15:45:45.000Z", orderAmount: 10 },
        { orderTime: "2020-04-07T14:26:46.000Z", orderAmount: 10 }
      ],
      xData: [],
      yData: [],
      flag: false
    };
  }
};
</script>

<style lang="less" scoped>
</style>