<template>
  <div class="header">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="v.to" v-for="v in breadData" :key="v.to">{{v.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 右边 -->
    <div class="right">
      <el-dropdown>
        <!-- 下拉菜单 -->
        <span class="el-dropdown-link">
          欢迎您，{{account}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="personal">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 头像 -->
      <el-avatar :size="50" :src="baseUrl+imgUrl" v-if="imgUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
import local from "@/utils/local";
import { getAccountInfo, avatarEdit } from "@/api/account";
export default {
  created() {
    // 更新面包屑
    this.breadUpdate();
    // 获取账号信息
    this.getAccAvatar();
    // 接收到更新头像讯息时，又重新更新头像
    this.$bus.$on("updateAvatar", () => {
      this.getAccAvatar();
    });
  },
  data() {
    return {
      breadData: [],
      account: "",
      imgUrl: "",
      baseUrl: "http://localhost:5000/upload/account/"
    };
  },
  watch: {
    "$route.path"(newVal, oldVal) {
      this.breadUpdate();
    }
  },
  methods: {
    breadUpdate() {
      this.breadData = [{ to: "/home", title: "首页" }].concat(
        this.$route.meta.bread
      );
    },
    personal() {
      location.href = "/#/home/personal";
    },
    logout() {
      local.clear();
      this.$message.success("欢迎下次回来！");
      this.$router.push("/");
    },
    // 获取帐号信息
    async getAccAvatar() {
      let { accountInfo } = await getAccountInfo();
      let { account, imgUrl } = accountInfo;
      this.account = account;
      this.imgUrl = imgUrl;
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 60px 0 20px;
  .right {
    vertical-align: middle;
    display: flex;
    .el-dropdown {
      line-height: 50px;
      margin-right: 5px;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>