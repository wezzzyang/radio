import PageStoreFactory from '@/utils/PageStoreFactory'

let store = {
  state: {
    setting: {
      label: '管理对象',
      name: 'admin'
    },
    schema: [
      {
        label: 'ID',
        prop: 'id',
        type: Number,
        template: 'text',
        readonly: true,
      },
    ]
  },
  getters: {},
  mutations: {},
  actions: {}
}

let passportStore = new PageStoreFactory(store).generate();

export const state = () => (passportStore.state)
export const getters = passportStore.getters;
export const mutations = passportStore.mutations;
export const actions = passportStore.actions;