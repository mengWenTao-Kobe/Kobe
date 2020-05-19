<template>
  <div class="order">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 卡片标题 -->
      <div slot="header" class="clearfix">
        <!-- 行内表单 -->
        <el-form ref="searForm" inline :model="formInline" class="search-from" size="small">
          <!-- 订单号 -->
          <el-form-item label="订单号">
            <el-input v-model="formInline.orderNo" placeholder="订单号"></el-input>
          </el-form-item>
          <!-- 收货人 -->
          <el-form-item label="收货人">
            <el-input v-model="formInline.consignee" placeholder="收货人"></el-input>
          </el-form-item>
          <!-- 收货人 -->
          <el-form-item label="手机号">
            <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <!-- 订单状态 -->
          <el-form-item label="订单状态">
            <el-select v-model="formInline.orderState" placeholder="订单状态">
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
          <!-- 选择时间 -->
          <el-form-item label="选择时间">
            <el-date-picker
              v-model="formInline.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </el-form-item>
          <!-- 查询和重置 -->
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 卡片内容 -->
      <div class="content">
        <!-- 表格 -->
        <el-table :data="tableData" border style="width: 900px">
          <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="165"></el-table-column>
          <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
          <el-table-column prop="consignee" label="收货人" width="100"></el-table-column>
          <el-table-column prop="deliverAddress" label="配送地址" width="220"></el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="165"></el-table-column>
          <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="100"></el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          style="margin-top:20px;"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[3, 5, 10, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入请求函数
import { getOrderList } from "@/api/order";
// 引入moment
import moment from "moment";

export default {
  async created() {
    this.render();
  },
  data() {
    return {
      // 表单数据
      formInline: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: ["2020-04-10 00:42:09", "2020-06-17 23:31:35"]
      },
      // 表格数据
      tableData: [
        {
          id: 1,
          orderNo: "008",
          orderTime: "2020-04-09T16:42:35.000Z",
          phone: "13198535081",
          consignee: "孟文韬",
          deliverAddress: "四川省成都市高新区！！！",
          deliveryTime: "2020-04-16T14:21:04.000Z",
          remarks: "这是一个大大滴备注哦",
          orderAmount: 77,
          orderState: "派送中"
        }
      ],
      total: 99,
      currentPage: 1,
      pageSize: 5
    };
  },
  methods: {
    // 查询
    onSubmit() {
      this.render();
    },
    // 重置
    onReset() {
      this.formInline = {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      };
      this.render();
    },
    handleClick(row) {
      console.log(row);
    },
    // 每页条数改变
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.render();
    },
    // 当前页码改变
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.render();
    },
    // 渲染页面函数
    async render() {
      let { total, data } = await getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.formInline.orderNo,
        consignee: this.formInline.consignee,
        phone: this.formInline.phone,
        orderState: this.formInline.orderState,
        date: JSON.stringify(this.formInline.date)
      });
      // 把data的时间格式处理一下
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
      });
      this.tableData = data;
      this.total = total;
    }
  }
};
</script>

<style lang="less" scoped>
</style>