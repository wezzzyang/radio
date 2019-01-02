import { default as mockList } from "@/mock.config"
import Mock from 'mockjs'

export default ({ $axios, isDev }) => {

    // Mock 服务器链接
    let baseUrl = 'https://www.easy-mock.com/mock/5bb370220b166245847a1c1f/truckpass/';

    // 加载 Mock 拦截规则
    let context = require.context('../mock', true, /\.js$/);
    let files = context.keys();
    let mockList = [];

    for(let file of files) {
        let mockConfig = context(file).default;

        if(Array.isArray(mockConfig)) {
            mockList = mockList.concat(mockConfig.filter((mock) => mock.disabled !== true));
        } else {
            mockList.push(mockConfig);
        }
    }

    // 建立 Mock 拦截
    for(let mockItem of mockList) {
        if(!mockItem) continue;
        
        // 没有模板 直接转交给远程 Mock 服务器
        if(!mockItem.template) {

        }

        if(!mockItem.plain && Array.isArray(mockItem.template)) {
            // 模板为数组
            let template = {};

            if(!mockItem.count) {
                // 直接将整个数组作为模拟数据数组
                template[`list`] = mockItem.template;
            } else {
                // 以数组第一项为模板来生成模拟数据数组
                template[`list|${mockItem.count}`] = [];
                template[`list|${mockItem.count}`].push(mockItem.template[0]);
            }

            Mock.mock(mockItem.url, mockItem.type, function(options) {
                let { list } = Mock.mock(template);
                return list;
            });
        } else {
            // 模板为字符串 / 对象 / 函数
            Mock.mock(mockItem.url, mockItem.type, mockItem.template);
        }

    }

}
