/**
 * 用户信息管理器
 */
class UserInfoManager {

    constructor() {
        this.defaultUserInfo = {
            username: null,
            role: null,
            logined: false
        };
        this.userInfo = {};
    }

    update(userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    load() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        return Object.assign({}, this.defaultUserInfo, this.userInfo);
    }

    clear() {
        localStorage.removeItem('userInfo');
    }
}

export default new UserInfoManager()