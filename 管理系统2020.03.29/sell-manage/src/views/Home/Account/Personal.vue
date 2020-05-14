<template>
  <div class="personal">
    <!-- 卡片 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人中心</span>
      </div>
      <!-- 内容部分 -->
      <div class="content">
        <p>
          管理员ID：
          <span>{{accountInfo.id}}</span>
        </p>
        <el-divider></el-divider>
        <p>
          帐号：
          <span>{{accountInfo.account}}</span>
        </p>
        <el-divider></el-divider>
        <p>
          用户组：
          <span>{{accountInfo.userGroup}}</span>
        </p>
        <el-divider></el-divider>
        <p>
          创建时间：
          <span>{{accountInfo.ctime|filterTime}}</span>
        </p>
        <el-divider></el-divider>
        <p>头像：</p>

        <!-- 头像 -->
        <el-upload
          class="avatar-uploader"
          action="http://localhost:5000/users/upload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <!-- 拼接图片地址，把图片回显出来 -->
          <img v-if="imageUrl" :src="avatarServeUrl+imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!-- 修改头像按钮 -->
      <el-button type="primary" size="small" @click="updateAvatar">修改头像</el-button>
    </el-card>
  </div>
</template>

<script>
// 引入请求函数
import { getInfo, saveAvatar } from "../../../api/account";
// 引入moment模块
import moment from "moment";

export default {
  // 生命周期created中，发送请求，更新数据，渲染页面
  async created() {
    let { accountInfo } = await getInfo();
    // console.log(accountInfo);
    this.accountInfo = accountInfo;
  },

  data() {
    return {
      // 账号信息
      accountInfo: {
        id: 0,
        ctime: "",
        account: "",
        password: "",
        userGroup: "",
        imgUrl: ""
      },
      imageUrl: "", //头像的文件名
      // 头像图片服务器地址
      avatarServeUrl: "http://localhost:5000/upload/account/"
    };
  },
  methods: {
    // 头像上传前对格式和大小做限制
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

    // 当头像上传到"http://localhost:5000/users/upload"这个地址时
    handleAvatarSuccess(res, file) {
      // console.log(res, file); {code: 0, msg: "上传成功!", imgUrl: "1586004928755.jpg"}
      let { code, msg, imgUrl } = res; //后端接收上传请求 响应回来的数据
      if (code === 0) {
        // 弹提示
        this.$message({
          type: "success",
          message: msg
        });
        // 将拿到的图片名给到 imageUrl
        this.imageUrl = imgUrl;
      }
    },

    // 回填地址之后，图片就显示出来了，点击修改头像，发送ajax请求，更新数据库 更新头像
    async updateAvatar() {
      // 发送ajax请求，让后台操作数据库，接收响应 {"code":0,"msg":"修改头像成功!"}
      let { code, msg } = await saveAvatar({ imgUrl: this.imageUrl });
      if (code === 0) {
        // 组件通讯，发出更新头像通讯
        this.$bus.$emit("updateAvatar");
      }
    }
  },
  // 过滤器
  filters: {
    filterTime(ctime) {
      return moment(ctime).format("YYYY/MM/DD HH:mm:ss");
    }
  }
};
</script>

<style lang="less" scoped>
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
.avatar-uploader {
  margin: 10px 0;
}
</style>