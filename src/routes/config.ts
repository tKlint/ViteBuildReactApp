/**
 * 模拟接口返回数据
 */
export default [
  {
    path: '/home',
    component: 'Home',
    name: '主页',
    icon: 'icon i-green-bonds-home',
  },
  {
    path: '/about',
    name: '关于',
    icon: 'icon i-green-bonds-home',
    children: [
      {
        path: '/about',
        name: '列表',
        component: 'About',
        hideInMenu: true,
      },
      {
        path: 'detail',
        name: '详情',
        component: 'About/Detail',
        hideInMenu: true,
      },
    ],
  },
  {
    path: 'https://github.com/tKlint',
    name: '站外地址',
    icon: 'icon i-green-bonds-home',
    target: '_blank',
  },
  {
    path: '/blank',
    name: '新窗口页面',
    icon: 'icon i-green-bonds-home',
    component: 'Blank',
    target: '_blank',
    fullScreen: true,
  },
  {
    path: '/lab',
    name: '实验室',
    icon: 'icon i-green-bonds-home',
    component: 'ReactLab',
  },
] as API.RoutesResponse[];
