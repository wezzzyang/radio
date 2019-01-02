<template>
  <div class="table">
    <div class="table-header">
      233
    </div>
    <div class="table-content">
      <el-table :data="passports">
        <el-table-column 
          type="selection"
          width="55"/>
        <el-table-column 
          v-for="(item, index) in schema" 
          :key="index" 
          label="车主名字"
          prop="name"/>
        <el-table-column label="开始日期">
          <template slot-scope="scope">{{ scope.row.startDate }}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="table-footer">
      <el-pagination 
        :total="8" 
        :current-page="1" 
        :page-size="60"/>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    'data',
    'schema'
  ],
  data() {
    return {
      
    }
  },
}

</script>
<style>

</style>

