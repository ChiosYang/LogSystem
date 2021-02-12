//let resetSQL = require('./resetSQL');
let promiseSQL = require('./utils/promiseSQL');
let connection = require('./sqlServer')

//生成4位随机数字的验证码
function createNum(){
    var Num="";
        for(var i=0;i<4;i++)
        {
            Num+=Math.floor(Math.random()*10);
        }
        return Num;
}
var code = createNum();
//发送邮件
function sendMail(req,res){

    console.log("生成的验证码为： " + code );
    var nodemailer = require('nodemailer');
    let email = req.body.email;
    console.log("这里是 mailer ，看看我是什么" + email);
 
//邮箱配置
var config = {
    host : 'smtp.163.com',
    port : 25,
    auth:{
        user:'17660632279@163.com',
        pass:'RTPNQYNCOJGKCEBS'
    }
};

var transporter = nodemailer.createTransport(config);

function send(mail){
    transporter.sendMail(mail, function(error, info){
        if(error) {
            return console.log(error);
        }
        console.log('mail sent:', info.response);
    });
};
// 创建一个邮件对象
var mail = {
    // 发件人
    from: 'Alex<17660632279@163.com>',
    // 主题
    subject: '你好',
    // 收件人
    to: email,
    // 邮件内容，HTML格式
    text: '验证码为：'+code +'。愿您找到不期而遇的美好。'//可以是链接，也可以是验证码
};
send(mail);
}
function checkCode(req,res){
    let Inputcode = req.body.code;
    console.log("这个是要取到的用户输入的code ：" + Inputcode);
    let newPass = req.body.newPass;
    console.log("这个是要取到的用户输入的新密码 ：" + newPass);
    let email = req.body.email;
    console.log("这个是用户输入的邮件地址  :" + email);
    if(Inputcode == code){
        console.log("验证码正确！！");
        return resetQuery(connection,email,newPass);

    }else{
        console.log("验证码错误！！");   
    }
}
function resetQuery(con, condition, newPass){
    let sql = 'UPDATE _user SET u_pass ='+"'"+newPass+"'" +"WHERE u_email="+"'"+condition+"'";
    console.log("即将要执行的sql语句:  "+sql );
    return promiseSQL.querySql(connection, sql); 
}

module.exports = {
    sendMail,
    checkCode
}
