import { mutations, state } from "../store/user";
import userInfoManager from '@/utils/userInfoManager';
import tokenManager from '@/utils/tokenManager'

/**
 * 不需要授权的路径列表
 */
let nonAuthList = [
    '/user/login',
    '/user/register',
    '/404',
    '/user/password'
]

export default function (nuxt) {
    let { route, redirect, app } = nuxt;
    let userInfo = userInfoManager.load();

    app.store.commit('user/setUserInfo', userInfo);
    console.log(!userInfo.logined);
    if(!userInfo.logined && nonAuthList.indexOf(route.path) == -1){
        redirect(`/user/login?redirect=${route.path}`)
    }
}