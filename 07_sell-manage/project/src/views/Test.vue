<template>
  <div class="test">
    <h1>测试</h1>
    <input :value="something" @input="onInput">
    <button @click="handleBtn($event)">点我</button>
    <button @click="setCookie">设置cookie</button>
    <button @click="getCookie">获取cookie</button>
    <!-- 图片懒加载 -->
    <p v-for="v in 99" :key="v"><img v-lazy="imgUrl" alt=""></p>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        something:'sdfdsfds',
        imgUrl:'https://goss.veer.com/creative/vcg/veer/800water/veer-150325295.jpg'
      }
    },
    methods:{
      handleBtn(e){
        console.log(e)
      },
      onInput(){
        this.something=event.target.value
      },
      setCookie(){
        document.cookie="name=zhangsan,age=19"
      },
      getCookie(){
        document.cookie.split('=')
      }
    }
  }
</script>

<style lang="less" scoped>

</style>