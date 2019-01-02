<template>
  <div class="page-personOwner">
    <ManagePage ref="page-manage-personOwner">
      <!--  自定义列  -->
      <template slot="el-table-column-name">
        <el-table-column label="姓名">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
      </template>
    </ManagePage>
  </div>
</template>
<script>
import ManagePage from '@/components/ManagePage/ManagePage'
import { mapMutations } from 'vuex'

export default {
  head: {
    title: '个人信息'
  },
  layout: 'admin',
  components: {
    ManagePage: ManagePage
  },
  data() {
    return {
      query: {
        type: 1,
        status: 1
      }
    }
  },
  beforeCreate() {
    this.$setPage({
      title: '个人信息',
      moduleName: 'owner/personOwner'
    });
  },
  mounted() {
    console.log(this.$refs['page-manage-personOwner']);
  },
  methods: {},
}
</script>
<style>
/*
.select-type,
.select-status {
  width: 120px;
}*/
</style>

