<template>
  <!-- 面板插槽组件的封装 -->
  <el-card class="box-card">
    <!-- 面板头部 -->
    <div slot="header" class="clearfix">
      <!-- 预留插槽的位置，使用组件时，可以把东西插进来 -->
      <slot name="title"></slot>
    </div>
    <!-- 面板内容 -->
    <div class="content">
      <!-- 预留插槽的位置，使用组件时，可以把东西插进来 -->
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>