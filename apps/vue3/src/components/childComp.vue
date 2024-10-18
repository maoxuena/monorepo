<!--
 * @Author: maoxuena
 * @Date: 2024-10-16 14:41:58
 * @LastEditors: maoxuena
 * @LastEditTime: 2024-10-18 10:21:14
 * @FilePath: \monorepo\apps\vue3\src\components\childComp.vue
 * @Description: 
-->
<template>
  <section>接收参数msg：{{ msg }}</section>
  <button @click="changeMsg">修改msg</button>
  <h1>--------------- 插槽 slot ---------------</h1>
  <!-- 匿名插槽 -->
  <slot />
  <!-- 具名插槽 -->
  <slot name="title" />
  <!-- 作用域插槽 -->
  <slot name="footer" :scope="msg" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { add, average } from 'utils'

const props = defineProps({
  msg: {
    type: String,
    default: '',
  },
})

const tip = ref('我是子组件' as string)
// 声明事件
const emit = defineEmits<{
  (e: 'updateMsg', msg: string): void
}>()
const changeMsg = (): void => {
  // 执行
  emit('updateMsg', 'hi! vue3')
}

console.log('utils add', add(1, 2))
console.log('utils average', average([1, 2, 3]))

defineExpose({
  tip,
  changeMsg,
})
</script>

<style scoped></style>
