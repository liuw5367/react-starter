import type { MockMethod, Recordable } from 'vite-plugin-mock';

interface Request {
  url: Recordable;
  body: Recordable;
  query: Recordable;
  headers: Recordable;
}

type ResponseFunction = (request: Request) => unknown;

/**
 * 添加函数参数提示，但是不支持直接返回对象了，TS 会报错
 */
export interface Method extends MockMethod {
  response?: ResponseFunction;
}

export default <MockMethod[]>[
  {
    url: '/api/login',
    method: 'post',
    response: {
      code: 0,
      message: 'ok',
      data: `token-${Date.now()}`,
    },
  },
  {
    url: '/api/logout',
    method: 'post',
    response: {
      code: 0,
      message: 'ok',
    },
  },
  {
    url: '/api/codeTest',
    method: 'get',
    response: {
      code: -1,
      message: 'ERROR',
    },
    // response: () => ({
    //   code: 401,
    //   message: 'ERROR',
    // }),
  },
];
