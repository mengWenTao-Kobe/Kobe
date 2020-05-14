<template>
  <div class="index">
    <!-- 3.使用，左侧导航 -->
      <Nav></Nav>
    <!-- 3.使用，右侧内容 -->
    <right-content></right-content>
  </div>
</template>

<script>
  // 1.引入
  import Nav from '../components/Layout/Nav.vue'
  import RightContent from '../components/Layout/RightContent.vue'

  export default {
    // 2.注册
    components:{
      Nav,
      RightContent
    }
  }
</script>

<style lang="less" scoped>
  .index{
    height: 100%;
    display: flex;
  }
</style>