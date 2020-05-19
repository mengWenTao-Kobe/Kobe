<template>
  <div class="login">
    <!-- 表单 -->
    <el-form
      :model="loginForm"
      status-icon
      :rules="rules"
      ref="loginForm"
      label-width="100px"
      class="login-form"
    >
      <el-form-item label="账号" prop="account">
        <el-input v-model="loginForm.account" prefix-icon="iconfont icon-zhanghao"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          :type="isOpen?'text':'password'"
          v-model="loginForm.password"
          autocomplete="off"
          prefix-icon="iconfont icon-mima"
          :suffix-icon="isOpen?'iconfont icon-yanjing_kai':'iconfont icon-yanjing-bi'"
          @click.native="changeIsOpen"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入接口函数
import { checkLogin } from "@/api/account";
// 引入正则
import { regAcc, regPwd } from "@/utils/reg";
// 引入本地存储工具函数
import local from "@/utils/local";
import session from "@/utils/session";

export default {
  data() {
    // 自定义验证规则
    let validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入帐号"));
      } else if (!regAcc.test(value)) {
        callback(new Error("必须包含中文"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!regPwd.test(value)) {
        callback(new Error("字母开头，4-16字节，允许字母数字下划线组合"));
      } else {
        callback();
      }
    };
    // 返回的数据
    return {
      loginForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          { required: true, validator: validateAccount, trigger: "blur" }
        ],
        password: [{ required: true, validator: validatePass, trigger: "blur" }]
      },
      isOpen: false
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          let { code, msg, token,role } = await checkLogin(this.loginForm);
          if (code === 0) {
            local.set("token", token);
            local.set("role", role);
            this.$router.push("/home");
          }
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.loginForm.resetFields();
    },
    changeIsOpen() {
      // 冒泡，点击所有东西都会触发，但是只有点icon-yanjing时才让isOpen取反
      if (event.target.className.includes("icon-yanjing")) {
        this.isOpen = !this.isOpen;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;
  /deep/.el-form-item__label {
    color: white;
  }
  .el-input {
    width: 400px;
  }
  /deep/.icon-zhanghao {
    font-size: 23px;
  }
  /deep/.icon-mima {
    font-size: 19px;
  }
  /deep/.el-input__suffix-inner {
    cursor: pointer;
  }
}
</style>