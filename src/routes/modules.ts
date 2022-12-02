const modules = import.meta.glob('../pages/**/*.tsx');

export interface ModuleElemnet {
  (): Promise<{
    default: React.FC<Record<string, unknown>>;
  }>;
}

/**
 * 获取异步组件
 * @param moduleName 组件路径
 * @returns
 */
export function getDynamicModule(moduleName: string) {
  return modules[`../pages/${moduleName}.tsx`] || modules[`../pages/${moduleName}/index.tsx`];
}

export default modules;
