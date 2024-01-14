import type { MockMethod } from 'vite-plugin-mock'

export default <MockMethod[]>[
  {
    url: '/api/login',
    method: 'post',
    timeout: 1000,
    response: {
      code: 0,
      data: {
        userId: 1,
        accessToken: 'token123',
        username: 'name',
      },
    },
  },
  {
    url: '/api/user/:id',
    method: 'get',
    timeout: 0,
    response: {
      code: 0,
      data: {
        userId: 1,
        username: 'name',
        accessToken: 'token123',
      },
    },
  },
  {
    url: '/api/logout',
    method: 'get',
    timeout: 1000,
    response: () => ({
      code: 0,
      data: {},
    }),
  },
]
