# 界面功能划分
## 简介

该文档描述了后台管理界面中的页面功能划分以及每个页面可能需要用到的接口。下文中的带有英文的二级标题为URL的一级目录，带有英文的四级标题为URL的二级目录。（例如：二级标题 `用户授权 auth` 与 四级标题 `登陆login` 所组成的 URL `/auth/login` 就是前端实际的URL路径 ）

## 关系梳理

角色分为：



## 用户授权 auth

#### 说明

用户授权相关的页面（路径 `/auth/` 下的页面）都在 **路由鉴权** 拦截的白名单之内，用户可以在未登陆的情况下直接访问这些页面。

#### 登录 login

略

#### 注册 register

略

#### 找回密码 password

略

## 仪表盘 dashboard
#### 日志管理 log
略
#### 异常捕获 exception
略

## 工作人员 staff
#### 人员管理 person

表格：

| 字段名   | 字段别名 | 备注 |
| -------- | -------- | ---- |
| ID       | ID       |      |
| 部门名称 | name     |      |

接口：

`GET: /api/staff`



#### 部门管理 department

| 字段名   | 字段别名 | 备注 |
| -------- | -------- | ---- |
| ID       | ID       |      |
| 部门名称 | name     |      |

接口：

`GET: /api/department`

## 车主 owner

#### 个人 person

- 页面内划分 全部/已审核/待审核

- 如果有待审核的项目则会显示气泡提示

| 字段名     | 字段列名    | 备注 |
| ---------- | ----------- | ---- |
| ID         | ID          |      |
| 姓名       | name        |      |
| 身份证号   | IDCardCode  |      |
| 身份证照片 | IDCardImage |      |
| 手机号     | phone       |      |
| 备注       | remark      |      |

#### 企业 unit 

| 字段名           | 字段列名     | 备注 |
| ---------------- | ------------ | ---- |
| ID               | ID           |      |
| 单位名称         | name         |      |
| 身份证号         | IDCardCode   |      |
| 身份证照片       | IDCardImage  |      |
| 企业法人         | legalPerson  |      |
| 企业法人手机号   | phone        |      |
| 企业法人身份证   | IDCardCode   |      |
| 营业执照         | licenseImage |      |
| 统一社会信用代码 | UnionCode    |      |
| 单位申请书 |     |      |
| 备注 | remark    |      |



## 设置 setting

#### 角色设定 role  

表格：
| 字段名   | 字段列名     | 类型   | 备注 |
| -------- | ------------ | ------ | ---- |
| ID       | ID           | Number |      |
| 角色名称 | name         | String |      |
| 角色别名 | slug         | String |      |
| 角色权限 | capabilities | Array  |      |

接口：

`GET: /api/role`

权限设定  capabilities



一个用户（user）对应一个或多个角色（role）

一个角色（role）对应多个 权限（capability）

一个接口（resource）对应一个权限（capability）

一个菜单项（menu）对应一个权限（capability）

