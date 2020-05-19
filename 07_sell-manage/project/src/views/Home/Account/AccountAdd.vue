<template>
  <div class="account-add">
    <el-card class="box-card">
      <!-- 头部 -->
      <div slot="header" class="clearfix">
        <span>添加帐号</span>
      </div>
      <!-- 内容 -->
      <div class="content">
        <!-- 表单 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" status-icon>
          <!-- 帐号 -->
          <el-form-item label="帐号" prop="account">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <!-- 用户组 -->
          <el-form-item label="用户组" prop="userGroup">
            <el-select v-model="form.userGroup" placeholder="请选择用户组">
              <el-option label="超级管理员" value="超级管理员"></el-option>
              <el-option label="普通管理员" value="普通管理员"></el-option>
            </el-select>
          </el-form-item>
          <!-- 添加和重置按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm">添加</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { accountAdd } from "@/api/account";
import { regAcc, regPwd } from "@/utils/reg";
export default {
  data() {
    let checkAcc = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入帐号"));
      } else if (!regAcc.test(value)) {
        callback(new Error("必须包含中文"));
      } else {
        callback();
      }
    };
    let checkPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (!regPwd.test(value)) {
        callback(new Error("字母开头，4-16字节，允许字字母、数字、下划线"));
      } else {
        callback();
      }
    };
    return {
      form: {
        account: "",
        password: "",
        userGroup: ""
      },
      rules: {
        account: { required: true, validator: checkAcc, trigger: "blur" },
        password: { required: true, validator: checkPwd, trigger: "blur" },
        userGroup: {
          required: true,
          message: "请选择用户组",
          trigger: "change"
        }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let { code, msg } = await accountAdd(this.form); //发送添加请求
          if (code === 0) this.$refs.form.resetFields(); //如果添加成功就重置表单
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.account-add {
  .box-card {
    .content {
      .el-form {
        width: 400px;
      }
    }
  }
}
</style>