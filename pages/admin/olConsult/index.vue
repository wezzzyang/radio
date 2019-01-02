<template>
  <div class="page-manage-olConsult">
    <ManagePage ref="page-manage-olConsult"/>
  </div>
</template>
<script>
import ManagePage from '@/components/ManagePage/ManagePage'

export default {
  head: {
    title: '在线咨询'
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
      title: '在线咨询',
      moduleName: 'olConsult/olConsult'
    });
  },
  methods: {},
}
</script>
<style>
/* 自定义样式 */
</style>