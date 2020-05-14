<template>
  <div class="test">
    <button @click="msg=!msg">点我</button>


    <input :value="something" @input="something = $event.target.value">
  </div>
</template>

<script>
export default {
  // 数据
  data() {
    return {
      msg: true,
      something:''
    };
  },
  watch: {
    msg(newVal, oldVal) {
      console.log(newVal, oldVal);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>