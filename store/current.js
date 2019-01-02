export const state = () => ({
    title: '测试',
    moduleName: 'truck'
});

export const mutations = {
    setModuleName(state, moduleName) {
        state.moduleName = moduleName;
    }
};
