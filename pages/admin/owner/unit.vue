<template>
  <div class="page-manage-unitOwner">
    <ManagePage ref="page-manage-unitOwner"/>
  </div>
</template>
<script>
import ManagePage from '@/components/ManagePage/ManagePage'

export default {
  head: {
    title: '单位车主'
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
      title: '单位车主',
      moduleName: 'owner/unitOwner'
    });
  },
  methods: {},
}
</script>
<style>
/* 自定义样式 */
</style>