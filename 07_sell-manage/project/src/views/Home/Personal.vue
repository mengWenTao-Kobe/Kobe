<template>
  <div class="personal">
    <Panel>
      <!-- 标题 -->
      <div slot="title" class="title">管理员信息</div>
      <!-- 内容 -->
      <div class="content" slot="content">
        <div>管理员ID：{{accountInfo.id}}</div>
        <el-divider></el-divider>
        <div>帐号：{{accountInfo.account}}</div>
        <el-divider></el-divider>
        <div>用户组：{{accountInfo.userGroup}}</div>
        <el-divider></el-divider>
        <div>创建时间：{{accountInfo.ctime}}</div>
        <el-divider></el-divider>
        <div>
          管理员头像：
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="serverUrl+imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-button type="primary" @click="updateAvatar">修改头像</el-button>
        </div>
      </div>
    </Panel>
  </div>
</template>

<script>
import Panel from "@/components/Panel.vue";
import { getAccountInfo, avatarEdit } from "@/api/account";

export default {
  components: {
    Panel
  },
  async created() {
    let { accountInfo } = await getAccountInfo();
    this.accountInfo = accountInfo;
  },
  data() {
    return {
      accountInfo: {
        /* id: 225
        ctime: "2020-05-09T23:20:29.000Z"
        account: "小貂蝉"
        password: "a666"
        userGroup: "超级管理员"
        imgUrl: "default.jpg" */
      },
      imgUrl: "",
      serverUrl: "http://localhost:5000/upload/account/"
    };
  },
  methods: {
    // 头像上传前
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
    // 头像上传成功时的钩子函数
    handleAvatarSuccess(res, file) {
      let { code, msg, imgUrl } = res;
      if (res.code === 0) {
        this.$message.success(msg);
        this.imgUrl = imgUrl;
      }
    },
    // 修改头像
    async updateAvatar() {
      // 把图片文件名更新数据库
      let { code, msg } = await avatarEdit({ imgUrl: this.imgUrl });
      if(code===0){
        this.$bus.$emit('updateAvatar')
      }
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
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 130px;
  height: 130px;
  line-height: 130px;
  text-align: center;
}
.avatar {
  width: 130px;
  height: 130px;
  display: block;
}
</style>