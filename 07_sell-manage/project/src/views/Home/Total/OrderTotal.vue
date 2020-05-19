<template>
  <div class="order-total">
    <Panel class="card">
      <!-- 标题 -->
      <span slot="title">订单统计</span>
      <!-- 内容 -->
      <div class="content" slot="content">
        <!-- 行内表单 -->
        <el-form inline :model="formInline" class="demo-form-inline" size="small">
          <el-form-item label="时间范围">
            <el-date-picker
              v-model="formInline.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 使用图表组件 -->
        <Charts
          :xData="orderTime"
          :title="title"
          :legend="legend"
          :series="series"
          v-if="orderAmount.length"
        ></Charts>
      </div>
    </Panel>
  </div>
</template>

<script>
import { orderTotal } from "@/api/charts";
import Panel from "@/components/Panel.vue";
import Charts from "@/components/Charts.vue";
import moment from "moment";

export default {
  components: {
    Panel,
    Charts
  },
  created() {
    this.render();
  },
  updated() {},
  data() {
    return {
      formInline: {
        date: ["2020-04-10 00:42:09", "2020-04-10 00:42:35"] //查询日期
      },
      orderTime: [], //下单时间，横坐标
      orderAmount: [], //订单金额，纵坐标
      title: "订单统计",
      legend: ["订单金额"]
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
          data: this.orderAmount //通过本地数据orderAmount把series算出来
        }
      ];
    }
  },
  methods: {
    onSubmit() {
      // 点击查询的时候，如果修改了查询日期，由于是双向绑定，本地日期也会改变
      // 由于本地日期改变了，调用渲染函数传入后台的日期也会改变，得到的响应数据就会改变
      this.render();
    },
    onReset() {},
    // 渲染页面函数
    async render() {
      // 把查询日期传进去，得到响应数据
      let { data } = await orderTotal({
        date: JSON.stringify(this.formInline.date)
      });
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
      });
      this.orderTime = data.map(v => v.orderTime); //赋值给下单时间
      this.orderAmount = data.map(v => v.orderAmount); //赋值给订单金额
    }
  }
};
</script>

<style lang="less" scoped>
.order-total {
  #main {
    width: 600px;
    height: 400px;
    margin-top: 30px;
  }
}
</style>