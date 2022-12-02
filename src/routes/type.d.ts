export type RoutesResponse = {
  // 组件地址
  component: string;
  // 路由地址
  path: string;
  // 是否在菜单中隐藏
  hideInMenu?: boolean;
  // 1: 跳槽到组件路由, 2: 跳转到第三方地址
  type?: RouterType;
  // 子路由
  children?: FakeRoutesResponse[];
  // 路由名称
  name: string;
  // 菜单图标
  icon: string;
  // 页面标题
  title?: string;
  // 精确匹配
  exact?: true;
  // 路由标识
  key: number;
  // 父级路由标识
  parentKey?: number;
  // 附带信息
  meta?: {
    target?: string;
    layout?: boolean;
  };
  // 是否为目录
  directory?: true;
  index?: boolean;
};
