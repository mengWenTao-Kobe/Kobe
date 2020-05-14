<template>
  <div class="account-list">
    <!-- 面板 -->
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>帐号列表</span>
      </div>

      <!-- 内容 -->
      <div>
        <!-- 表格 -->
        <el-table
          ref="accountTable"
          :data="tableData"
          style="width: 100%"
          @selection-change="selectChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="account" label="帐号" width="180"></el-table-column>
          <el-table-column prop="userGroup" label="用户组" width="180"></el-table-column>
          <el-table-column prop="ctime" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                <i class="el-icon-edit"></i> 编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                <i class="el-icon-delete"></i> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pagination">
          <!-- 分页组件 -->
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3,5,10,20,30,50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
        <!-- 批量删除和取消选择 -->
        <div class="batch-del-cancel-select">
          <el-button type="danger" size="medium" @click="batchDel">批量删除</el-button>
          <el-button type="primary" size="medium" @click="cancelSelect">取消选择</el-button>
        </div>

        <!-- 编辑模态框 -->
        <el-dialog title="修改帐号" :visible.sync="dialogFormVisible">
          <!-- 修改账号 表单 -->
          <el-form :model="form" class="edit-form" :rules="rules" ref="modifyForm" status-icon>
            <!-- 第一项 -->
            <el-form-item label="帐号" :label-width="formLabelWidth" prop="account">
              <el-input v-model="form.account" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 第二项 -->
            <el-form-item label="用户组" :label-width="formLabelWidth" prop="userGroup">
              <el-select v-model="form.userGroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="普通管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- 按钮 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">保存修改</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入请求函数
import {
  addAcc,
  getAccList,
  delAcc,
  batchDelAcc,
  saveEditAcc
} from "@/api/account.js";
// 引入时间处理模块
import moment from "moment";
// 引入正则
import { accReg, pwdReg } from "../../../utils/reg";

export default {
  data() {
    // 自定义验证规则
    let validateAcc = (rule, value, callback) => {
      // console.log(rule, value, callback)
      if (value === "") {
        callback(new Error("请输入帐号"));
      } else if (!accReg.test(value)) {
        callback(new Error("必须包含中文"));
      } else {
        callback();
      }
    };
    return {
      // 验证规则
      rules: {
        // 帐号验证规则
        account: [
          { required: true, validator: validateAcc, trigger: "blur" },
          { min: 3, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ],
        userGroup: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      // 表格数据
      tableData: [
        {
          id: 1,
          account: "admin",
          userGroup: "超级管理员",
          ctime: "2020/03/30",
          operation: "dd"
        }
      ],
      currentPage: 1, //当前页码
      pageSize: 5, //每页条数
      total: 388, //数据总条数
      dialogFormVisible: false, //控制模态框的显示与隐藏
      form: { id: "", account: "", userGroup: "" }, //和模态框双向绑定的数据
      formLabelWidth: "100px"
    };
  },
  created() {
    this.updateList(); //更新数据
  },
  methods: {
    // 点击编辑，回填数据，显示模态框
    handleEdit(index, row) {
      // 显示模态框
      this.dialogFormVisible = true;
      // 回填数据
      this.form = { ...row };
    },

    // 删除按钮的事件函数
    handleDelete(index, row) {
      // console.log("删除", index, row);
      // 优化体验
      this.$confirm("此操作将永久删除该帐号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code, msg } = await delAcc({ id: row.id });
          if (code === 0) {
            this.updateList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // pageSize（每页条数）改变时会触发
    handleSizeChange(size) {
      // console.log(size)
      this.pageSize = size;
      this.updateList();
    },
    // currentPage（当前页码）改变时会触发
    handleCurrentChange(cpage) {
      // console.log(cpage)
      this.currentPage = cpage;
      this.updateList();
    },

    // 取消选择
    cancelSelect() {
      this.$refs.accountTable.clearSelection();
    },

    // 批量删除
    batchDel() {
      // console.log("批量删除", this.ids);
      if (!this.ids || !this.ids.length) {
        // alert("请勾选要批量删除的项！");
        this.$message({
          message: "请勾选要您要删除的项！",
          type: "error"
        });
        return false;
      }
      // 优化体验
      this.$confirm("此操作将永久批量删除帐号, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code, msg } = await batchDelAcc({
            ids: JSON.stringify(this.ids)
          });
          if (code === 0) {
            this.updateList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 当选择项发生变化时会触
    selectChange(selection) {
      // console.log(selection)
      this.ids = selection.map(v => v.id);
    },

    // 获取列表，更新列表数据函数
    async updateList() {
      // 发送ajax获取数据
      let { total, data } = await getAccList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      // console.log(total,data)
      // 处理时间格式
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD HH:mm:ss");
      });
      // 更新数据从而渲染页面
      this.total = total;
      this.tableData = data;
      // 如果渲染过后，当前页没有数据，就把页数减1
      if (this.currentPage !== 1 && !this.tableData.length) {
        this.currentPage--;
        this.updateList();
      }
    },

    // 保存修改函数
    saveEdit() {
      this.$refs.modifyForm.validate(async flag => {
        // 如果通过验证
        if (flag) {
          let { id, account, userGroup } = this.form;
          let { code, msg } = await saveEditAcc({ id, account, userGroup });
          // 修改成功就隐藏模态框，并更新数据，修改不成功就不动
          if (code === 0) {
            this.updateList()
            this.dialogFormVisible = false;
          }
        } else {
          // 如果没有通过验证
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  margin-top: 20px;
}
.batch-del-cancel-select {
  margin-top: 20px;
}
.edit-form {
  width: 350px;
}
</style>