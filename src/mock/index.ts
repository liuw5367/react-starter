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
    const { current = 1, size = 10 } = req.params;
    res.json({
      code: 0,
      message: 'ok',
      data: {
        list: Array(12345 % Number(size))
          .fill(1)
          .map(() => ({
            id: Random.id(),
            name: Random.cname(),
            age: Random.integer(20, 50),
            birth: Random.datetime('yyyy-MM-dd HH:mm:ss'),
            email: Random.email(),
          })),
        total: 12345,
        pageNum: current,
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
