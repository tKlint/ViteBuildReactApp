import { PaginationParams } from '@/components/QkTable';
import { SimpleObject } from '../types/global';
/**
 * 将数组对象磨平
 * @param list
 * @param arr
 * @returns
 */
export const flatArrayObject = <T = SimpleObject>(
  list: any[],
  keys: string[],
  arr: T[] = [],
): T[] => {
  list.forEach((item) => {
    keys.forEach((key) => {
      if (Array.isArray(item[key])) {
        flatArrayObject(item[key], keys, arr);
      } else {
        arr.push({ ...item });
      }
    });
  });
  return arr;
};

/**
 * 格式化金额
 * @param num 数字
 * */
export const toQfw = (num: number) => {
  if (Number.isNaN(num)) {
    throw new TypeError('num is not a number');
  }
  return (`${num}`).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,');
};

/**
 * 获取指定区间的随机整数
 * @param m 开始值
 * @param n 结束值
 * */
export const rand = (m: number, n: number) => Math.ceil(Math.random() * (n - m + 1) + m - 1);

/**
 * 格式Table化分页参数
 * @param params
 * @returns */
export const formatPaginationParams = (params: PaginationParams): API.PaginationParams => ({
  pageNow: params.current,
  pageSize: params.pageSize,
});
