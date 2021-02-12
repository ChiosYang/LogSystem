let promiseSQL = require('../utils/promiseSQL');


/**
 * @param con: sql连接对象
 * @param table: 需要查询的表
 * @param condition: 需要查询的条件 Object
 * */
let query = (con, table, condition) => {
  let cKeys = Object.keys(condition),
      pram1, pram2 = '';
  if (cKeys.length !== 0) {
    pram1 = `where ${cKeys[0]}='${condition[cKeys[0]]}'`;
    if (cKeys.length === 2) {
      pram2 = `and ${cKeys[1]}='${condition[cKeys[1]]}'`
    }
  }
  console.log("这是即将要使用的sql语句"+`select * from ${table} ${pram1} ${pram2}`);
  return promiseSQL.querySql(con, `select * from ${table} ${pram1} ${pram2}`)
}

/**
 * @param con: sql连接对象
 * @param table: 需要插入的表
 * @param condition: 需要插入的对象
 * */
let insert = (con, table, condition) => {
  console.log("This is the begin of insert in baseSql");
  let cKeys = Object.keys(condition)
  console.log("this is cKeys:   " + cKeys);
  if (cKeys.length === 0) return new Promise.reject('插入无效')
  let attr = '', val = '';
  cKeys.forEach(key => {
    attr += key + ','
    val += `'${condition[key]}',`
  })
  console.log("foreach 之后的  ：  "+cKeys);
  attr = attr.substring(0, attr.length - 1)
  console.log(" attr ：  " + attr);
  val = val.substring(0, val.length - 1)
  console.log(" val :   "+val);
  let sql = `insert into ${table + '(' + attr + ')'} values ${'(' + val + ')'}`
  console.log("将要执行sql语句是：   " + sql);
  console.log("赋值完毕，准备执行promiseSQL中的querySql");
  return promiseSQL.querySql(con, sql)
}

module.exports = {
  query,
  insert
}