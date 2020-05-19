<template>
  <button :class="classObj" class="my-button" :disabled="disabled" @click="fn" @mouseover="mouseover">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: "normal"
    },
    round: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created() {
    // console.log(this.round)
    console.log(this.disabled);
  },
  data() {
    return {};
  },
  computed: {
    classObj() {
      return {
        primary: this.type === "primary",
        success: this.type === "success",
        danger: this.type === "danger",
        normal: this.type === "normal",
        round: this.round,
        disabled: this.disabled
      };
    }
  },
  methods: {
    fn() {
      this.$emit("handleClick", "参数");
    },
    mouseover(){
      this.$emit('xxx','你进来啦！！！')
    }
  }
};
</script>

<style lang="less" scoped>
.primary {
  background: blue;
  color: white;
}
.success {
  background: green;
  color: white;
}
.danger {
  background: deeppink;
  color: white;
}
.normal {
  background: purple;
  color: white;
}
.round {
  border-radius: 50%;
}
.disabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
}
.my-button:active {
  opacity: 0.7;
}
</style>