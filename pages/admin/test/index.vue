<template>
  <div class="page-manage-test">
    <el-button @click="batchAddUsers">测试</el-button>
  </div>
</template>
<script>
import Mock from 'mockjs'

export default {
  head: {
    title: '测试'
  },
  layout: 'admin',
  data() {
    return {}
  },
  beforeCreate() {
    this.$setPage({
      title: '',
      moduleName: ''
    });
  },
  methods: {
    async batchAddUsers() {
      await this.$axios.post(`http://127.0.0.1:8005/user-service/Account/basicUser`, {
        data: {
          account: 'admin2',
          password: '123456'
        }
      });
    }
  },
}
</script>
<style>
/* 自定义样式 */
</style>