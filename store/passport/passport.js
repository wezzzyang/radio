import PageStoreFactory from '@/utils/PageStoreFactory'

let store = {
  state: {
    setting: {
      label: '通行证',
      name: 'passport'
    },
    schema: [
      {
        label: 'ID',
        prop: 'id',
        type: Number,
        template: 'text',
        readonly: true,
      },
      {
        label: '编号',
        prop: 'code',
        type: String,
        searchable: true,
        template: 'text'
      },
      {
        label: '车牌号',
        prop: 'plateNumber',
        type: String,
        searchable: true,
        template: 'text'
      },
      {
        label: '通行证类型',
        prop: 'passportType',
        type: Object,
        filterable: true,
        template: 'text'
      },
      {
        label: '起始日期',
        prop: 'startDate',
        type: Date,
        filterable: true,
        template: 'text'
      },
      {
        label: '结束日期',
        prop: 'endDate',
        type: Date,
        filterable: true,
        template: 'text'
      },
      {
        label: '状态',
        prop: 'status',
        type: Object,
        filterable: true,
        template: 'text'
      },
      {
        label: '打印状态',
        prop: 'printStatus',
        type: Boolean,
        filterable: true,
        template: 'text'
      },
      {
        label: '办证人',
        prop: 'name',
        type: Object,
        filterable: true,
        template: 'text'
      }
    ]
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  }
}

let passportStore = new PageStoreFactory(store).generate();

export const state = () => (passportStore.state)
export const getters = passportStore.getters;
export const mutations = passportStore.mutations;
export const actions = passportStore.actions;