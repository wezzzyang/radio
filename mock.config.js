/**
 * 細粒度 Mock 配置
 * 注意：如果template选项不存在，将会重定向到统一的Mock服务器
 */
export default [
    "GET:/person",
    {
        rurl: /\/person/,
        rtype: 'GET',
        template: {
            'list|1-10': [
                {
                  id: '@integer(1,100)',
                  name: "@cname(5)"
                },
            ]
        }
    }
]