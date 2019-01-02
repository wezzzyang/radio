import Vue from 'vue'

export default (ctx) => {

    /*  配置当前页面信息  */
    Vue.prototype.$setPage = function (options) {
        this.$store.commit('navbar/setTitle', options.title);
        this.$store.commit('current/setModuleName', options.moduleName);
    }
}