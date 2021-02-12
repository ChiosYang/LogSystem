/**
 * con: 连接sql的connection对象
 * sql: sql语句
 */
let querySql = (con, sql) => {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

module.exports = {
  querySql
}