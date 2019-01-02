<template>
  <div class="page-manage-controlReport">
    <ManagePage ref="page-manage-controlReport"/>
  </div>
</template>
<script>
import ManagePage from '@/components/ManagePage/ManagePage'

export default {
  head: {
    title: '监督举报'
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
      title: '监督举报',
      moduleName: 'controlReport/controlReport'
    });
  },
  methods: {},
}
</script>
<style>
/* 自定义样式 */
</style>  