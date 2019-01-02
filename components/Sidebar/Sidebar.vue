<template>
  <div :class="isCollapse ? 'sidebar sidebar-collapse' : 'sidebar'">
    <h1 class="app-title">
      无线电台管理系统
    </h1>
    <el-scrollbar style="height:100%">
      <el-menu 
        :collapse="isCollapse"
        :default-active="menu[0].name" 
        :collapse-transition="false" 
        background-color="#2f313a" 
        text-color="#fff" 
        active-text-color="#5d9bfb">
        <template v-for="menuItem in menu">

          <!--  一级菜单（包含子菜单）  -->
          <template v-if="menuItem.submenu">
            <el-submenu
              v-if="hasCap(menuItem)"
              :index="menuItem.name"
              :key="menuItem.name">
              <template slot="title">
                <i :class="menuItem.icon"/>
                <span>{{ menuItem.label }}</span>
              </template>
              <template v-for="submenuItem in menuItem.submenu">

                <!--  二级菜单 - 分组  -->
                <template v-if="submenuItem.group">
                  <el-menu-item-group
                    v-if="hasCap(submenuItem)"
                    :key="submenuItem.name"
                    :index="submenuItem.name">
                    <template slot="title">{{ submenuItem.label }}</template>
                    <el-menu-item
                      v-for="groupItem in submenuItem.list"
                      :key="groupItem.name"
                      :index="groupItem.name"
                      @click="skip(groupItem.link)">
                      {{ groupItem.label }}
                    </el-menu-item>
                  </el-menu-item-group>
                </template>

                <!--  二级菜单 - 不分组  -->
                <template v-else>
                  <el-menu-item
                    v-if="hasCap(submenuItem)"
                    :key="submenuItem.name"
                    :index="submenuItem.name"
                    @click="skip(submenuItem.link)">
                    <span slot="title">
                      {{ submenuItem.label }}
                    </span>
                  </el-menu-item>
                </template>

              </template>
            </el-submenu>
          </template>

          <!--  一级菜单  -->
          <template v-else>
            <el-menu-item
              v-if="hasCap(menuItem)"
              :index="menuItem.name" 
              :key="menuItem.name"
              @click="skip(menuItem.link)">
              <i :class="menuItem.icon"/>
              <span slot="title">{{ menuItem.label }}</span>
            </el-menu-item>
          </template>

        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {}
  },
  computed: {
    users () {
      return this.$store.state.users //获取user信息
    },
    ...mapState('sidebar', [
      'isCollapse',
      'menu'
    ])
  },
  created() {
    // console.log(this.$store.state.sidebar.menu)
    // console.log(this.$router.options.routes); // 用浏览器的控制台查看
  },
  methods:{
    // 菜单鉴权
    hasCap(item){
      return true;
      // TODO: 菜单级别鉴权
    },
    skip(subPath){
        this.$router.push('/admin'+subPath)
    }
  }
}
</script>
<style>
.sidebar {
  position: fixed;
  height: 100%;
  width: 300px;
  border-right: solid 1px #e6e6e6;
  background-color: rgb(47, 49, 58);
}
.sidebar .el-scrollbar {
  margin-top: -60px;
  padding-top: 60px;
}
.sidebar .el-scrollbar__wrap {
  overflow-x:hidden;
}
.sidebar .el-scrollbar__bar.is-horizontal {
  display: none;
}
.sidebar-collapse {
  width: 64px;
  overflow: hidden;
}
.sidebar-collapse .app-title {
  display: none;
}
.el-menu {
  height: 100%;
  border-right: 0;
}
.el-menu i {
  color: rgb(166, 171, 188);
  margin-right: 6px;
}
.app-title {
  font-size: 18px;
  line-height: 60px;
  margin-left: 15px;
  color: #fff;
}
</style>
