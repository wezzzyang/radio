export const state = () => ({
  menu: [
    /*  仪表盘  */
    {
      label: '仪表盘',
      name: 'dashboard',
      link: '/dashboard',
      icon: 'iconfont icon-view-quilt',
      cap: 'read_dashboard',
    },
     /*  用户管理  */
     {
      label: '用户管理',
      name: 'user',
      icon: 'iconfont icon-person',
      cap: 'read_users',
      link: '/user',
    },
    /*  管理人员  */
    {
      label: '工作人员',
      name: 'staff',
      icon: 'iconfont icon-person',
      cap: 'read_staffs',
      link: '/staff/staff',
      // submenu: [
      //   {
      //     label: '人员管理',
      //     name: 'staff-staff',
      //     link: '/staff/staff',
      //     cap: 'read_staffs',
      //   },
      //   {
      //     label: '部门管理',
      //     name: 'staff-department',
      //     link: '/staff/department',
      //     cap: 'read_department',
      //   },
      // ]
    },
    /*  电台信息  */
    {
      label: '电台信息',
      name: 'radioData',
      link: '/radioData',
      icon: 'iconfont icon-owner',
      cap: 'radioData',
    },
    /*  在线咨询  */
    {
      label: '在线咨询',
      name: 'olConsult',
      link: '/olConsult',
      icon: 'iconfont icon-owner',
      cap: 'read_olConsult',
    },
    /*  通行证  */
    {
      label: '监督举报接收',
      name: 'controlReport',
      link: '/controlReport',
      icon: 'iconfont icon-passport',
      cap: 'read_controlReport'
    },
    /*  车辆  */
    {
      label: '信息发布与维护',
      name: 'informPublish',
      link: '/informPublish',
      icon: 'iconfont icon-vehicle',
      cap: 'read_InformPublish'
    },
    /*  线路  */
    // {
    //   label: '线路',
    //   name: 'route',
    //   link: '/route',
    //   icon: 'iconfont icon-route',
    //   cap: 'read_routes'
    // },
    /*  设置  */
    {
      label: '设置',
      name: 'setting',
      icon: 'iconfont icon-settings',
      cap: 'manage_settings',
      submenu: [
        {
          label: '高级设置',
          name: 'setting-advanced',
          link: '/setting/advanced',
          cap: 'manage_settings',
        },
        // {
        //   label: '车主类型',
        //   name: 'setting-owner-type',
        //   link: '/setting/ownerType',
        //   cap: 'manage_settings',
        // },
        // {
        //   label: '号牌类型',
        //   name: 'setting-plate-type',
        //   link: '/setting/plateType',
        //   cap: 'manage_settings',
        // },
        // {
        //   label: '通行证类型',
        //   name: 'setting-passport-type',
        //   link: '/setting/passportType',
        //   cap: 'manage_settings',
        // }
      ]
    }
  ],
  isCollapse: true
});

export const mutations = {
  toggleSidebar(state) {
    state.isCollapse = !state.isCollapse;
  }
};