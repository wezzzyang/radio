<template>
  <div class="page-passport">
    <ManagePage ref="page-manage-passport"/>
  </div>
</template>
<script>
import ManagePage from '@/components/ManagePage/ManagePage'
import { mapMutations } from 'vuex'
 
export default {
  head: {
    title: '通行证'
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
      title: '通行证',
      moduleName: 'passport/passport'
    });
  },
  methods: {},
}
</script>
<style>
.select-type,
.select-status {
  width: 120px;
}
</style>