<template>
  <el-container class="app">
    <el-aside
      :style="asideStyle"
      class="app-sidebar">
      <Sidebar>侧边栏</Sidebar>
    </el-aside>
    <el-container class="app-content">
      <el-header class="app-header">
        <Navbar>菜单</Navbar>
      </el-header>
      <el-main class="app-main">
        <el-scrollbar>
          <nuxt/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Sidebar from '~/components/Sidebar/Sidebar'
import Navbar from '~/components/Navbar/Navbar'
import { mapState } from 'vuex';

export default {
  components: {
    Sidebar, Navbar
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('sidebar', [
      'isCollapse'
    ]),
    asideStyle() {
      if(this.isCollapse) {
        return {
          'width': '64px',
          'flex': '0 0 64px'
        }
      } else {
        return {
          'width': '300px',
          'flex': '0 0 300px'
        }
      }
    }
  }
}
</script>
<style>
html, body {
  height: 100%;
  font-family: 'Microsoft Yahei Light';
}
#__nuxt, #__layout {
  height: 100%;
}
.app {
  display: flex;
  height: 100%;
}
.app-sidebar {
  flex: 0 0 300px;
  width: 300px;
  height: 100%;
}
.app-header {
  padding: 0;
}
.app-content {
  flex: 1;
  min-height: 100%;
  background-color: #eee;
}
.app-main>.el-scrollbar>.el-scrollbar__wrap {
  margin-bottom: 0 !important;
  overflow-x: hidden;
}
.app-main {
  padding: 0;
}
</style>
