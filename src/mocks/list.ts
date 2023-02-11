import { Random } from 'mockjs';

import type { Method } from '.';

export default <Method[]>[
  {
    url: '/api/list',
    method: 'get',
    timeout: 2000,
    response: ({ query }) => {
      const { current = 1, size = 10 } = query;
      const total = 12345;
      const pageNum = Number(current);
      const pageSize = Number(size);
      return {
        code: 0,
        message: 'ok',
        data: {
          list: Array(Number(pageNum) * Number(pageSize) > total ? total % Number(pageSize) : Number(pageSize))
            .fill(1)
            .map(() => ({
              id: Random.id(),
              name: Random.cname(),
              age: Random.integer(20, 50),
              birth: Random.datetime('yyyy-MM-dd HH:mm:ss'),
              email: Random.email(),
            })),
          total,
          size: pageSize,
          current: pageNum,
        },
      };
    },
  },
];
