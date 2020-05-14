<template>
  <div class="shop">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>店铺管理</span>
        <el-button
          :type="isDisabled?'success':'warning'"
          icon="el-icon-edit"
          class="edit-btn"
          size="medium"
          @click="eidt"
        >{{isDisabled?'编 辑':'禁 用'}}</el-button>
      </div>
      <div class="content">
        <!-- 表单 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="rule-ruleForm"
          :disabled="isDisabled"
        >
          <!-- 1.店铺id -->
          <!-- 2.店铺名 -->
          <el-form-item label="店铺名" prop="shopname">
            <el-input v-model="ruleForm.shopname"></el-input>
          </el-form-item>
          <!-- 3.店铺地址 -->
          <el-form-item label="店铺地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>
          <!-- 4.店铺电话 -->
          <el-form-item label="店铺电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <!-- 5.店铺描述 -->
          <el-form-item label="店铺描述" prop="shopdesc">
            <el-input v-model="ruleForm.shopdesc"></el-input>
          </el-form-item>
          <!-- 6.店铺广告语 -->
          <el-form-item label="店铺广告语" prop="slogan">
            <el-input v-model="ruleForm.slogan"></el-input>
          </el-form-item>
          <!-- 7.店铺分类 -->
          <el-form-item label="店铺分类" prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择店铺分类">
              <el-option label="川菜类" value="川菜类"></el-option>
              <el-option label="甜品类" value="甜品类"></el-option>
              <el-option label="外卖类" value="外卖类"></el-option>
            </el-select>
          </el-form-item>
          <!-- 8.店铺特色 -->
          <el-form-item label="店铺特色" prop="feature">
            <el-checkbox-group v-model="ruleForm.feature">
              <el-checkbox label="品质保证" name="feature"></el-checkbox>
              <el-checkbox label="蜂鸟专送" name="feature"></el-checkbox>
              <el-checkbox label="新店开铺" name="feature"></el-checkbox>
              <el-checkbox label="外卖保" name="feature"></el-checkbox>
              <el-checkbox label="准时达" name="feature"></el-checkbox>
              <el-checkbox label="开发票" name="feature"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <!-- 9.包装费 -->
          <el-form-item label="包装费" prop="packingexpense">
            <el-input-number
              v-model="ruleForm.packingexpense"
              @change="handleChange"
              :min="1"
              :max="99"
              label="包装费"
            ></el-input-number>
          </el-form-item>
          <!-- 10.起送价格 -->
          <el-form-item label="店铺名" prop="minprice">
            <el-input-number
              v-model="ruleForm.minprice"
              @change="handleChange"
              :min="1"
              :max="99"
              label="起送价格"
            ></el-input-number>
          </el-form-item>
          <!-- 11.营业时间 -->
          <el-form-item label="营业时间" prop="date">
            <el-date-picker
              value-format="yyyy-MM-dd HH:mm:ss"
              v-model="ruleForm.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
          <!-- 12.店铺头像 -->
          <el-form-item label="店铺头像" prop="shopAvatar">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:5000/shop/upload"
              :show-file-list="false"
              :on-success="shopAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="ruleForm.shopAvatar" :src="imgServeUrl+ruleForm.shopAvatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 13.营业执照 -->
          <el-form-item label="营业执照" prop="businessLicenseImg">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:5000/shop/upload"
              :show-file-list="false"
              :on-success="businessLicenseImgSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="ruleForm.businessLicenseImg"
                :src="imgServeUrl+ruleForm.businessLicenseImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 14.餐饮服务许可证 -->
          <el-form-item label="餐饮服务许可证" prop="cateringServiceLicenseImg">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:5000/shop/upload"
              :show-file-list="false"
              :on-success="cateringServiceLicenseImgSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="ruleForm.cateringServiceLicenseImg"
                :src="imgServeUrl+ruleForm.cateringServiceLicenseImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 15.优惠信息 -->
          <el-form-item label="优惠信息" prop="tableData">
            <el-input v-model="ruleForm.tableData"></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">保存修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// 引入请求函数
import { shopInfo, shopEdit } from "@/api/shop";
import moment from "moment";

export default {
  // 生命周期函数
  created() {
    this.getData();
  },
  // 数据
  data() {
    return {
      // 表单数据
      ruleForm: {
        id: "", //1.店铺id
        shopname: "", //2.店铺名
        address: "", //3.店铺地址
        phone: "", //4.店铺电话
        shopdesc: "", //5.店铺描述
        slogan: "", //6.店铺广告语
        category: "", //7.店铺分类
        feature: [], //8.店铺特色
        packingexpense: "", //9.包装费
        minprice: "", //10.起送价格
        date: [], //11.营业时间
        shopAvatar: "", //12.店铺头像
        businessLicenseImg: "", //13.营业执照
        cateringServiceLicenseImg: "", //14.餐饮服务许可证
        tableData: "" //15.优惠信息
      },
      isDisabled: true,
      // 验证规格
      rules: {
        shopname: { required: true, message: "必填字段", trigger: "blur" },
        address: { required: true, message: "必填字段", trigger: "blur" },
        phone: { required: true, message: "必填字段", trigger: "blur" },
        shopdesc: { required: true, message: "必填字段", trigger: "blur" },
        slogan: { required: true, message: "必填字段", trigger: "blur" },
        category: { required: true, message: "必填字段", trigger: "blur" },
        feature: { required: true, message: "必填字段", trigger: "blur" },
        packingexpense: {
          required: true,
          message: "必填字段",
          trigger: "blur"
        },
        minprice: { required: true, message: "必填字段", trigger: "blur" },
        date: { required: true, message: "必填字段", trigger: "blur" },
        shopAvatar: { required: true, message: "必填字段", trigger: "blur" },
        businessLicenseImg: {
          required: true,
          message: "必填字段",
          trigger: "blur"
        },
        cateringServiceLicenseImg: {
          required: true,
          message: "必填字段",
          trigger: "blur"
        },
        tableData: { required: true, message: "必填字段", trigger: "blur" }
      },
      // 商店图片存放的服务器地址
      imgServeUrl: "http://localhost:5000/upload/shop/"
    };
  },
  methods: {
    // 获取店铺详情函数
    async getData() {
      let { data } = await shopInfo();
      data.date = JSON.parse(data.date);
      data.feature = JSON.parse(data.feature);
      this.ruleForm = data;
    },
    handleChange() {},
    // 图片上传前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传成功时
    shopAvatarSuccess(res, file) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({
          type: "success",
          message: msg
        });
        this.ruleForm.shopAvatar = imgUrl;
      }
    },
    businessLicenseImgSuccess(res, file) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({
          type: "success",
          message: msg
        });
        this.ruleForm.businessLicenseImg = imgUrl;
      }
    },
    cateringServiceLicenseImgSuccess(res, file) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({
          type: "success",
          message: msg
        });
        this.ruleForm.cateringServiceLicenseImg = imgUrl;
      }
    },
    // 提交表单
    submitForm(formName) {
      // delete this.ruleForm.id;
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // 不是字符串就转为字符串
          this.ruleForm.feature = JSON.stringify(this.ruleForm.feature);
          this.ruleForm.date = JSON.stringify(this.ruleForm.date);
          // 发送求情确认修改
          let { code, msg } = await shopEdit(this.ruleForm);
          if (code === 0) {
            // 提交之后要重新加载，更新ruleForm数据，不然下次点提交有bug
            //就会转两次字符串，后台会挂掉，到时候拿不到数据
            this.getData();
            this.isDisabled = true;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    eidt() {
      this.isDisabled = !this.isDisabled;
    }
  }
};
</script>

<style lang="less" scoped>
.rule-ruleForm {
  width: 600px;
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}
.avatar {
  width: 150px;
  height: 150px;
  display: block;
}
.edit-btn {
  margin-left: 20px;
}
</style>