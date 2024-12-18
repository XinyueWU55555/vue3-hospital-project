<template>
  <template v-for="item in props.menuData" :key="`${props.index}-${item.meta.id}`">
    <!-- 遍历数据,判断,如果数据项没有children属性，则渲染<el-menu-item>,如果有children属性,就渲染el-sub-menub标签 -->
    <el-menu-item @click="handleClick(item, `${props.index}-${item.meta.id}`)"
      v-if="!item.children || item.children.length === 0" :index="`${props.index}-${item.meta.id}`">
      <!-- el-icon为SVG图标提供属性 -->
      <el-icon size="20">
        <!-- 动态组件,item.meta.icon图标组件名，坑：不能写成自闭合 -->
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span> {{ item.meta.name }}</span>
    </el-menu-item>
    <el-sub-menu v-else :index="`${props.index}-${item.meta.id}`">
      <template #title>
        <el-icon size="20">
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span> {{ item.meta.name }}</span>
      </template>
      <!-- 组件递归渲染 -->
      <TreeMenu :menu-data="item.children" :index="`${props.index}-${item.meta.id}`" />
    </el-sub-menu>
  </template>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useMenuStore } from '../store/menu';
// 如果一个 prop 的名字很长，应使用 camelCase 形式
// 组件名我们推荐使用 PascalCase，因为这提高了模板的可读性，能帮助我们区分 Vue 组件和原生 HTML 元素
const props = defineProps(['menuData', 'index'])
// 创建router实例
const router = useRouter()
const menu = useMenuStore()
// 点击菜单
const handleClick = (item, active) => {
  // console.log('点击的item', item)
  // console.log(menu)
  menu.addMenuList(item)
  router.push(item.meta.path)
  // console.log(route)
}
</script>

<style></style>