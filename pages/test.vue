<template>
  <div class="page-manage-test">
    <ManagePage ref="page-manage-test"/>
  </div>
</template>
<script>
import ManagePage from '@/components/ManagePage/ManagePage'

export default {
  head: {
    title: '测试'
  },
  layout: 'admin',
  components: {
    ManagePage: ManagePage
  },
  data() {
    return {}
  },
  beforeCreate() {
    this.$setPage({
      title: '测试',
      moduleName: 'test/test'
    });
  },
  methods: {},
}
</script>
<style>
/* 自定义样式 */
</style>