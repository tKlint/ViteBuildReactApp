import { message, notification, Modal } from 'antd';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import storage from './storage';

const { QK_API_BASE_URL, QK_API_TIMEOUT, QK_ACCESS_TOKEN_KEY } = import.meta.env;

export type Response<T> = {
  code: number;
  message: string;
  result: T;
  data: T;
}
export type Resultful = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestOpt<T> extends Omit<AxiosRequestConfig<T>, 'method' | 'url'> {
  method: Resultful;
}
export interface RequestInstance {
  <T = any, D = any>(url: string, config: RequestOpt<D>, isDirectly: false): Promise<Response<T>>;
  <T = any, D = any>(url: string, config: RequestOpt<D>, isDirectly?: true): Promise<T>;
}

type ErrType = 'API_ERR' | 'SERVICE_ERR' | 'NET_ERR';

interface ErrHandleOption {
  code?: number;
  message?: string;
  subMessage?: string;
}

export interface HadnleError {
  (errType: ErrType, opt: ErrHandleOption):Promise<AxiosResponse<unknown, unknown>>;
}

type ErrorMap = {
  [k in ErrType]: () => Promise<AxiosResponse<unknown, unknown>>;
}

enum ErrorTypeText {
  API_ERR = '业务异常',
  SERVICE_ERR = '服务异常',
  NET_ERR = '网络异常',
}

const AUTH_CODE = 401;

const instance = axios.create({
  baseURL: QK_API_BASE_URL,
  timeout: Number(QK_API_TIMEOUT),
  headers: { 'X-Custom-Header': 'foobar' },
});

const onRequestFulfilled = (config: AxiosRequestConfig) => ({
  ...config,
  headers: {
    Authorization: `Bearer ${storage.get(QK_ACCESS_TOKEN_KEY, '')}`,
  },
});

/**
 * 重新登录
 */
const reLogin = () => {
  const {
    hash, pathname, search, origin,
  } = window.location;
  Modal.warn({
    title: '提示',
    content: '授权过期重新登录',
    afterClose: () => {
      const redirectPath = `${(hash || pathname)}${search}`;
      storage.clear();
      window.location.href = `${origin}${redirectPath}`;
    },
  });
};

/**
 * 请求错误异常处理
 * @param errType 错误类型
 * @param option 异常内容配置
 * @returns
 */
const handleError: HadnleError = (errType, option) => {
  const { message: messageStr, subMessage, code } = option;

  const errorMap: ErrorMap = {
    API_ERR() {
      if (code === AUTH_CODE) {
        reLogin();
      }
      message.error(messageStr);
      const error = new Error();
      error.stack = `${ErrorTypeText.API_ERR}: ${code} ${messageStr}`;
      return Promise.reject(error);
    },
    SERVICE_ERR() {
      notification.error({
        message: `${ErrorTypeText.SERVICE_ERR}: ${code} ${messageStr}`,
        description: subMessage,
      });
      const error = new Error();
      error.stack = `${ErrorTypeText.SERVICE_ERR}: ${code} ${messageStr}`;
      return Promise.reject(error);
    },
    NET_ERR() {
      notification.error({
        message: `${ErrorTypeText.NET_ERR}: ${code} ${messageStr}`,
      });
      const error = new Error();
      error.stack = `${ErrorTypeText.NET_ERR}: ${code} ${messageStr}`;
      return Promise.reject(error);
    },
  };

  if (errorMap[errType]) {
    return errorMap[errType]();
  }

  const error = new Error();
  error.stack = `未知异常: ${code} ${messageStr}`;

  return Promise.reject(error);
};

const onResponseFulfilled = (response: AxiosResponse<Response<unknown>>) => {
  const result = response.data;
  if (result.code !== 200) {
    return handleError('API_ERR', {
      code: result.code,
      message: result.message,
    });
  }
  return response;
};

const onResponseRejected = (err: {
  request: XMLHttpRequest;
}) => {
  const { request } = err;
  const { status, statusText, responseURL } = request;
  return handleError('SERVICE_ERR', {
    code: status,
    message: statusText,
    subMessage: responseURL,
  });
};
instance.interceptors.request.use(onRequestFulfilled);

instance.interceptors.response.use(onResponseFulfilled, onResponseRejected);

/**
 * 请求实例
 * @param url 请求地址
 * @param config 请求配置
 * @param isDirectly
 * @returns
 */
const request: RequestInstance = async (url, config, isDirectly = true) => {
  const response = instance({ url, ...config });
  if (!isDirectly) {
    return response;
  }
  return (await response).data.data;
};

export default request;
