# 管理页面 Store 模板

## 简介

管理页面 Store 模板是与 `<ManagePage>` 管理页面组件配套使用的 `Vuex Store` 模板，其中包含了一些 管理页面模板所需要的默认配置，当然，模板使用者可以自定义重新其中的配置信息，将自定义的配置信息转交给 `PageStoreFactory` 工厂类将自定义配置与默认配置进行合并处理。



## 使用方法

```javascript
import PageStoreFactory from '@/utils/PageStoreFactory'

// 自定义配置
let store = {
  state: {
    setting: {
      label: '通行证',
      name: 'passport'
    }
  },
  getters: {},
  mutations: {},
  actions: {}
}

// 将自定义配置转交给 PageStoreFactory 得到与默认配置合并后的结果
let passportStore = new PageStoreFactory(store).generate();

// 将合并后的配置按 Vuex 模块形式导出
export const state = () => (passportStore.state)
export const getters = passportStore.getters;
export const mutations = passportStore.mutations;
export const actions = passportStore.actions;
```

