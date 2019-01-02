<template>
  <div class="page-manage-department">
    <div class="page-body">
      <el-card>
        <div slot="header">
          <el-button 
            type="primary" 
            size="mini">添加</el-button>
          <el-button 
            type="danger" 
            size="mini">删除</el-button>
        </div>
        <el-scrollbar style="height:100%">
          <el-container>   
            <el-tree
              ref="tree"
              :data="departments"
              show-checkbox
              default-expand-all
              node-key="id"
              highlight-current/>
          </el-container>
        </el-scrollbar>
      </el-card>
    </div>
  </div>
</template>
<script>
import ManagePage from '@/components/ManagePage/ManagePage'

export default {
  head: {
      title: '部门管理'
  },
  layout: 'admin',
  components: {
      ManagePage: ManagePage
  },
  data() {
      return {
          
      }
  },
  computed: {
    departments() {
      return [
        {
          id: 1,
          label: '华北理工大学',
          children: [
            {
              id: 2,
              label: '信息工程学院',
              children: [
                {
                  id: 8,
                  label: '计科2班'
                },
                {
                  id: 9,
                  label: '计科1班'
                },
              ]
            },
            {
              id: 3,
              label: '护理康复学院'
            },
            {
              id: 4,
              label: '公共卫生学院'
            },
          ]
        },
        {
          id: 5,
          label: '河北联合大学',
          children: [
            {
              id: 6,
              label: '信息工程学院'
            },
            {
              id: 7,
              label: '护理康复学院'
            }
          ]
        },
        {
          id: 5,
          label: '河北联合大学',
          children: [
            {
              id: 6,
              label: '信息工程学院'
            },
            {
              id: 7,
              label: '护理康复学院'
            }
          ]
        },
        {
          id: 5,
          label: '河北联合大学',
          children: [
            {
              id: 6,
              label: '信息工程学院'
            },
            {
              id: 7,
              label: '护理康复学院'
            }
          ]
        },
        {
          id: 5,
          label: '河北联合大学',
          children: [
            {
              id: 6,
              label: '信息工程学院'
            },
            {
              id: 7,
              label: '护理康复学院'
            }
          ]
        }
      ]
    }
  },
  beforeCreate() {
    this.$setPage({
      title: '部门管理',
      moduleName: 'staff/department'
    });
  },
  mounted() {
      
  },
  methods: {},
}
</script>
<style>
/* 自定义样式 */
.page-manage-department .page-body {
  padding: 10px;
}
.page-manage-department .el-container {
    height: 300px;
}
.page-manage-department .el-card .el-card__header {
    background-color: hsl(210, 9%, 96%);
}
</style>