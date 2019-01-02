import PageStoreFactory from '@/utils/PageStoreFactory'

let store = {
    state: {
        setting: {
            label: '用户',
            name: 'user',
            preifx: 'user-service'
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
                label: '昵称',
                prop: 'nickname',
                type: String,
                template: 'text',
                searchable: true,
                sortable: 'custom',
                rule: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                ],
            },
            {
                label: '角色',
                prop: 'role',
                type: String,
                template: 'select',
                filterable: true,
                valueKey: 'id',
                filters: [
                    { text: '设台用户', value: 'stationUser' },
                    { text: '普通用户', value: 'ordinaryUsers' },
                ],
                options: [
                    { id: 1, label: '设台用户', name: 'stationUser' },
                    { id: 2, label: '普通用户', name: 'ordinaryUsers' },
                ],
                rule: [
                    { required: true, message: '请选择角色', trigger: 'blur' },
                ],
            },
        ]
    },
    getters: {},
    mutations: {},
    actions: {
        /*  获取角色列表  */
        async getRoleList() {
            let response = await this.$axios.get(`/roles`);
            return response.data || [];
        }
    }
}

let passportStore = new PageStoreFactory(store).generate();

export const state = () => (passportStore.state)
export const getters = passportStore.getters;
export const mutations = passportStore.mutations;
export const actions = passportStore.actions;