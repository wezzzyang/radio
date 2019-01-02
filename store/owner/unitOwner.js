import PageStoreFactory from '@/utils/PageStoreFactory'

let store = {
    state: {
        setting: {
            label: '单位车主',
            name: 'unitOwner'
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
                label: '单位名称',
                prop: 'name',
                type: String,
                template: 'text',
                searchable: true
            },
            {
                label: '统一信用代码',
                prop: 'creditCode',
                type: String,
                template: 'text',
            },
            {
                label: '营业执照',
                prop: 'businessLicense',
                type: String,
                template: 'text',
            },
            {
                label: '法人姓名',
                prop: 'corporateName',
                type: String,
                template: 'text',
                searchable: true
            },
            {
                label: '法人身份证',
                prop: 'corporateIDCardNumber',
                type: String,
                template: 'text',
                searchable: true
            },
            {
                label: '法人手机号',
                prop: 'corporatePhoneNumber',
                type: String,
                template: 'text',
                searchable: true
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