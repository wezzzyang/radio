
### 权限
----
#### 登陆页面
验证码

#### 注册页面

#### 用户信息
- 储存在 localstorage
- 储存信息包括 令牌 `access_token` 用户角色 `role` 用户ID `id`
```javascript
{
    id: 2333,
    role: 'admin',
    access_token: 'wqqewqigeio+5+wq4e974qw9e'
}
```

### 导航栏 navbar
----


### 菜单边栏 sidebar
---- 
##### 权限鉴别
- 利用Vue-router 的 `beforeEach` 钩子

##### 自定义菜单
- 仪表盘（dashboard）菜单
- 设置（setting）菜单
- 在 `store/sidebar.js` 文件中动态配置菜单的显示文本（label）、图标（icon）、子菜单（submenu）、权限（role）、跳转的链接（link）

##### 动态菜单（缺乏可行性）
- 针对 `pages/admin` 目录下的路由信息 生成 菜单信息
- 生成的菜单插入在仪表盘（dashboard）菜单之前设置（setting）菜单之后

##### 顶部进度条
- 利用Vue-router 的 `beforeEach` 钩子
- 参考：https://zh.nuxtjs.org/api/configuration-loading#个性化加载进度条

##### 伸缩
- 使用 `js-cookies` 或者 `localstorage` 记录边栏的伸缩状态

##### 图标
http://www.iconfont.cn/collections/detail?spm=a313x.7781069.1998910419.d9df05512&cid=2692

## 页面组件 table
----
### 配置
model 和 schema 在页面组件的data中设置，然后传递给table。

#### model
每一个列表操作的当个对象称作 `model`，`model` 的结构如下:

```javascript
{
    label: '通行证',
    slug: 'passport',
    recoverable: true,
    editable: true
}
```

界面中的文本会根据 `model.label` 作出改变，例如：删除确认框里面的提示文本将会变成 “是否需要删除该通行证？”


#### schema
每一个model对应一个 `schemas` 数组，一个 `schema` 对应一个字段，`schema` 结构如下：
```javascript
{
    label: '用户名',
    key: 'username',
    sortable: true,
    type: 'String',
    filterable: true,
    searchable: true
}
```
### 显示
- 遍历 schemas 生成 `<el-table-item>`

### 分页
- 前端分页（适合数据量较小的列表）
- 后端分页（适合数据量较大的列表，每次切换页面都向后端请求当前页的列表数据）
- 可以都采用后端分页

### 排序
- 根据 `schema.sortable` 判断是否可排序
- 根据 `schema.type` 选择不同的排序方式

### 筛选
- 根据 `schema.filterable` 判断是否可以筛选
- 根据 `schema.type` 选择不同的筛选方式 (例如：`schema.type` 类型为 `Datetime` 会弹出日期时间选择器)

### 搜索
- 在输入框输入关键字的时候，提示用户 “按XXX字段搜索：关键字”
- 只有 `schema.searchable` 为 `true` 字段才显示到搜索提示中

### 增加
- 弹出新增对话框（类名应当符合 `addTruckPassportDialog` 格式）
- 根据 schema 遍历出新增的字段列表，根据 `schema.name`

### 修改
- 弹出修改对话框（类名应当符合 `editTruckPassportDialog` 格式）
- 弹出修改对话框前，根据 index 找到需要修改的对象，进行**深拷贝**复制到 `thisTruckPassport` 变量中（避免在未经确认修改的情况下直接修改了列表中的数据）
- 确认修改后向后端发送请求

### 删除
- 弹出删除确认框
- 确认修改后向后端发送请求

### 批量删除
- 弹出删除确认框

### 回收站
- enable:false 已删除
- 根据 `model.recoverable` 判断是否可恢复，不可回复则没有必要显示回收站链接
