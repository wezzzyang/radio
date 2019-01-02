import Cookie from 'js-cookie'

/**
 * Token 管理器
 * TODO：使用更为安全的 Cookie 储存
 */
class TokenManager {

    set access_token(newValue) {
        if(newValue === null) {
            localStorage.removeItem('access_token');
        } else {
            localStorage.setItem('access_token', newValue);
        }
    }

    get access_token() {
        return localStorage.getItem('access_token');
    }

    set refresh_token(newValue) {
        if(newValue === null) {
            localStorage.removeItem('refresh_token');
        } else {
            localStorage.setItem('refresh_token', newValue);
        }
    }

    get refresh_token() {
        return localStorage.getItem('refresh_token');
    }

    set expires_in(newValue) {
        if(newValue === null) {
            localStorage.removeItem('expires_in');
        } else {
            localStorage.setItem('expires_in', newValue);
        }
    }

    get expires_in() {
        return localStorage.getItem('expires_in');
    }

    update(token) {
        this.access_token = token.access_token;
        this.refresh_token = token.refresh_token;
        this.expires_in = token.expires_in;
    }
    
    clear() {
        this.access_token = null;
        this.refresh_token = null;
        this.expires_in = null;
    }
}

export default new TokenManager()