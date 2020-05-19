<template>
  <!-- 卡片 -->
  <el-card class="box-card">
    <!-- 标题 -->
    <div slot="header" class="clearfix">
      <slot name="title"></slot>
    </div>
    <!-- 内容 -->
    <div>
      <slot name="content"></slot>
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
</style>