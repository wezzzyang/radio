import Mock from "mockjs";

export default [
    /*  模拟 查询接口  */
    {
        url: /personOwners/,
        type: 'get',
        template: [
            {
                id: '@integer(1,100)',
                name: '@cname',
                IDCardNumber: '@integer(110,440)@integer(110,440)@date("yyyyMMdd")@integer(1000,9999)',
                phoneNumber: '@integer(13300000000,19900000000)',
                relatedAccount: '@string("lower", 5)',
                registerDate: '@date("yyyy-MM-dd")',
            }
        ],
        count: 10
    },
    /*  模拟 获取单个用户信息接口  */
    {
        url: /personOwners\/[0-9]+/,
        type: 'get',
        template (options) {
            console.log(options);
            return Mock.mock({
                id: '@integer(1,100)',
                ownerName: '@cname',
                name: '@cname',
                plateNumber: '冀B@integer(1000,9999)',
            });
        }
    }
]