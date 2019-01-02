export const state = () => ({
    title: '管理页面'
})

export const getters = {
    title(state, getters) {
        return state.title;
    }
}

export const mutations = {
    setTitle(state, title) {
        state.title = title;
    }
}