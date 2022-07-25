import { Random } from 'mockjs';
import { defineMock } from 'umi';

export default defineMock({
  'POST /api/login': (req, res) => {
    res.json({
      code: 0,
      message: 'ok',
      data: `token-${Date.now()}`,
    });
  },
  'POST /api/logout': (req, res) => {
    res.json({
      code: 0,
      message: 'ok',
    });
  },
  'GET /api/list': (req, res) => {
    const { current = 1, size = 10 } = req.query;
    const total = 12345;
    const pageNum = Number(current);
    const pageSize = Number(size);

    res.json({
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
    });
  },
  'GET /api/codeTest': (req, res) => {
    // res.sendStatus(401);
    res.json({
      code: -1,
      message: 'ERROR',
    });
    // res.json({
    //   code: 401,
    //   message: 'ERROR',
    // });
  },
});
