<template>
  <div class="page-manage">
    <main class="page-body">
      <el-card class="card-table">
        <!--  表格顶部工具条  -->
        <div 
          slot="header"
          class="table-top">
          <slot name="table-top">
            <div class="table-top-left">
              <slot name="table-top-left">
                <el-input
                  :value="queryParam.searchValue" 
                  class="table-search-input" 
                  placeholder="请输入关键词" 
                  size="medium"
                  @change="handleSearchValueChange">
                  <el-select 
                    slot="prepend" 
                    :value="queryParam.searchProp"
                    @change="handleSearchPropChange">
                    <el-option 
                      v-for="(searchField, index) in searchFields"
                      :key="index"
                      :label="searchField.label" 
                      :value="searchField.prop"/>
                  </el-select>
                  <el-button 
                    slot="append" 
                    icon="el-icon-search"
                    @click="handleSearch"/>
                </el-input>
              </slot>
            </div>
            <div class="table-top-right">
              <slot name="table-top-right">
                <el-button 
                  type="primary"
                  size="small"
                  @click="openAddItemDialog">
                  添加{{ setting.label }}
                </el-button>
                <el-button
                  :disabled="!isSelectedItem"
                  type="danger"
                  size="small"
                  @click="handleDelSelectdItem">
                  删除所选
                </el-button>
              </slot>
            </div>
          </slot>
        </div>
        <!--  表格  -->
        <el-table
          ref="table"
          :data="list"
          :stripe="true"
          :default-sort="defaultSort"
          @selection-change="handleTableSelect"
          @filter-change="handleFilterChange"
          @sort-change="handleSortChange">
          <el-table-column 
            type="selection"
            width="55"/>
          <template v-for="(field, index) in schema">
            <slot :name="'el-table-column-' + field.prop">
              <el-table-column 
                :key="index"
                :prop="field.prop"
                :label="field.label"
                :sortable="field.sortable"
                :filters="field.filters"
                :width="field.width"
                :column-key="field.prop"/>
            </slot>
          </template>
          <slot name="el-table-column-actions">
            <el-table-column label="操作">
              <template slot-scope="scope">                
                <el-button
                  type="text"
                  size="small"
                  @click="openEditItemDialog(scope.row)">
                  编辑
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="handleDelItem(scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </slot>
        </el-table>
        <!--  表格底部工具条  -->
        <div class="table-bottom">
          <el-pagination
            :total="total"
            :page-sizes="setting.pageSizes"
            class="footer-total"
            layout="total, sizes"
            @size-change="handlePageSizeChange"/>
          <el-pagination
            :total="total"
            :page-size="queryParam.pageSize"
            class="footer-pagination"
            background
            layout="jumper, prev, pager, next"
            @current-change="handlePageIndexChange"/>
        </div>
      </el-card>
    </main>
    <div class="page-cover">
      <!--  添加列表项 对话框  -->
      <el-dialog 
        v-if="showAddItemDialog"
        :visible.sync="showAddItemDialog"
        :title="'添加' + setting.label">
        <div class="dialog-content">
          <el-form
            ref="addItemForm" 
            :model="newItem"
            :rules="rules"
            label-width="90px">
            <template 
              v-for="(field, index) in schema" 
              v-if="!field.readonly">
              <slot :name="'dialog-add-field-' + field.prop">
                <Field
                  :key="index"
                  v-model="newItem[field.prop]"
                  :field="field"/>
              </slot>
            </template>
          </el-form>
        </div>
        <div 
          slot="footer" 
          class="dialog-footer">
          <el-button @click="closeAddItemDialog()">取 消</el-button>
          <el-button 
            type="primary" 
            @click="handleAddItem">确 定</el-button>
        </div>
      </el-dialog>
      <!--  编辑列表项 对话框  -->
      <el-dialog
        v-if="showEditItemDialog"
        :visible.sync="showEditItemDialog" 
        :title="'编辑' + setting.label">
        <div class="dialog-content">
          <el-form 
            ref="editItemForm" 
            :rules="rules"
            :model="thisItem" 
            label-width="90px">
            <Field
              v-for="(field, index) in schema"
              v-model="thisItem[field.prop]"
              :key="index"
              :field="field"/>
          </el-form>
        </div>
        <div 
          slot="footer" 
          class="dialog-footer">
          <el-button @click="closeEditItemDialog">取 消</el-button>
          <el-button 
            type="primary" 
            @click="handleEditItem">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>   
</template>
<script>
import Field from '@/components/Field/Field'
import qs from 'qs'

export default {
  components: {
    Field: Field
  },
  props: {
  },
  data() {
    return {
      /*  临时数据  */
      newItem: {},
      thisItem: {},
      defaultItem: {},
      selection: [],
      rules: {},
      defaultSort: {},
      searchValue: null,
      
      /*  界面状态  */
      showAddItemDialog: false,
      showEditItemDialog: false,
      isSelectedItem: false
    }
  },
  computed: {
    moduleName() {
      return this.$store.state.current.moduleName;
    },
    setting() {
      return this.$store.getters[`${this.moduleName}/setting`];
    },
    schema() {
      let schema = this.$store.getters[`${this.moduleName}/schema`];

      if(!schema) {
        return [];
      } else {
        return schema;
      } 
    },
    list() {
      return this.$store.getters[`${this.moduleName}/list`];
    },
    total() {
      return this.$store.getters[`${this.moduleName}/total`];
    },
    queryParam() {
      let queryParam = this.$store.getters[`${this.moduleName}/queryParam`];
      if(!queryParam) {
        return {
          searchProp: null,
          searchValue: null
        }
      } else {
        return queryParam;
      }
    },
    searchFields() {
      let schema = this.schema || [];
      let searchFields = schema.filter(function(field) {
        return field.searchable === true;
      });

      return searchFields;
    },
  },
  mounted() {
    /*  生成默认的空对象  */
    let schema = this.schema;

    for(let field of schema) {
      this.rules[field.prop] = field.rule;
      this.defaultItem[field.prop] = null;
    }

    /*  异步获取表格数据   */
    this.$store.dispatch(`${this.moduleName}/fetchList`);

    // 设置默认的搜索字段
    if(Array.isArray(this.searchFields) && this.searchFields[0]) {
      this.setQueryParam({
        searchProp: this.searchFields[0].prop
      });
    }
    
  },
  methods: {
    /*  打开 添加对话框  */
    openAddItemDialog() {
      this.newItem = this.defaultItem;
      this.showAddItemDialog = true;
    },
    /*  关闭 添加对话框  */
    closeAddItemDialog() {
      this.showAddItemDialog = false;
    },
    /*  打开 编辑对话框  */
    openEditItemDialog(row) {
      // 通过对象合并的方式进行深拷贝
      this.thisItem = Object.assign(this.thisItem, row);
      this.showEditItemDialog = true;
    },
    /*  关闭 添加对话框  */
    closeEditItemDialog() {
      this.showEditItemDialog = false;
    },

    /*  处理 表格选中项事件  */
    handleTableSelect(selection) {
      this.isSelectedItem = selection.length !== 0;
    },

    /*  修改查询参数  */
    setQueryParam(queryParam) {
      this.$store.commit(`${this.moduleName}/setQueryParam`, queryParam)
    },
    /*  处理 新增列表项按钮 点击事件  */
    async handleAddItem() {
      let newItem =  this.newItem;

      this.$refs['addItemForm'].validate(async (valid) => {
          if (valid) {
            await this.$store.dispatch(`${this.moduleName}/addItem`, newItem);
          } else {
            console.log('error submit!!');
            return false;
          }

          this.closeAddItemDialog();
      });

    },
    /*  处理 编辑当前列表项按钮 点击事件  */
    async handleEditItem() {
      let thisItem =  this.thisItem;

      this.$refs['editItemForm'].validate(async (valid) => {
        return false;
        if (valid) {
          await this.$store.dispatch(`${this.moduleName}/editItem`, thisItem);
          //this.closeEditItemDialog();
        } else {
          return false;
        }
      });
    },
    /*  处理 删除当前列表项按钮 点击事件  */
    async handleDelItem(thisItem) {
      this.$confirm(`是否删除该 ${this.setting.label}`).then(async _ => {
        await this.$store.dispatch(`${this.moduleName}/delItem`, thisItem);
        done();
      }).catch(_ => {

      });
    },
    /*  处理 删除所选列表项按钮 点击事件  */
    async handleDelSelectdItem() {
      this.$confirm(`是否删除所选的 ${this.setting.label}?`).then(async () => {
        let items = this.$refs['table'].selection;
        await this.$store.dispatch(`${this.moduleName}/delItems`, items);
      }).catch((e) => {
        console.log(e);
      });
    },
    /*  处理 每页记录数改变事件  */
    async handlePageSizeChange(pageSize) {
      this.$store.dispatch(`${this.moduleName}/changePageSize`, pageSize)
    },
    /*  处理 页面改变事件  */
    async handlePageIndexChange(pageIndex) {
      this.$store.dispatch(`${this.moduleName}/changePageIndex`, pageIndex)
    },
    /*  处理 搜索事件  */
    handleSearchPropChange(searchProp) {
      this.$store.commit(`${this.moduleName}/setQueryParam`, { searchProp });
    },
    handleSearchValueChange(searchValue) {
      this.$store.commit(`${this.moduleName}/setQueryParam`, { searchValue });
    },
    async handleSearch(searchValue) {
      this.$store.dispatch(`${this.moduleName}/search`, searchValue);
    },
    /*  处理 过滤事件  */
    handleFilterChange(filters) {
      this.$store.dispatch(`${this.moduleName}/filter`, filters);
    },
    /*  处理 排序事件  */
    handleSortChange(sort) {
      let orderMap = {
        ascending: 'ASC',
        descending: 'DESC'
      };

      this.$store.dispatch(`${this.moduleName}/sort`, {
        sortOrder: orderMap[sort.order],
        sortProp: sort.prop
      })
    }
  }
}
</script>
<style>
.page-body {
  padding: 10px;
}

/*  面板  */
.card-table {
  border: 0;
}
.card-table .el-card__header {
  position: relative;
  padding: 15px 15px;
}
.card-table .el-card__body {
  padding: 0;
}

/*  表格顶部工具条  */
.table-top {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
}
.table-search-input .el-select {
  min-width: 110px;
}
.table-search-input .el-select .el-input__inner {
  text-align: center;
}
/*  表格  */
.el-table .el-table__header th,
.el-table .el-table__header tr {
  background-color: rgb(240, 240, 240);
}
.el-table td, .el-table th {
    padding: 8px 0;
    font-size: 13px;
}
.el-table td {
  border-bottom: 0;
}

/*  表格底部工具条  */
.table-bottom {
  display: flex;
  justify-content: space-between;
  padding: 18px 20px;
  background-color: hsl(210, 9%, 96%);
}

/*  对话框  */
.el-dialog .el-form {
  padding: 15px 160px;
}
</style>
