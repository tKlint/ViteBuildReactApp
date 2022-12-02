import { SimpleObject } from '@type/global';

export type StorageInstanceValueType<T> = {
  value: T;
  expire: number | null;
};
// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

class StorageInstance {
  private prefix?: string;

  private storage?: Storage;

  // eslint-disable-next-line no-use-before-define
  static instance: StorageInstance | null = null;

  private getKey(key: string): string {
    return `${this.prefix}-${key}`.toUpperCase();
  }

  constructor(prefix: string, storage: Storage) {
    this.prefix = prefix;
    this.storage = storage;
  }

  static getInstance(prefix: string, storage: Storage): StorageInstance {
    if (!StorageInstance.instance) {
      StorageInstance.instance = new StorageInstance(prefix, storage);
    }
    return StorageInstance.instance;
  }

  get<T = SimpleObject>(key: string, def: T): T {
    const localItem = this.storage?.getItem(this.getKey(key));
    if (!localItem) {
      return def;
    }
    try {
      const { value, expire } = JSON.parse(localItem) as StorageInstanceValueType<T>;
      if (expire === null || expire >= new Date().getTime()) {
        return value;
      }
    } catch (error) {
      return def;
    }
    return def;
  }

  set(key: string, value: unknown, expire: number | null = null): void {
    const localValue = JSON.stringify({
      value,
      expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
    });
    this.storage?.setItem(this.getKey(key), localValue);
  }

  /**
   * 从缓存删除某项
   * @param {string} key
   */
  remove(key: string) {
    this.storage?.removeItem(this.getKey(key));
  }

  /**
   * 清空所有缓存
   * @memberOf Cache
   */
  clear(): void {
    this.storage?.clear();
  }

  /**
   * 设置cookie
   * @param {string} name cookie 名称
   * @param {*} value cookie 值
   * @param {number=} expire 过期时间
   * 如果过期时间为设置，默认关闭浏览器自动删除
   * @example
   */
  setCookie(name: string, value: unknown, expire: number | null = DEFAULT_CACHE_TIME) {
    document.cookie = `${this.getKey(name)}=${value}; Max-Age=${expire}`;
  }

  /**
   * 根据名字删除指定的cookie
   * @param {string} key
   */
  removeCookie(key: string) {
    this.setCookie(key, 1, -1);
  }
}

const storage = StorageInstance.getInstance(import.meta.env.QK_APP_NAME, localStorage);

export default storage;
