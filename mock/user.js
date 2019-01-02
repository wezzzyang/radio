import Mock from "mockjs"
import qs from "qs"

let roles = [
    { "id": 1, "label": "设台用户", "name": "stationUser" },
    { "id": 2,"label": "普通用户", "name": "ordinaryUsers" },
]

let { users } = Mock.mock({
    'users|100': [
        {
            "id|+1": 1,
            "username": "@integer(13300000000,19900000000)",
            "nickname": "@cname",
            "avatar": "@dataImage('24x24', '!')",
            "openID": "@string(32)",
            "role|1": [1,2],
        }
    ]
})

export default [
    /*  模拟 查询接口  */
    {
        // disabled: true,
        url: /users/,
        type: 'get',
        template: function(options) {
            // 深拷贝
            let list = JSON.parse(JSON.stringify(users));
            let total = list.length;

            // 参数处理
            let url = options.url;
            let queryString = url.substring(url.indexOf('?') + 1);
            let {
                pageIndex = 1,
                pageSize = 10,
                filters = [],
                searchProp,
                searchValue,
                sortProp,
                sortOrder = 'ASC'
            } = qs.parse(queryString);

            pageIndex = parseInt(pageIndex);
            pageSize = parseInt(pageSize);

            // 过滤
            for(let filterName in filters) {
                list = list.filter(function(item) {
                    return filters[filterName].includes(String(item[filterName]));
                });
            }
            
            // 搜索
            if(searchProp && searchValue) {
                list = list.filter(function(item) {
                    let itemValue = item[searchProp].toString();
                    return itemValue.indexOf(searchValue.toString()) >= 0;
                });
            }

            // 排序
            if(sortProp) {
                list = list.sort(function(a, b) {
                    let propA = a[sortProp];
                    let propB = b[sortProp];

                    if(typeof propA === 'number') {
                        return propA - propB;
                    } else if(typeof propA === 'date') {
                        return Date.parse(propA) - Date.parse(propB)
                    } else {
                        return propA.toString().localeCompare(propB.toString())
                    }
                })
            }

            if(sortOrder === 'DESC') list.reverse();

            // 统计结果总数
            total = list.length;

            // 分页
            let pageStart = (pageIndex - 1) * pageSize;
            let pageEnd = pageIndex * pageSize;

            list = list.slice(pageStart, pageEnd);

            // 外键处理
            list.map(function(item) {
                // 外键处理前 user.role 是ID，外键处理后 user.role 是 role 对象
                item['role'] = roles.filter((role) => role.id === item.role)[0]
                return item;
            });
            
            return {
                list: list,
                total: total
            }
        }
    },
    /*  模拟 获取单个用户信息接口  */
    {
        url: /users\/[0-9]+/,
        type: 'get',
        template (options) {
            console.log(options);
            return Mock.mock({
                "id": "@integer(1,100)",
                "account": "@integer(13300000000,19900000000)",
                "nickname": "@cname",
                "avatar": "@image('100x100')",
                "openID": "@string(16)",
                "role|1": [
                    "设台用户",
                    "普通用户",
                ],
            });
        }
    },
    /*  添加 用户信息  */
    {
        url: /users/,
        type: 'post',
        template(options) {
            let newItem = JSON.parse(options.body);

            newItem.id = users.length + 1;
            users.push(newItem);
            console.log(newItem);
            return {
                item: newItem,
                total: users.length
            };
        }
    },
    /*  修改 用户信息  */
    {
        url: /users\/[0-9]+/,
        type: 'put',
        template(options) {
            console.log(options);
            let thisItem = JSON.parse(options.body);
           
            users.map(user => {
                if(user.id === thisItem.id) {
                    return thisItem;
                } else {
                    return user;
                }
            }); 

            return {
                item: thisItem,
                total: users.length
            };
        }
    },
    /*  获取角色列表  */
    {
        url: /roles/,
        type: 'get',
        template: roles,
        plain: true
    },
]