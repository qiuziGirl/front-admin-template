const users = [
  {
    id: '0',
    name: '张三',
    nickName: '张三',
    gender: 'MALE',
    email: 'zhangsan@example.com',
  },
  {
    id: '1',
    name: '李四',
    nickName: '李四',
    gender: 'FEMALE',
    email: 'lisi@example.com',
  },
  {
    id: '2',
    name: '王五',
    nickName: '王五',
    gender: 'MALE',
    email: 'wangwu@example.com',
  },
  {
    id: '3',
    name: '赵六',
    nickName: '赵六',
    gender: 'FEMALE',
    email: 'zhaoliu@example.com',
  },
];

export default {
  'GET /api/v1/queryUserList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: users },
      errorCode: 0,
    });
  },
  'PUT /api/v1/user/:userId': (req: any, res: any) => {
    res.json({
      success: true,
      errorCode: 0,
    });
  },
};
