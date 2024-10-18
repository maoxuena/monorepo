<!--
 * @Author: maoxuena
 * @Date: 2024-10-16 14:43:53
 * @LastEditors: maoxuena
 * @LastEditTime: 2024-10-17 14:10:10
 * @FilePath: \monorepo\apps\vue2\src\App.vue
 * @Description: 
-->
<!-- 
1、data
2、method
3、computed
4、watch
5、props父传子
6、emit子传父
7、子组件变量或方法
8、插槽slot 
-->

<template>
  <div id="app">
    <h1 :style="style">Vue 2</h1>
    <h2 :style="style2">Vue 2</h2>
    <button @click="changeColor">改变颜色</button>
    <button @click="stopWatchEffect">停止监听</button>
    <div>count * 2 = {{ doubleCount }}</div>
    <childComp ref="childRef" :msg="msg" @updateMsg="updateMsg">
      <!-- 匿名插槽 -->
      <span>默认插槽</span>
      <!-- 具名插槽 -->
      <!-- <div slot="title">大概2.5之前</div> -->
      <!-- <template #title>v-slot:缩写</template> -->
      <template v-slot:title>
        <h1>具名插槽</h1>
      </template>
      <!-- 作用域插槽 -->
      <!-- <template slot-scope="scope"></template> -->
      <template v-slot:footer="scope">
        <footer>作用域插槽：{{ scope }}</footer>
      </template>
    </childComp>
  </div>
</template>

<script>
import childComp from './components/childComp.vue'

export default {
  name: 'App',
  components: {
    childComp,
  },
  data() {
    return {
      msg: 'hello world!',
      color: '#18b2fb',
      count: 1,
      state: {
        msg: 'hello world',
        color: '#ec4ef0',
      },
    }
  },
  computed: {
    style() {
      return {
        color: this.color,
      }
    },
    style2() {
      return {
        color: this.state.color,
      }
    },
    doubleCount() {
      return this.count * 2
    },
    watchState() {
      return JSON.stringify(this.state)
    },
  },
  watch: {
    color(newValue, oldValue) {
      console.log('color改变了', newValue, oldValue)
    },
    state: {
      handler(newVal, oldVal) {
        console.log(
          'state改变了',
          JSON.stringify(newVal),
          JSON.stringify(oldVal)
        )
      },
      deep: true,
      immediate: true,
    },
    'state.color'(newValue, oldValue) {
      console.log('state的color改变了', newValue, oldValue)
    },
    watchState: {
      handler() {
        // console.log('watchState改变了', JSON.stringify(newVal), JSON.stringify(oldVal))
      },
      immediate: true,
    },
  },
  methods: {
    generateRandomColor() {
      return `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padEnd(6, '0')}`
    },
    changeColor() {
      this.color = this.generateRandomColor()
      this.state.color = this.generateRandomColor()
    },
    updateMsg(data) {
      this.msg = data
    },
    stopWatchEffect() {
      this.stopWatch()
    },
  },
  mounted() {
    this.stopWatch = this.$watch('color', (newCount, oldCount) => {
      console.log(`color变成了${newCount}，之前是${oldCount}`)
    })

    // 获取子组件tip
    console.log('获取子组件tip', this.$refs.childRef.tip)
    // 执行子组件方法
    this.$refs.childRef.changeMsg()
  },
  created() {},
}
</script>

<style>
#app {
  margin-top: 60px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
