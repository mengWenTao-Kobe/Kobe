<template>
  <div class="home">
    <!-- 左侧导航 -->
    <Nav class="nav"></Nav>

    <!-- 右侧内容 -->
    <div class="right">
      <!-- 上面的头部 -->
      <Header class="header"></Header>
      <!-- 路由出口(下面的内容) -->
      <router-view class="rightContent"></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Layout/Header.vue";
import Nav from "@/components/Layout/Nav.vue";

export default {
  components: {
    Header,
    Nav
  }
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  height: 100%;
  .nav {
    flex: 0 0 200px;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
      flex: 0 0 60px;
    }
    .rightContent {
      flex: 1;
      background: #f0f2f5;
      padding: 20px;
    }
  }
}
</style>