import { default as config } from "@/nuxt.config";
import Vue from 'vue'
import Axios from 'axios'
import tokenManager from '@/utils/tokenManager'
import { Message } from 'element-ui';

export default ({ app, isDev }, inject) => {
    let baseURL;

    if(isDev) {
        baseURL = 'http://localhost:8005';
    } else {
        baseURL = 'http://localhost:8005';
    }

    let oauthURL = baseURL + '/oauth/token';

    let axios = Axios.create({
        baseURL: baseURL,
        timeout: 3000
    });

     /*  请求拦截  */
    axios.interceptors.request.use(function(config) {

        if(config.url === oauthURL) {
            console.log(233);
        } else {
            config.headers.Authorization = 'bearer' + tokenManager.access_token;
            console.log(config);
        }

        return config;
    }, function(error) {
        Message({ message: '网络错误', type: 'error' });
        return Promise.reject(error);
    });

    /*  响应拦截  */
    axios.interceptors.response.use(function(response) {
        // 对响应数据做点什么
        return response;
      }, function (error) {
        // 对响应错误做点什么
        Message({ message: '网络错误', type: 'error' });
        return Promise.reject(error);
    });

    inject('axios', axios); 
}
