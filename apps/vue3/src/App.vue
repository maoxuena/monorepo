<!--
 * @Author: maoxuena
 * @Date: 2024-10-16 14:40:31
 * @LastEditors: maoxuena
 * @LastEditTime: 2024-10-18 10:58:00
 * @FilePath: \monorepo\apps\vue3\src\App.vue
 * @Description: 
-->
<template>
  <!-- Vue2中，template标签中只能有一个根元素，在Vue3中允许多个 -->
  <h1 class="h1">Vue 3</h1>
  <h2 class="h2">Vue 3</h2>
  <button @click="changeColor">改变颜色</button>
  <button @click="stopWatchEffect">停止监听</button>
  <div>count * 2 = {{ doubleCount }}</div>
  <childComp ref="childRef" :msg="msg" @updateMsg="updateMsg">
    <!-- 匿名插槽 -->
    <span>默认插槽</span>
    <!-- 具名插槽 -->
    <template #title>
      <h1>具名插槽</h1>
    </template>
    <!-- 作用域插槽 -->
    <template #footer="{ scope }">
      <footer>作用域插槽：{{ scope }}</footer>
    </template>
  </childComp>
</template>

<script setup lang="ts">
import {
  reactive,
  ref,
  computed,
  watch,
  watchEffect,
  onMounted,
  nextTick,
} from 'vue'
// 组件直接引入即可使用，不需注册
import childComp from './components/childComp.vue'

const msg = ref('hello world!')
const color = ref('#18b2fb')
const count = ref(1)

const state = reactive({
  msg: 'hello world',
  color: '#ec4ef0',
})

// 声明method方法
const generateRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padEnd(6, '0')}`
const changeColor = () => {
  state.color = generateRandomColor()
  color.value = generateRandomColor()
}

// 通过computed获得doubleCount
const doubleCount = computed(() => {
  return count.value * 2
})

const watchState = computed(() => {
  return JSON.stringify(state)
})

// 监听 ref 定义的响应式数据
watch(color, (newVal, oldVal) => {
  console.log('1、color改变了', newVal, oldVal)
})

// 监听 reactive 定义的响应式数据
watch(state, (newVal, oldVal) => {
  console.log('2、state改变了', newVal, oldVal)
})
watch(watchState, (newVal, oldVal) => {
  // console.log('3、watchState改变了', newVal, oldVal)
})

// 监听多个响应式数据
watch([color, state], ([newVal1, newVal2], [oldVal1, oldVal2]) => {
  console.log('4、监听的color,state中至少有一个改变了')
  console.log('color', newVal1, oldVal1)
  console.log('state', newVal2, oldVal2)
})

watch(
  () => [color.value, state.color],
  (newVal, oldVal) => {
    console.log(
      '5、深度监听监听的color,state中至少有一个改变了',
      newVal,
      oldVal
    )
  }
)

// 监听对象中某个属性的变化： 监听count
watch(
  () => state.color,
  (newVal, oldVal) => {
    console.log('6、state.color', oldVal, newVal)
  }
)

// 深度监听（deep)、默认执行（immediate）
watch(
  () => state.color,
  (newVal, oldVal) => {
    console.log('7、state.color 深度监听、默认执行', oldVal, newVal)
  },
  {
    immediate: true, // 立即执行
    deep: true, // 深度监听
  }
)

// watchEffect 函数不需要指定监听哪个数据，只要在 watchEffect 函数中用到的数据发生了变化，watchEffect 函数就会执行。
// 会监听引用数据类型的所有属性，不需要具体到某个属性，一旦运行就会立即监听，组件卸载的时候会停止监听。
const stop = watchEffect(() => {
  console.log('watchEffect')
  console.log('8、color：', color.value)
  console.log('9、state：', state)
})

const stopWatchEffect = () => {
  stop()
}

const updateMsg = (data: string) => {
  msg.value = data
}

const childRef = ref(null as any)

// nextTick
nextTick(() => {
  // 获取子组件tip
  console.log('获取子组件tip', childRef.value.tip)
  // 执行子组件方法
  childRef.value.changeMsg()
})

onMounted(() => {
  // // 获取子组件tip
  // console.log('获取子组件tip', childRef.value.tip);
  // // 执行子组件方法
  // childRef.value.changeMsg();
})
</script>

<style scoped>
.h1 {
  /* 支持CSS变量注入 */
  color: v-bind(color);
}
.h2 {
  color: v-bind('state.color');
}
</style>
