export default {
  'GET /api/test': (_req: any, res: any) => {
    res.json({
      success: true,
      data: {},
      errorCode: 0,
    });
  },
};
