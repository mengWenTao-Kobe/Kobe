<template>
  <div class="add-account">
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加账号</span>
      </div>
      <!-- 表单 -->
      <el-form
        status-icon
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="帐号" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="用户组" prop="userGroup">
          <el-select v-model="ruleForm.userGroup" placeholder="请选择用户组">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入正则
import { accReg, pwdReg } from "@/utils/reg.js";
// 引入请求函数
import { addAcc, getAccList, delAcc } from "@/api/account.js";

export default {
  // 数据
  data() {
    // 自定义校验规则
    const checkAcc = (rule, value, callback) => {
      if (!value) {
        callback(new Error("帐号不能为空"));
      } else if (!rule.reg.test(value)) {
        callback(new Error("必须包含中文"));
      } else {
        callback();
      }
    };
    const checkPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error("密码不能为空"));
      } else if (!rule.reg.test(value)) {
        callback(new Error("字母开头，4-12字节，字母/数字/下划线"));
      } else {
        callback();
      }
    };
    return {
      // 表单数据
      ruleForm: {
        account: "",
        password: "",
        userGroup: ""
      },
      // 表单验证规则
      rules: {
        account: [
          { required: true, reg: accReg, validator: checkAcc, trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, reg: pwdReg, validator: checkPwd, trigger: "blur" }
        ],
        userGroup: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ]
      }
    };
  },
  // 方法
  methods: {
    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        // 通过前端验证
        if (valid) {
          let { code, msg } = await addAcc(this.ruleForm);
          if (code === 0) {
            //添加帐号成功
            // 跳转
            this.$router.push("/index/accountlist");
          }
        } else {
          //不通过前端验证
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.demo-ruleForm {
  width: 350px;
}
</style>