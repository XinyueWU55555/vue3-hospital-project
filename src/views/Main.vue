<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '../components/aside.vue';
import Header from '../components/header.vue'
</script>

<style lang="less" setup>
.common-layout {
  height: 100vh;

  .el-container {
    height: 100%;

    .el-header {
      padding: 0;
    }
  }
}
</style>
