<template>
  <div class="account-list">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>帐号列表</span>
      </div>
      <!-- 内容 -->
      <div class="content">
        <!-- 表格 -->
        <el-table
          :data="tableData"
          style="width: 100%"
          ref="accountTable"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="account" label="帐号"></el-table-column>
          <el-table-column prop="userGroup" label="用户组"></el-table-column>
          <el-table-column prop="ctime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[3, 5, 10, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
        <!-- 批量删除+取消选择 -->
        <div>
          <el-button type="danger" @click="batchDel">批量删除</el-button>
          <el-button type="primary" @click="cancelSelect">取消选择</el-button>
        </div>
        <!-- Dialog对话框 -->
        <el-dialog title="账号编辑" :visible.sync="dialogFormVisible" width="500px">
          <el-form :model="editForm">
            <el-form-item label="帐号" :label-width="formLabelWidth">
              <el-input v-model="editForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户组" :label-width="formLabelWidth">
              <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitEdit">保存修改</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入moment
import moment from "moment";
/* id: 3
ctime: "2020-04-10T06:44:00.000Z"
account: "赵子龙"
password: "a666"
userGroup: "普通管理员"
imgUrl: "default.jpg" */
// 引入请求函数
import {
  getAccountList,
  accountBatchDel,
  accountEdit,
  accountDel
} from "@/api/account";

export default {
  async created() {
    this.render();
  },
  data() {
    return {
      tableData: [],
      currentPage: 1, //当前页码
      pageSize: 5, //每页条数
      total: 99, //总条数
      selectionArr: [], //选中的row组成的数组
      dialogFormVisible: false, //对话框显示隐藏
      editForm: {},
      formLabelWidth: "120px" //lable宽度
    };
  },
  methods: {
    // 编辑账号
    handleEdit(index, row) {
      this.dialogFormVisible = true;  //显示模态框
      this.editForm = { ...row }; //数据回填
    },
    // 提交编辑
    async submitEdit() {
      let { id, account, userGroup } = this.editForm;
      let { code } = await accountEdit({ id, account, userGroup });
      if (code === 0) {
        this.dialogFormVisible = false;
        this.render();
      }
    },
    // 删除帐号
    async handleDelete(index, row) {
      let { code } = await accountDel({ id: row.id });
      if (code === 0) this.render();
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
    // 取消选择
    cancelSelect() {
      this.$refs.accountTable.clearSelection();
    },
    // 选项改变时触发，回传一个由row组成的数组进来
    handleSelectionChange(selectionArr) {
      this.selectionArr = selectionArr; //更新selectionArr
    },
    // 点击批量删除时，就把selectionArr中的ids传过去
    async batchDel() {
      if (this.selectionArr.length) { //没有长度后台会挂掉
        let ids = JSON.stringify(this.selectionArr.map(row => row.id));
        let { code } = await accountBatchDel({ ids });
        // 如果删除成功，还要重新渲染页面
        if (code === 0) {
          this.render();
        }
      }
    },
    // 抽取渲染页面函数
    async render() {
      let { total, data } = await getAccountList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
      });
      this.tableData = data;
      this.total = total;
      // 如果返回的数组没有长度且当前页码大于1
      if (!data.length && this.currentPage > 1) {
        this.currentPage--;
        this.render();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.account-list {
  .box-card {
    .content {
      .el-pagination {
        margin: 15px 0;
      }
    }
  }
}
</style>