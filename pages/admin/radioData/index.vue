<template>
  <div class="page-manage-电台信息">
    <ManagePage ref="page-manage-电台信息"/>
  </div>
</template>
<script>
import ManagePage from '@/components/ManagePage/ManagePage'

export default {
  head: {
    title: '电台信息'
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
      title: '电台信息',
      moduleName: 'radioData/radioData'
    });
  },
  methods: {},
}
</script>
<style>
/* 自定义样式 */
</style>