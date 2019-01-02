export default {
    url: /passports/,
    type: 'get',
    template: [
        {
            id: '@integer(1,100)',
            ownerName: '@cname',
            name: '@cname',
            plateNumber: '冀B@integer(1000,9999)',
        }
    ],
    count: 100
}