# 管理页面模板
## 简介
管理页面模板具有一般管理页面所具有的查看对象列表、增加对象、删除对象、批量删除对象，修改对象、分页、排序、筛选等基本功能。

## 创建页面
#### 通过命令行创建页面（未完成）

```shell
ice create --template=ManagePage --label=人员 --name=person
```

| 命令行参数 | 备注 |
| :-------- | :--------|
| `--template` | 创建页面需要使用到的模板 |
| `--label` | 显示在页面上的对象名 |
| `--name` | 用于数据储存的对象名 |

#### 通过编写代码创建页面

略

## 模板参数
#### 说明

- 管理模板有三个基本的参数,它们分别是 `setting`（组件设置）、`schema`（字段设置）和 `list`（列表数据）。

- 模板的参数不能通过组件 `<ManagePage/>` 的 `prop` 传入，而是应该在 Vuex 中声明一个新的模块，将所有参数声明在  Vuex 模块的 `state` 中，然后将该模块的限定名通过 `<ManagePage/>` 组件的名为 `module` 的 `prop` 传入，模板将会根据 `module` 加载相应的参数。

**例如**
```html
<ManagePage module="person/person"/>
```

- 每个模板参数不仅需要需要在 `state` 中声明，也需要声明一个同名的 `getter`，因为在实际过程中，管理页面模板是通过 `getter` 间接获得参数的。

**例如**

```javascript
export const state = () => ({
    /*  组件设置  */
    setting: {...},
    /*  字段设置  */
    schema: [...],
    /*  列表数据  */
    list: [...],
});

export const getters = {
    setting(state, getters) {
        return state.setting;
    },
    schema(state, getters) {
        return state.schema;
    },
    list(state, getters) {
        return state.list;
    }
}
```

#### 列表数据 list

**说明**

列表数据是一个对象数组，数组中每个对象都有n个属性（ prop ）对组成。

#### 组件设置 setting

**例子**
```javascript
setting: {
    label: '人员信息',
    slug: 'person',
    showSearchBar: true,
    pageSizes: [10, 20 ,50],
    pageSize: 1
},
```

**参数说明**

| 参数 | 类型 | 备注 |
| :-------- | :--------| ---------|
| `label` | String | 标签名称 |
| `slug` | String | 列名 |
| `showSearchBar` | Boolean | 是否显示搜索框 |
| `pageSizes` | Array | 可选的单页显示数量 |
| `pageSize` | Integer | 当前的单页显示数量 |

#### 字段设置 schema

**简介**

**例子**
```javascript
schema: [
    {
        label: 'ID',
        prop: 'id',
        type: Number,
        template: 'text',
        readonly: true,
    },
    {
        label: '姓名',
        prop: 'name',
        type: String,
        template: 'text',
        rule: [
            { required: true, message: '姓名不能为空', trigger: 'blur' },
        ]
    },
    {
        label: '手机号码',
        prop: 'phone',
        type: String,
        template: 'text',
        rule: [
            { required: true, message: '手机号码不能为空', trigger: 'blur' },
            { min: 11, max: 11, message: '手机号码必须为11位', trigger: 'blur' }
        ]
    }
]
```

**参数说明**

| 参数 | 类型 | 备注 |
| :-------- | :--------| --------- |
| `label` | String | 表头标签 |
| `prop` | String | 属性名 |
| `type` | Object | 字段 |
| `template` | String | 字段编辑组件 |
| `rule` | Array | 字段校验规则 |
| `readonly` | Boolean | 是否为只读 |
| `sortable` | Boolean / String | 是否可排序 |
| `filterable` | Boolean / String | 是否可过滤 |
| `searchable` | Boolean / String | 是否可搜索 |

#### TODO

1. 添加field代码片段，以便开发人员快速插入。

2. 针对 `*.page.js`文件进行 `ESlint `校验



## 修改模板

#### 说明

页面模板提供了一些具名插槽，以供模板使用者根据具体情况来扩展和修改模板

#### 使用方法

```html
<ManagePage ref="page-manage-owner">
    <template slot="el-table-column-name">
        <el-table-column label="姓名">
            <template slot-scope="scope">
                {{ scope.row.name }}
            </template>
        </el-table-column>
    </template>
</ManagePage>
```

#### 具名插槽列表

| 插槽限定名 | 备注 |
| :-------- | :--------|
| `table-top` | 表格顶部工具条 |
| `table-top-left` | 表格顶部工具条的左边 |
| `table-top-right` | 表格顶部工具条的右边 |
| `table-column-{prop}`  | 自定义列模板，prop为具体的属性名，如：name |

## 组件接口

----

**说明**

- 组件接口必须在 `Vuex` 模块的 `mutations` 和 `actions`中实现。
- `mutations`用于直接操作与修改 `state`, `actions` 负责向后端发起请求，请求成功并返回数据会再发起提交 `mutations` 对前端数据进行同步修改。

**组件接口列表**

| 组件接口           | 参数        | 备注           |
| :----------------- | ----------- | :------------- |
| `fetchList`        | 无          | 获取数据列表   |
| `addItem`          | `newItem`   | 添加列表项     |
| `editItem`         | `thisItem`  | 修改列表项     |
| `delItem`          | `thisItem`  | 删除列表项     |
| `delItems`         | `items`     | 批量删除列表项 |
| `changePage`       | `pageIndex` | 换页           |
| `sort`（未完成）   |             | 排序           |
| `search`（未完成） |             | 搜索           |
| `filter（未完成）` |             | 过滤           |



## 组件方法

----

**说明**

组件方法是在具体的页面组件（使用到管理页面模板组件的那个 `Vue` 实例）中使用的。因为通常情况下

```

```

<ManagePage ref="page-manage-owner">

**组件方法列表**

| 组件方法 | 备注 |
| :-------- | :--------|
| sort() |  |
|  | |
|  | |
|  | |

## 功能特性

----

#### 分页



#### 排序



#### 搜索



#### 回收站

