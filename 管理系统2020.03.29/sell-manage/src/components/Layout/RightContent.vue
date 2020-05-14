<template>
  <div class="right-content">
    <!-- 头部导航 -->
    <Header></Header>

    <!-- 内容 -->
    <main>
      <!-- 路由出口 -->
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  import Header from '../Layout/Header.vue'


  export default {
    components:{
      Header
    }
  }
</script>

<style lang="less" scoped>
  .right-content{
    flex: 1;
    background: #f0f2f5;
    display: flex;flex-direction: column;
    main{
      flex: 1;
      padding: 10px;
      box-sizing: border-box;
      overflow-y: scroll;
    }
  }
</style>