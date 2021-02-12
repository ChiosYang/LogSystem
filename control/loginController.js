let loginService = require('../service/loginService'),
    connection = require('../sqlServer')
/* 登陆逻辑 */
let loginHandle = (req, res) => {
  res.clearCookie('userState')
  let {account, password} = req.body

  res.status(200)
  res.type('application/json')
  // 传入空字符
  if (!account || !password) {
    res.send({
      code: 0,
      message: '请输入账号或密码!'
    })
  }
  // 查询数据库 验证用户是否正确
  console.log("开始查询数据库 验证用户是否正确");
  loginService.queryUser(connection, account, password).then(result => {
    let check = result.length === 0
    // 用户不存在
    if (check) {
      res.send({code: 0, message: '用户名或密码错误'})
    } else {
      // 保存登陆信息到cookie
      res.cookie('userState', {isLogin: true, username: account})
      res.redirect('/')
    }
  })
}
/* 注册逻辑 */
let regHandle = (req, res) => {
 
  let { userid,account, password, email} = req.body;

  // 查询用户是否存在
  loginService.queryUser(connection, account).then(result => {
    let check = result.length !== 0;
    // 用户名存在
    if (check) {
      console.log("用户存在");
      return Promise.reject()
    }
    return Promise.resolve()
  }).then(result => {
    // 不存在就添加用户
    
    return loginService.insertUser(connection, userid,account, password, email)
  }).catch(() => {
    res.send({code: 0, message: '插入出现错误，用户已经存在'})
    return Promise.reject()
  }).then(result => {
    // 添加用户成功
    res.send({code: 1, message: '创建账号成功'})
  }).catch(() => {
  })
}

module.exports = {
  regHandle,
  loginHandle
}