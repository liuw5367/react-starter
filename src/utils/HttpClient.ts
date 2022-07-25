import { notification } from 'antd';
import type { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios';
import axios from 'axios';
import { history } from 'umi';

import type { ApiResponse } from '@/services';

import { clearCacheOnLogout } from '.';

/** 重新定义了 ApiResponseType，在当前文件使用，方便替换 ApiResponse */
type ApiResponseType<T = any> = ApiResponse<T>;

export const REQUEST_SUCCESS = 0;

const baseConfig: AxiosRequestConfig = { baseURL: '/api', timeout: 120_000 };

export function getHeaders(): AxiosRequestHeaders {
  return {
    Authorization: localStorage.getItem('token') || '',
  };
}

function redirect() {
  const { pathname, search } = window.location;
  history.push('/login?redirect=' + pathname + (search ? `/${search}` : ''));
}

function processLogout(response: AxiosResponse) {
  const { status } = response;
  if (status === 401) {
    clearCacheOnLogout();
    redirect();
  }
}

function processResponseData(request: XMLHttpRequest, data: ApiResponseType) {
  // TODO: 业务 code 中是否需要退出登陆
  if (data.code === 401 || data.code === '401') {
    clearCacheOnLogout();
    redirect();
  } else if (data.code !== REQUEST_SUCCESS) {
    notification.close(request.responseURL || '/api');
    notification.warn({
      key: request.responseURL || '/api',
      message: data.message || '请求错误',
      // description: data.message || '请求错误',
    });
  }
  // 是否成功，boolean 类型 方便页面判断
  data.success = data.code === REQUEST_SUCCESS;
}

function addRequestInterceptors(instance: AxiosInstance) {
  instance.interceptors.request.use(
    (config) => {
      // 添加 token
      config.headers = { ...config.headers, ...getHeaders() };
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );
}

function addResponseInterceptors(instance: AxiosInstance) {
  instance.interceptors.response.use(
    // 返回 body 数据
    (res) => {
      const { data, request, headers } = res;
      // 如果不是 json 结构，可能是下载文件，直接返回原 response
      if (
        !headers?.['Content-Type']?.toLowerCase().includes('application/json') &&
        !headers?.['content-type']?.toLowerCase().includes('application/json')
      ) {
        return res;
      }
      processResponseData(request, data);
      return data;
    },
    (err) => {
      const request: XMLHttpRequest = err.request;
      const response: AxiosResponse = err.response;
      // console.log(request, response);
      // 这里用来处理http常见错误，进行全局提示
      const message = getCodeMessage(response.status);
      notification.close(request.responseURL || '/api');
      notification.warn({
        key: request.responseURL || '/api',
        message: message || '请求错误',
        // description: data.message || '请求错误',
      });
      // 401
      processLogout(response);

      // 返回值，用于页面判断请求失败的情况
      const errorRes: Partial<AxiosResponse<ApiResponseType>> = {};
      Object.assign(response, errorRes);
      errorRes.data = { success: false, code: -1, message: 'error', data: '' };
      return Promise.resolve(errorRes);
    },
  );
}

function getCodeMessage(status: number) {
  switch (status) {
    case 400:
      return '请求错误(400)';
    case 401:
      return '未授权，请重新登录(401)';
    case 403:
      return '拒绝访问(403)';
    case 404:
      return '请求出错(404)';
    case 408:
      return '请求超时(408)';
    case 500:
      return '服务器错误(500)';
    case 501:
      return '服务未实现(501)';
    case 502:
      return '网络错误(502)';
    case 503:
      return '服务不可用(503)';
    case 504:
      return '网络超时(504)';
    case 505:
      return 'HTTP版本不受支持(505)';
    default:
      return `连接出错(${status})`;
  }
}

export default class HttpClient {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig = {}) {
    const axiosInstance = axios.create({ ...baseConfig, ...config });
    addRequestInterceptors(axiosInstance);
    addResponseInterceptors(axiosInstance);

    this.instance = axiosInstance;
  }

  public request<R = any>(config: AxiosRequestConfig): Promise<ApiResponseType<R>> {
    return this.instance.request(config);
  }

  public get<R = any>(url: string, params: any = {}, config: AxiosRequestConfig = {}): Promise<ApiResponseType<R>> {
    return this.request({ method: 'GET', url, params, ...config });
  }

  public post<R = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<ApiResponseType<R>> {
    return this.request({ method: 'POST', url, data, ...config });
  }

  public put<R = any>(url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<ApiResponseType<R>> {
    return this.request({ method: 'PUT', url, data, ...config });
  }

  public delete<R = any>(url: string, config: AxiosRequestConfig = {}): Promise<ApiResponseType<R>> {
    return this.request({ method: 'DELETE', url, ...config });
  }
}

export const httpClient = new HttpClient();

export function request<R = any>(
  url: string,
  config: AxiosRequestConfig = { method: 'GET' },
): Promise<ApiResponseType<R>> {
  config.url = url;
  return httpClient.request(config);
}

export function downloadFile(url: string, config: AxiosRequestConfig = {}): Promise<void> {
  config.url = 'GET';
  config.url = url;
  config.responseType = 'blob';
  return httpClient.instance.request(config).then((res) => {
    const { status, data, headers } = res;
    if (status >= 400) return;
    const disposition = headers?.['content-disposition'] || headers?.['Content-Disposition'];
    if (!disposition) return;
    const fileName = disposition.replace(/\w+;filename=(.*)/, '$1');
    // 此处当返回json文件时需要先对data进行JSON.stringify处理，其他类型文件不用做处理
    // const blob = new Blob([JSON.stringify(data)], ...)
    const blob = new Blob([data], { type: headers['content-type'] });
    const url = URL.createObjectURL(blob);
    const element = document.createElement('a');
    element.href = url;
    element.download = decodeURI(fileName);
    // element.style.display = 'none';
    element.click();
    window.URL.revokeObjectURL(url);
  });
}
