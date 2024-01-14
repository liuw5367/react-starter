import type { MockMethod } from 'vite-plugin-mock'
import mockjs from 'mockjs'

const { Random } = mockjs

export default <MockMethod[]>[
  {
    url: '/api/list',
    method: 'get',
    timeout: 1000,
    response: ({ query }) => {
      const total = 12345
      const pageNum = Number(query.pageNum || 1)
      const pageSize = Number(query.pageSize || 10)
      return {
        code: 0,
        message: '',
        data: {
          total,
          size: pageSize,
          current: pageNum,
          list: Array(Number(pageNum) * Number(pageSize) > total ? total % Number(pageSize) : Number(pageSize))
            .fill(1)
            .map(() => ({
              id: Random.id(),
              name: Random.cname(),
              age: Random.integer(20, 50),
              birth: Random.datetime('yyyy-MM-dd HH:mm:ss'),
              email: Random.email(),
            })),
        },
      }
    },
  },
]
