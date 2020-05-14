<template>
  <div class="login">
    <div class="login-wrap">
      <h3>系统登录</h3>
      <!-- 登录表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="login-form"
      >
        <!-- 帐号 -->
        <el-form-item label="帐号" prop="account">
          <el-input
            type="text"
            prefix-icon="iconfont icon-zhanghao"
            v-model="ruleForm.account"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            @click.native="changeOpen"
            :type="isOpen?'text':'password'"
            prefix-icon="iconfont icon-mima"
            :suffix-icon="isOpen?'iconfont icon-yanjing_kai':'iconfont icon-yanjing-bi'"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 提交、重置 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 登录表单 -->
  </div>
</template>

<script>
// 引入正则
import { accReg, pwdReg } from "@/utils/reg.js";
// 引入请求函数
import { checkLogin } from "@/api/account.js";
// 引入本地存储工具函数
import local from "@/utils/local.js";

export default {
  // 数据驱动
  data() {
    // 自定义验证规则
    let checkAcc = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入帐号"));
      } else if (!accReg.test(value)) {
        callback(new Error("必须包含中文字符"));
      } else {
        callback();
      }
    };
    let checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!pwdReg.test(value)) {
        callback(new Error("字母开头，4-13字节，字母/数字/下划线"));
      } else {
        callback();
      }
    };

    return {
      // 登录表单数据
      ruleForm: {
        account: "",
        password: ""
      },
      // 验证规则数据
      rules: {
        account: [
          { required: true, validator: checkAcc, trigger: "blur" },
          { min: 2, max: 6, message: "长度在 2 到 6 个字符", trigger: "blur" }
        ],
        password: [{ required: true, validator: checkPwd, trigger: "blur" }]
      },
      // 是否打开密码显示
      isOpen: false
    };
  },

  methods: {
    // 提交登录表单事件函数
    submitForm() {
      this.$refs.ruleForm.validate(async valid => {
        // 如果通过前端验证
        if (valid) {
          // 发送ajax进行验证
          let { code, msg, token, role } = await checkLogin(this.ruleForm);
          // 如果登录成功
          if (code === 0) {
            local.set("token", token); // 将后台返回的token存入本地存储
            local.set("role", role); //把后台返回的role也存入本地
            // 跳转到后台首页
            this.$router.push("/index");
          }
        } else {
          console.log("前端验证不通过");
          return false;
        }
      });
    },
    // 重置表单事件函数
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 切换眼睛的显示与隐藏函数
    changeOpen() {
      if (event.target.className.includes("icon-yanjing")) {
        this.isOpen = !this.isOpen;
      }
    }
  }
};
</script>

<style lang="less" >
.login {
  .icon-zhanghao {
    font-size: 20px;
  }
  background: #2d3a4b;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-wrap {
    h3 {
      text-align: center;
      margin-bottom: 30px;
      font-size: 20px;
      padding-left: 80px;
      color: #fff;
    }
    .login-form {
      width: 500px;
      .el-form-item {
        // background-color: red;
        /deep/.el-form-item__label {
          color: white;
        }
      }
    }
  }
}
</style>