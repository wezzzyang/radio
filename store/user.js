import qs from 'qs';
import userInfoManager from '@/utils/userInfoManager'
import tokenManager from '@/utils/tokenManager'

export const state = () => ({
    defaultUserInfo: {
        username: null,
        role: null,
        logined: false
    },
    userInfo: {},
});

export const getters = {
    userInfo(state, getters) {
        return state.userInfo;
    }
}

export const mutations = {
    /*  设置用户信息  */
    setUserInfo(state, userInfo) {
        state.userInfo = Object.assign({}, state.defaultUserInfo, userInfo);
    },
    /*  清除用户信息  */
    clearUserInfo(state) {
        state.userInfo = state.defaultUserInfo;
    }
}

export const actions = {
    /*  登录  */
    async login({ state, getters, dispatch, commit }, user) {
        // TODO: POST:/login       
        let response = await this.$axios.post( `http://localhost:8005/oauth/token`, qs.stringify({
            username: user.account,
            password: user.password,
            grant_type: 'password',
            client_id: 'web',
            scope: 'all',
            client_secret: 'pass'
        }));

        let { access_token, refresh_token, expires_in } = response.data;
        let userInfo = JSON.parse(response.data.userInfo);

        userInfo.logined = true;

        tokenManager.update({ access_token, refresh_token, expires_in });
        userInfoManager.update(userInfo);

        return true;
    },
    /*  注册  */
    register({ state, getters, dispatch, commit }) {
        // TODO: POST:/login
        this.$axios.post(`/register`, account).then((res) => {
            console.log('注册成功', res);
            
        }).catch((error) => {
            console.error(error);
        });
    },
    /*  找回密码  */
    findPassword() {
        // TODO: POST:/findPassword
        this.$axios.post(`/findPassword`, info).then((res) => {
            console.log('注册成功', res);
            
        }).catch((error) => {
            console.error(error);
        });
    },
    /*  退出登录  */
    async logout({ state, getters, dispatch, commit }) {
        commit('clearUserInfo');

        await this.$router.push('/user/login');

        tokenManager.clear();
        userInfoManager.clear();
        
    },
    /*  加载用户信息  */
    loadUserInfo({ state, getters, dispatch, commit }) {
        
    }
};