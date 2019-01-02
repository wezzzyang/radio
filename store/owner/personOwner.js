import PageStoreFactory from '@/utils/PageStoreFactory'

let store = {
    state: {
        setting: {
            label: '个人车主信息',
            name: 'personOwner',
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
                label: '姓名',
                prop: 'name',
                type: String,
                template: 'text',
                rule: [
                    { required: true, message: '姓名不能为空', trigger: 'blur' },
                ],
                searchable: true,
            },
            {
                label: '身份证号',
                prop: 'IDCardNumber',
                type: String,
                template: 'text',
                rule: [
                    { required: true, message: '身份证号不能为空', trigger: 'blur' },
                    { min: 18, max: 18, message: '身份证号必须为18位', trigger: 'blur' }
                ],
                searchable: true,
            },
            {
                label: '手机号',
                prop: 'phoneNumber',
                type: String,
                template: 'text',
                rule: [
                    { required: true, message: '手机号不能为空', trigger: 'blur' }
                ],
                searchable: true,
            },
            {
                label: '关联账号',
                prop: 'relatedAccount',
                type: String,
                template: 'text',
                readonly: true,
            },
            {
                label: '注册时间',
                prop: 'registerDate',
                type: Date,
                template: 'text',
                readonly: true,
            }
        ],
        list: [],
    }
}

let passportStore = new PageStoreFactory(store).generate();

export const state = () => (passportStore.state)
export const getters = passportStore.getters;
export const mutations = passportStore.mutations;
export const actions = passportStore.actions;