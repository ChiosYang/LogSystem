/* 关于登陆的查询服务 */
let baseSql = require('../dao/baseSql')
// 查询用户
let queryUser = (con, uname, password) => {
  let queryObj = {u_name: uname}
  if (password) {
    queryObj.u_pass = password
  }
  return baseSql.query(con, '_user', queryObj)
}

// 插入用户
let insertUser = (con,userid, uname, upassword, uemail) => {
  console.log("This is begin of insertUser");

  let insertObj = {u_id: userid,u_name: uname, u_pass: upassword, u_email: uemail}
  
  return baseSql.insert(con, '_user', insertObj)
}

module.exports = {
  queryUser,
  insertUser
}