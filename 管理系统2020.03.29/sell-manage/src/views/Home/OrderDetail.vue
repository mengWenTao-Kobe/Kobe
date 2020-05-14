<template>
  <div class="order-detail">
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>订单详情</span>
      </div>
      <!-- 内容 -->
      <div class="content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="rule-ruleForm"
        >
          <!-- 1.订单号 -->
          <el-form-item label="订单号" prop="orderNo">
            <el-input v-model="ruleForm.orderNo"></el-input>
          </el-form-item>
          <!-- 2.下单时间 -->
          <el-form-item label="下单时间" prop="orderTime">
            <el-input v-model="ruleForm.orderTime" disabled></el-input>
          </el-form-item>
          <!-- 3.联系电话 -->
          <el-form-item label="联系电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <!-- 4.收货人 -->
          <el-form-item label="收货人" prop="consignee">
            <el-input v-model="ruleForm.consignee"></el-input>
          </el-form-item>
          <!-- 5.送货地址 -->
          <el-form-item label="送货地址" prop="deliverAddress">
            <el-input v-model="ruleForm.deliverAddress"></el-input>
          </el-form-item>
          <!-- 6.送达时间 -->
          <el-form-item label="送达时间" prop="deliveryTime">
            <el-input v-model="ruleForm.deliveryTime" disabled></el-input>
          </el-form-item>
          <!-- 7.备注 -->
          <el-form-item label="备注" prop="remarks">
            <el-input type="textarea" v-model="ruleForm.remarks"></el-input>
          </el-form-item>
          <!-- 8.订单金额 -->
          <el-form-item label="订单金额" prop="orderAmount">
            <el-input-number
              v-model="ruleForm.orderAmount"
              @change="handleChange"
              :min="1"
              :max="9999"
              label="订单金额"
            ></el-input-number>
          </el-form-item>
          <!-- 9.订单状态 -->
          <el-form-item label="订单状态" prop="orderState">
            <el-select v-model="ruleForm.orderState" placeholder="请选择订单状态">
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入请求函数
import { getOrderDetail, orderEdit } from "@/api/order";
// 引入session
import session from "@/utils/session";
// 引入moment
import moment from "moment";

export default {
  // 生命周期函数
  created() {
    this.getData();
  },

  // 数据
  data() {
    return {
      // 订单数据对象
      ruleForm: {
        id: "", //订单id
        orderNo: "", //订单号
        orderTime: "", //下单时间
        phone: "", //联系电话
        consignee: "", //收货人
        deliverAddress: "", //送货地址
        deliveryTime: "", //送达时间
        remarks: "", //备注
        orderAmount: "", //订单金额
        orderState: "" //订单状态
      },
      // 验证规格
      rules: {
        orderNo: [{ required: true, message: "请输入订单号", trigger: "blur" }],
        orderTime: [
          { required: true, message: "请输入下单时间", trigger: "blur" }
        ],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        consignee: [
          { required: true, message: "请输入收货人", trigger: "blur" }
        ],
        deliverAddress: [
          { required: true, message: "请输入送货地址", trigger: "blur" }
        ],

        deliveryTime: [
          { required: true, message: "请输入送达时间", trigger: "blur" }
        ],
        remarks: [{ required: true, message: "请输入备注", trigger: "blur" }],
        orderAmount: [
          { required: true, message: "请输入订单金额", trigger: "blur" }
        ],
        orderState: [
          { required: true, message: "请选择订单状态", trigger: "change" }
        ]
      }
    };
  },
  // 方法
  methods: {
    // 金额改变时
    handleChange(value) {
      console.log(value);
    },
    // 获取数据的方法
    async getData() {
      console.log(this.$route.query)  //也可以用这种方法传id
      let id = session.get("orderId");
      let { data } = await getOrderDetail({ id });
      data.orderTime = moment(data.orderTime).format("YYYY-MM-DD HH:mm:ss");
      data.deliveryTime = moment(data.deliveryTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.ruleForm = data;
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 查看参数
          console.log(this.ruleForm);
          let { code, msg } = await orderEdit(this.ruleForm);
          if (code === 0) {
            location.href = "/#/index/order";
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.el-col-2 {
  text-align: center;
}
.rule-ruleForm {
  width: 600px;
}
</style>