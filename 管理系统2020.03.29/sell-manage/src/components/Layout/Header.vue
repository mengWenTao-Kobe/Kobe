<template>
  <div class="header">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="(v,i) in breadcrumbArr" :key="i" :to="{ path: v.path }">{{v.title}}</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 个人中心 -->
    <div class="right-box">
      <!-- 下拉框 -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎你，{{acc}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="ppersonal">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 头像，当有头像文件名时，拼接头像地址，从而显示头像 -->
      <el-avatar v-if="imgUrl" :size="circleSize" :src="avatarServeUrl+imgUrl"></el-avatar>
    </div>
  </div>
</template>

<script>
// 引入本地存储工具函数
import local from "@/utils/local";
// 引入获取账号信息函数
import { getInfo } from "@/api/account";

export default {
  // 生命周期函数
  created() {
    // 一进来就获取帐号和头像信息并更新数据
    this.getAccAvatar();
    // 监听个人中心的组件通讯（更新头像通讯），接收到通讯
    this.$bus.$on("updateAvatar", () => {
      // 接收到更新头像通讯后，调用获取帐号和头像文件名函数
      this.getAccAvatar(); //重新请求数据，更新数据
    });

    // 打印路由信息
    // console.log(this.$route);
    // 改变面包屑面包屑
    this.metaChange();
  },
  data() {
    return {
      circleSize: 50, //头像大小
      acc: "", //帐号
      imgUrl: "", //头像文件名
      // 头像图片服务器地址
      avatarServeUrl: "http://localhost:5000/upload/account/",
      // 面包屑数据
      breadcrumbArr: [
        { path: "/index/home", title: "首页" }
        // { path: "/index/goodslist", title: "商品列表" },
        // { path: "/index/goodsedit", title: "编辑商品" }
      ]
    };
  },
  methods: {
    // 下拉框的点击事件
    handleCommand(command) {
      // 如果点的是退出系统
      if (command === "logout") {
        // 退出系统
        local.clear() //清除token
        this.$message({
          //弹出提示
          type: "success",
          message: "退出成功，欢迎下次回来"
        });
        // 跳转到登录页面
        location.href = "/#/login";
        // 如果点的是个人中心
      } else {
        // 如果点的是个人中心，就跳转到个人中心
        location.href = "/#/index/personal";
      }
    },
    // 获取帐号和头像图片文件名并更新数据
    async getAccAvatar() {
      let { accountInfo } = await getInfo();
      this.acc = accountInfo.account;
      this.imgUrl = accountInfo.imgUrl;
    },
    // 根据meta对象改变breadcrumbArr的数据
    metaChange() {
      // console.log(this.$route.meta);
      this.breadcrumbArr = [
        { path: "/index/home", title: "首页" },
        this.$route.meta.bread
      ];
    }
  },
  watch: {
    // 监听路由地址改变
    "$route.path"(newVal, oldVal) {
      // console.log('浏览器地址栏发生变化啦')
      // console.log(newVal,oldVal)
      // 改变面包屑
      this.metaChange();
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 30px;
  flex: 0 0 60px;
  background: #fff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-breadcrumb {
  line-height: 52px;
}
// .right-box{vertical-align: middle;}
.el-dropdown {
  top: -20px;margin-right: 8px;
}
</style>