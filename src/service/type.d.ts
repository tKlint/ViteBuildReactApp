declare namespace API {
  type RoutesResponse = {
    /**
     * 组件文件路径
     */
    component?: string;
    /**
     * 路由地址
     */
    path: string;
    /**
     * 是否在菜单中隐藏
     */
    hideInMenu?: boolean;
    // 1: 跳槽到组件路由, 2: 跳转到第三方地址
    // type?: RouterType;
    // 子路由
    children?: RoutesResponse[];
    /**
     * 路由名称
     */
    name: string;
    /**
     * 菜单图标
     */
    icon?: string;
    /**
     * 页面标题
     */
    title?: string;
    /**
     * 精确匹配
     */
    exact?: true;
    /**
     * 路由标识编号
     */
    key: string;
    /**
     * 父级路由标识编号
     */
    parentKey?: string;
    /**
     * 附带信息
     */
    meta?: {
      [k: string]: React.Key;
    };
    /**
     * 是否为目录
     */
    directory?: true;
    index?: boolean;
    /**
     * 打开方式
     */
    target?: string;
    /**
     * 全屏模式
     */
    fullScreen?: boolean;
  };
  type PaginationParams = {
    pageNow?: number;
    pageSize?: number;
  }
  type PaginationResponseData<T> = {
    pagination: {
      pageNow: number;
      pageSize: number;
      totalPage: number;
      totalSize: number;
    };
    result: T[];
  }
}
