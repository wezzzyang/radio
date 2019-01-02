<template>
  <el-row 
    class="app-navbar" 
    type="flex"
    justify="space-between">
    <el-col class="navbar-title">
      <a
        class="navbar-btn-toggle"
        href="#"
        @click="toggleSidebar">
        <i class="iconfont icon-menu"/>
      </a>
      <span class="navbar-title-text">{{ title }}</span>
    </el-col>
    <el-col class="navbar-search">
      <el-input
        v-model="keyword"
        class="navbar-search-input" 
        placeholder="搜索功能">
        <i 
          slot="prefix"
          class="el-input__icon el-icon-search"/>
      </el-input>
    </el-col>
    <el-col class="navbar-notice">
      <el-dropdown>
        <el-badge 
          :value="12"
          class="navbar-notice-badge">
          <el-button 
            class="navbar-notice-button" 
            icon="iconfont icon-bell"/>
        </el-badge>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            .
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
    <el-col class="navbar-user">
      <el-dropdown>
        <el-button class="navbar-user-button">
          <img
            class="navbar-user-avatar"
            src="http://images.liqucn.com/img/h1/h991/img201712091739260_info400X400.jpg">
          <span class="navbar-user-nickname">{{ userInfo.username }}</span>
          <i class="el-icon-arrow-down el-icon--right"/>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="handleLogout">退出登陆</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    title() {
      return this.$store.getters['navbar/title'];
    },
    userInfo() {
      console.log(this.$store.getters['user/userInfo']);
      return this.$store.getters['user/userInfo'];
    }
  },
  methods: {
    ...mapMutations('sidebar', [
      'toggleSidebar'
    ]),
    /*  退出登录  */
    handleLogout() {
      console.log(233);
      this.$store.dispatch('user/logout');
    }
  }
}
</script>
<style>
.app-navbar {
  height: 60px;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  background-color: #fff;
}
/*  导航栏 - 标题  */
.navbar-title {
  line-height: 40px;
}
.navbar-btn-toggle {
  margin-left: 8px;
  margin-right: 8px;
  text-decoration: none;
}
.navbar-title-text {
  font-family: 'Microsoft Yahei Light';
  font-weight: 700;
  color: #333;
}

/*  导航栏 - 搜索  */
.navbar-search {
  flex: 1;
}
.navbar-search-input input {
  width: 200px;
  border: 0;
  border-bottom: 1px solid #ddd;
  border-radius: 0;
}

/*  导航栏 - 通知盒子  */
.navbar-notice {
  flex: 0;
  margin: 0 5px;
  z-index: 9;
  margin-right: 10px;
}
.navbar-notice-badge .el-badge__content {
  top: 10px;
  right: 16px;
}
.navbar-notice-button {
  padding: 12px 12px;
  border: 0;
}
.navbar-notice-button:hover {
  background-color: #f1f1f1;
}

/*  导航栏 - 用户菜单  */
.navbar-user {
  flex: 0;
}
.navbar-user-button {
  padding: 12px 12px;
  border: 0;
}
.navbar-user-button:focus .navbar-user-button:hover {
  background-color: #f1f1f1;
}
.navbar-user-avatar {
  height: 27px;
  width: 27px;
  border: 3px solid #ddd;
  border-radius: 50%;
  margin: -8px 2px -8px 0;
}
.navbar-user-nickname {
  line-height: 18px;
}
</style>
