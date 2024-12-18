<template>
  <el-menu active-text-color="#ffd04b" background-color="#545c64" class="aside-container" default-active="2"
    text-color="#fff" @open="handleOpen" @close="handleClose" :collapse="menu.isCollapse">
    <p class="aside-title">{{ menu.isCollapse ? 'DIDI' : 'DIDI陪诊' }}</p>
    <!-- 向子组件传递props值的时候推荐使用kebab-case写法 -->
    <TreeMenu :menu-data="menuData" :index="1" />
  </el-menu>
</template>

<script setup>
import { reactive } from 'vue';
import TreeMenu from './treeMenu.vue';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '../store/menu';
const router = useRouter()
// console.log('route', route)
// console.log('router', router.options.routes[0].children)
const menuData = reactive(router.options.routes[0].children)
const menu = useMenuStore()
const handleOpen = () => {

}
const handleClose = () => {

}
</script>

<style lang="less" setup>
.aside-title {
  font-size: 20px;
  text-align: center;
  color: aliceblue;
  line-height: 40px;
  height: 40px;
}

.aside-container:not(.el-menu--collapse) {
  width: 230px;
  height: 100%;
}
</style>