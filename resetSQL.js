let promiseSQL = require('./utils/promiseSQL');



function resetQuery(con, condition, newPass){
    let sql = 'UPDATE _user SET password ='+"'"+newPass+"'" +"WHERE email="+"'"+condition+"'";
    console.log("即将要执行的sql语句:  "+sql );
    return true;
}


 module.exports = resetQuery