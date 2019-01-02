import PageStoreFactory from '@/utils/PageStoreFactory'

let store = {
    state: {
        setting: {
            label: '人员',
            name: 'staff'
        },
        schema: [
            {
                label: 'ID',
                prop: 'id',
                type: Number,
                template: 'text',
                readonly: true,
                sortable: 'custom',
                width: 160,
                rule: [
                    { required: true, message: '请输入ID', trigger: 'blur' },
                ],
            },
            {
                label: '账号',
                prop: 'username',
                type: String,
                template: 'text',
                searchable: true,
                rule: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                ],
            },
            {
                label: '姓名',
                prop: 'name',
                type: String,
                template: 'text',
                searchable: true,
                sortable: 'custom',
                rule: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
            },
            {
                label: '部门',
                prop: 'department',
                type: String,
                template: 'select',
                filterable: true,
                valueKey: 'id',
                filters: [
                    { text: '无线电管理工作人员' , value: 'radioManagement' },
                    { text: '信息推送与发布人员' , value: 'informationPublisher' },
                    { text: '超级管理员' , value: 'superAdministrator' },
                    { text: '执法人员' , value: 'tipstaff' },
                ],
                options: [
                    { id: 1, label: '无线电管理工作人员' , name: 'radioManagement' },
                    { id: 2, label: '信息推送与发布人员' , name: 'informationPublisher' },
                    { id: 3, label: '超级管理员' , name: 'superAdministrator' },
                    { id: 4, label: '执法人员' , name: 'tipstaff' },
                ],
                rule: [
                    { required: true, message: '请选择部门', trigger: 'blur' },
                ],
            }
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
