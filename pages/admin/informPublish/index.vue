<template>
  <div class="page-manage-informPublish">
    <ManagePage ref="page-manage-informPublish"/>
  </div>
</template>
<script>
import ManagePage from '@/components/ManagePage/ManagePage'

export default {
  head: {
    title: '信息的发布与推送'
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
      title: '信息的发布与推送',
      moduleName: 'informPublish/informPublish'
    });
  },
  methods: {},
}
</script>
<style>
/* 自定义样式 */
</style>