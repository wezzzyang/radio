<template>
  <div class="page-manage-user">
    <ManagePage ref="page-manage-user">
      <!--  自定义列  -->
      <template slot="el-table-column-password">
        <el-table-column label="密码">
          <template slot-scope="scope">
            <el-button 
              type="text" 
              size="small">修改密码</el-button>
          </template>
        </el-table-column>
      </template>
      <template slot="el-table-column-avatar">
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatar">
          </template>
        </el-table-column>
      </template>
      <template slot="el-table-column-role">
        <el-table-column
          :filters="roleFilters"
          prop="role"
          column-key="role"
          label="角色">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.role">{{ scope.row.role.label }}</el-tag>
          </template>
        </el-table-column>
      </template>
      <template slot="el-table-column-actions">
        <el-table-column 
          label="操作" 
          width="360">
          <template slot-scope="scope">
            <el-button
              size="mini"
              plain
              @click="openEditItemDialog(scope.row)">
              编辑
            </el-button>
            <el-button
              type="warning"
              size="mini"
              plain
              @click="handleLogOff(scope.row)">
              注销
            </el-button>
            <el-button
              type="info"
              size="mini"
              plain
              @click="handleResetPassword(scope.row)">
              重置密码
            </el-button>
            <el-button
              type="danger"
              size="mini"
              plain
              @click="handleDelItem(scope.row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </template>
      <!--  添加对话框 字段  -->
      <!-- <template slot="dialog-add-field-role">
        233
      </template> -->
    </ManagePage>
  </div>
</template>
<script>
import ManagePage from '@/components/ManagePage/ManagePage'
import { mapActions } from 'vuex'

export default {
  head: {
    title: '用户管理'
  },
  layout: 'admin',
  components: {
    ManagePage: ManagePage
  },
  data() {
    return {
      roleFilters: []
    }
  },
  computed: {
    
  },
  beforeCreate() {
    this.$setPage({
      title: '用户管理',
      moduleName: 'user/user'
    });
  },
  async mounted() {
    let roles = await this.getRoleList() || [];

    this.roleFilters = roles.map(function(role) {
      return {
        text: role.label,
        value: role.id
      }
    });

  },
  methods: {
    ...mapActions('user/user', ['getRoleList']),
    /*  打开 编辑对话框  */
    openEditItemDialog(row) {
      this.$refs['page-manage-user'].openEditItemDialog(row);
    },
    /*  注销用户  */
    handleLogOff(row) {
      
    },
    /*  重置密码  */
    handleResetPassword(row) {

    },
    /*  删除列表项  */
    handleDelItem(row) {
      this.$refs['page-manage-user'].handleDelItem(row);
    }
  },
}
</script>
<style>
/* 自定义样式 */
</style>