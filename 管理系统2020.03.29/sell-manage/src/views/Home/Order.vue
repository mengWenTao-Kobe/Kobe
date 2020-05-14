<template>
  <div class="order">
    <!-- 使用面板组件 -->
    <Panel>
      <!-- 标题 -->
      <span slot="title">订单管理</span>
      <!-- 内容 -->
      <div slot="content">
        <!-- 查询表单 -->
        <el-form size="small" :inline="true" :model="searchForm" class="search-form">
          <!-- 1.订单号 -->
          <el-form-item label="订单号">
            <el-input v-model="searchForm.orderNo" placeholder="订单号"></el-input>
          </el-form-item>
          <!-- 2.收货人 -->
          <el-form-item label="收货人">
            <el-input v-model="searchForm.consignee" placeholder="收货人"></el-input>
          </el-form-item>
          <!-- 3.手机号 -->
          <el-form-item label="手机号">
            <el-input v-model="searchForm.phone" placeholder="手机号"></el-input>
          </el-form-item>
          <!-- 4.订单状态 -->
          <el-form-item label="订单状态">
            <el-select v-model="searchForm.orderState" placeholder="订单状态">
              <el-option label="已受理" value="已受理"></el-option>
              <el-option label="派送中" value="派送中"></el-option>
              <el-option label="已完成" value="已完成"></el-option>
            </el-select>
          </el-form-item>
          <!-- 5.选择时间 -->
          <el-form-item label="选择时间">
            <el-date-picker
              v-model="searchForm.date"
              value-format="yyyy-MM-dd HH:mm:ss"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <!-- 查询按钮 -->
          <el-form-item>
            <el-button type="primary" @click="search">查询</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" border>
          <el-table-column fixed prop="id" label="订单id" width="80"></el-table-column>
          <el-table-column prop="orderNo" label="订单号" width="80"></el-table-column>
          <el-table-column prop="orderTime" label="下单时间" width="100"></el-table-column>
          <el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
          <el-table-column prop="consignee" label="收货人" width="100"></el-table-column>
          <el-table-column prop="deliverAddress" label="送货地址" width="150"></el-table-column>
          <el-table-column prop="deliveryTime" label="送达时间" width="100"></el-table-column>
          <el-table-column prop="remarks" label="备注" width="100"></el-table-column>
          <el-table-column prop="orderAmount" label="订单金额" width="100"></el-table-column>
          <el-table-column prop="orderState" label="订单状态" width="100"></el-table-column>
          <el-table-column fixed="right" label="操作" width="75">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3,5,10,20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
// 导入面板组件
import Panel from "@/components/Panel.vue";
// 引入请求函数
import { getOrderList } from "@/api/order";
// 引入moment
import moment from "moment";
// 引入session
import session from "@/utils/session";
import OrderDetailVue from './OrderDetail.vue';

export default {
  // 注册组件
  components: {
    Panel
  },

  // 生命周期函数
  created() {
    this.getData();
  },

  // 数据
  data() {
    return {
      // 表单数据
      searchForm: {
        orderNo: "", // 订单号
        consignee: "", //收货人
        phone: "", //联系电话
        orderState: "", //订单状态
        date: "" //时间
      },
      // 表格数据
      tableData: [
        {
          id: 8, //订单id
          orderNo: "1", //订单号
          orderTime: "2020-04-07T14:26:46.000Z", //下单时间
          phone: "13198535081", //联系电话
          consignee: "小貂蝉", //收货人
          deliverAddress: "大邑", //送货地址
          deliveryTime: "2020-04-16T14:21:04.000Z", //送达时间
          remarks: "备注", //备注
          orderAmount: 30, //订单金额
          orderState: "已受理" //订单状态
        }
      ],
      total: 99, //总条数
      currentPage: 1, //当前页码
      pageSize: 5 //每页条数
    };
  },
  // 函数
  methods: {
    search() {
      this.getData();
    },
    resetForm() {
      // this.$refs.searchForm111.resetFields();
      this.searchForm = {
        orderNo: "", // 订单号
        consignee: "", //收货人
        phone: "", //联系电话
        orderState: "", //订单状态
        date: "" //时间
      };
      this.getData();
    },
    // 每页条数改变时
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    // 当前页改变时
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    // 获取数据的方法
    async getData() {
      let params = {
        currentPage: this.currentPage, //当前页码
        pageSize: this.pageSize, //每页条数
        orderNo: this.searchForm.orderNo,
        consignee: this.searchForm.consignee,
        phone: this.searchForm.phone,
        orderState: this.searchForm.orderState,
        date: JSON.stringify(this.searchForm.date)
      };
      let { total, data } = await getOrderList(params);
      this.total = total;
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
      });
      // 赋值渲染
      this.tableData = data;
    },
    // 查看
    handleClick(row) {
      // console.log(row);
      session.set('orderId',row.id)
      // location.href = "/#/index/orderdetail";
      this.$router.push({ //路由传参
        path:'/index/orderdetail',
        query:{
          id:row.id,
          name:'小貂蝉',
          age:18
        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.el-table {
  width: 850px;
  margin-top: 30px;
}
.pagination {
  margin-top: 20px;
}
</style>