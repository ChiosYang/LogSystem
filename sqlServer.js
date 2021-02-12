const mysql = require('mysql'),
    sqlConfig = require('./dao/sqlConfig');

// 创建连接
let connection = mysql.createConnection(sqlConfig)
// 连接数据库
connection.connect((err) => {
  if (err) throw err
  console.log('连接成功')
})
// 导出连接对象
module.exports = connection