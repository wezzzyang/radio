<template>
  <div class="page-dashboard">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card>
          <h5 slot="header">基础信息</h5>
          <div class="card-body">
            1.车主总数
            2.车辆总数
            <el-button 
              type="primary" 
              @click="test">测试接口</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <h5 slot="header">通行证信息</h5>
          <div class="card-body">
            1.发放的通行证
            2.过期的通行证
            3.待审核的通行证
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data() {
    return {
    }
  },
  methods: {
    test() {
      this.$axios.get(`/user-service/User/personalInfo/username/admin`).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error);
      });
    }
  }
}
</script>
<style>

</style>
