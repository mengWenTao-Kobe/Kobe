<template>
  <div class="orderdetail">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 卡片标题 -->
      <div slot="header" class="clearfix">
        <span>订单详情</span>
      </div>
      <!-- 卡片内容 -->
      <div class="content">
        <el-form ref="form" :model="form" label-width="80px" style="width:600px;" disabled>
          <!-- 下单时间 -->
          <el-form-item label="下单时间">
            <el-date-picker v-model="form.orderTime" type="datetime" placeholder="选择下单时间"></el-date-picker>
          </el-form-item>
          <!-- 订单号 -->
          <el-form-item label="订单号">
            <el-input v-model="form.orderNo"></el-input>
          </el-form-item>
          <!-- 联系电话 -->
          <el-form-item label="联系电话">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <!-- 收货人 -->
          <el-form-item label="收货人">
            <el-input v-model="form.consignee"></el-input>
          </el-form-item>
          <!-- 送达地址 -->
          <el-form-item label="送达地址">
            <el-input v-model="form.deliverAddress"></el-input>
          </el-form-item>
          <!-- 送达时间 -->
          <el-form-item label="送达时间">
            <el-date-picker v-model="form.deliveryTime" type="datetime" placeholder="选择送达时间"></el-date-picker>
          </el-form-item>
          <!-- 备注 -->
          <el-form-item label="备注">
            <el-input type="textarea" v-model="form.remarks"></el-input>
          </el-form-item>
          <!-- 订单金额 -->
          <el-form-item label="订单金额">
            <el-input v-model="form.orderAmount"></el-input>
          </el-form-item>
          <!-- 订单状态 -->
          <el-form-item label="订单状态">
            <el-select v-model="form.orderState" placeholder="请选择订单状态">
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
          <!-- 提交修改 -->
          <el-form-item>
            <el-button type="primary" @click="submitEdit">提交修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getOrderDetail } from "@/api/order";
export default {
  async created() {
    // 获取Order页面传递过来的参数
    let id = this.$route.query.id;
    console.log(id);
    // 将拿到的id用来请求数据
    let { data } = await getOrderDetail({ id });
    this.form = data;
  },
  data() {
    return {
      form: {
        id: 8,
        orderNo: "001",
        orderTime: "2020-04-09T16:42:30.000Z",
        phone: "13198535081",
        consignee: "小貂蝉",
        deliverAddress: "大邑",
        deliveryTime: "2020-04-16T14:21:04.000Z",
        remarks: "备注",
        orderAmount: 45,
        orderState: "已受理"
      }
    };
  },
  methods: {
    submitEdit(){}
  }
};
</script>

<style lang="less" scoped>
</style>