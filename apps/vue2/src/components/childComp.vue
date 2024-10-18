<template>
  <div>
    <section>接收参数msg：{{ msg }}</section>
    <button @click="changeMsg">修改msg</button>
    <h1>--------------- 插槽 slot ---------------</h1>
    <!-- 匿名插槽 -->
    <slot :scope="msg" />
    <!-- 具名插槽 -->
    <slot name="title" />
    <!-- 作用域插槽 -->
    <slot name="footer" :scope="msg" />
  </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tip: '我是子组件',
    }
  },
  methods: {
    changeMsg() {
      this.$emit('updateMsg', 'hi! vue2')
    },
  },
}
</script>

<style scoped></style>
