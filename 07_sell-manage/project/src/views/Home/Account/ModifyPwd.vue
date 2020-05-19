<template>
  <div class="modify-pwd">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 标题 -->
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <!-- 内容 -->
      <div class="content">
        <!-- 表单 -->
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="modify-pwd-form"
        >
          <!-- 原密码 -->
          <el-form-item label="原密码" prop="oldPwd">
            <el-input type="password" v-model="ruleForm.oldPwd" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 新密码 -->
          <el-form-item label="新密码" prop="newPwd">
            <el-input type="password" v-model="ruleForm.newPwd" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确认新密码 -->
          <el-form-item label="确认新密码" prop="sureNewPwd">
            <el-input type="password" v-model="ruleForm.sureNewPwd" autocomplete="off"></el-input>
          </el-form-item>
          <!-- 确定和重置按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { regPwd } from "@/utils/reg";
import { checkOldPwd, passwordEdit } from "@/api/account";
import local from "@/utils/local";

export default {
  data() {
    // 验证旧密码
    let validateOldPwd = async (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入原密码"));
      } else {
        let { code } = await checkOldPwd({ oldPwd: value });
        if (code == "11") {
          callback(new Error("原密码错误"));
        } else if (code == "5001") {
          callback(new Error("参数错误"));
        } else if (code == "00") {
          callback();
        }
      }
    };
    // 验证新密码
    let validateNewPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (!regPwd.test(value)) {
        callback(new Error("字母开头，4-16字节，允许字母数字下划线组合"));
      } else {
        if (this.ruleForm.sureNewPwd !== "") {
          this.$refs.ruleForm.validateField("sureNewPwd");
        }
        callback();
      }
    };
    // 确认新密码
    let validateSureNewPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.ruleForm.newPwd) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPwd: "",
        newPwd: "",
        sureNewPwd: ""
      },
      rules: {
        oldPwd: [
          { required: true, validator: validateOldPwd, trigger: "blur" }
        ],
        newPwd: [
          { required: true, validator: validateNewPwd, trigger: "blur" }
        ],
        sureNewPwd: [
          { required: true, validator: validateSureNewPwd, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let { code } = await passwordEdit({ newPwd: this.ruleForm.newPwd });
          if (code === 0) {
            local.clear()
            this.$router.push("/login");
          }
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.modify-pwd {
  .box-card {
    .content {
      .modify-pwd-form {
        width: 460px;
      }
    }
  }
}
</style>