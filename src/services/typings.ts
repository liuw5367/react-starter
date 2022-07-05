export interface ApiResponse<T = any> {
  /** 是否成功，boolean 类型 方便页面判断 */
  success: boolean;

  code: number | string;
  message: string;
  data: T;
}

export interface PageRequest {
  current?: number;
  size?: number;
  search?: string;
}

export interface PageBody<T = any> {
  current: number;
  total: number;
  size: number;

  list: T[];
}
