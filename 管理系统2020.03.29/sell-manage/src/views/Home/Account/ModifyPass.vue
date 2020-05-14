<template>
  <div class="modify-pass">
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>修改密码</span>
      </div>
      <!-- 表单 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="原密码" prop="oldPwd">
          <el-input type="password" v-model="ruleForm.oldPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="ruleForm.newPwd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPwd">
          <el-input type="password" v-model="ruleForm.confirmPwd" autocomplete="off"></el-input>
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
import { checkOld, modifyPwd } from "@/api/account.js";
// 引入local
import local from "@/utils/local";

export default {
  // 数据
  data() {
    // 自定义表单验证规则
    // 检查旧密码
    const checkOldPwd = async (rule, value, callback) => {
      if (value == "") {
        callback(new Error("必填字段"));
      } else {
        // 失焦时，如果value不是空，就发送ajax，检测旧密码是否正确
        let { code, msg } = await checkOld({ oldPwd: value });
        if (code == 11) {
          //{"code":"11","msg":"原密码错误"}
          callback(new Error(msg));
        } else {
          //{"code":"00","msg":"旧密码正确"}
          callback();
        }
      }
    };
    // 检查新密码
    const checkNewPwd = (rule, val, callback) => {
      if (!val) {
        callback(new Error("必填字段"));
      } else if (!pwdReg.test(val)) {
        callback(new Error("字母开头，4-13字节，字母/数字/下划线"));
      } else {
        if (this.ruleForm.confirmPwd !== "") {
          // 反向验证
          this.$refs.ruleForm.validateField("confirmPwd");
        }
        callback();
      }
    };
    // 确认新密码
    const checkConfirmPwd = (rule, val, callback) => {
      if (val === "") {
        callback(new Error("请再次输入密码"));
      } else if (val !== this.ruleForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      ruleForm: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      // 验证规则
      rules: {
        oldPwd: { required: true, validator: checkOldPwd, trigger: "blur" },
        newPwd: { required: true, validator: checkNewPwd, trigger: "blur" },
        confirmPwd: {
          required: true,
          validator: checkConfirmPwd,
          trigger: "blur"
        }
      }
    };
  },
  // 方法
  methods: {
    // 提交
    submitForm(formName) {
      // 这个方法会触发所有前端验证
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //如果前端验证通过
          let { code, msg } = await modifyPwd({ newPwd: this.ruleForm.newPwd });
          if (code === 0) {
            local.clear();  //清除token
            location.href = "/#/login";
          }
        } else {
          //如果前端验证不通过
          return false;
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.demo-ruleForm {
  width: 350px;
}
</style>