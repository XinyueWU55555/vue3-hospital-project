<template>
  <div class="header-container">
    <div class="header-left">
      <el-icon size="20" class="icon" @click="menu.changeMenuState()">
        <Fold />
      </el-icon>
      <ul class="menu-list">
        <!-- class的数组写法和对象语法 -->
        <li :class="[route.path === item.meta.path ? 'selected' : '']" class="menu-item"
          v-for="(item, index) in menuList" :key="item.meta.path" @click="handleClick(item)">
          <el-icon size="20">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.name }}</span>
          <el-icon @click.stop="handleCancel(item, index)" class="delete">
            <Close />
          </el-icon>
        </li>
      </ul>
    </div>
    <div class="header-right">
      <el-dropdown>
        <span class="el-dropdown-link flex-box">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="user-name">admin</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from '../store/menu';

const router = useRouter()
const route = useRoute()
// console.log('route', route)
const menu = useMenuStore()
const menuList = menu.menuList
// console.log('menuList', menuList)

const handleClick = (item) => {
  // console.log('item.meta.path', item.meta.path)
  router.push(item.meta.path)
}
const handleCancel = (item, index) => {
  // 点击关闭按钮后删除列表相关item
  menu.deleteMenuList(item)
  // 如果关闭的不是当前页，直接返回不做操作
  if (item.meta.path !== route.path) {
    return
  }

  // 如果关闭的item标签是当前页，判断item标签是不是menuList的最后一项，如果是则跳转前一项，如果不是则跳转后一项
  // 为什么这里不用length-1呢，因为前面删掉了一个item
  if (index === menuList.length) {
    // 跳转前一项
    // console.log('@', menuList[index - 1].meta.path)
    // 这里遇到一个坑，因为我的handleClick是写在整个li上的，而handleCancle是写在li的子元素el-icon上的，
    // 所以会触发冒泡，这会导致这里的代码被handleClick中的router.push覆盖，跳转不成功的假象
    if (!menuList.length) {
      // 如果length为0了，就跳转到/
      router.push('/')
    } else {
      router.push(menuList[index - 1].meta.path)
    }

  } else if (index !== menuList.length) {
    // 跳转后一项，原来的item已经删掉了
    router.push(menuList[index].meta.path)
  }


}
</script>

<style lang="less" scoped>
.flex-box {
  display: flex;
  align-items: center;
}

.header-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding-right: 25px;

  .header-left {
    height: 100%;
    display: flex;

    .menu-list {
      display: flex;

      .menu-item {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 0 10px;
        transition: all 0.2s linear;

        span {
          margin: 0 5px;
        }

        .delete {
          cursor: pointer;
          visibility: hidden;
        }

        // &表示与menu-item同级
        &.selected {
          color: #409eff;
          background-color: #f5f5f5;
        }
      }

      .menu-item:hover {
        background-color: #f5f5f5;

        .delete {
          visibility: visible;
        }
      }
    }

    .icon {
      height: 100%;
      width: 45px;
      transition: all 0.2s linear;
    }

    .icon:hover {
      background: #f5f5f5;
      cursor: pointer;
    }
  }

  .header-right {
    .user-name {
      margin-left: 10px;
    }
  }

}
</style>