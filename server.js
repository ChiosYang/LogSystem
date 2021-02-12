const express = require('express'),
    bodyParser = require('body-parser'),
    promiseFS = require('./utils/promiseFS'),
    cookieParser = require('cookie-parser'),
    {regHandle, loginHandle} = require('./control/loginController'),
    {sendMail, checkCode } = require('./mailer')
   


// 创建服务
let app = express()
app.listen(8080, () => console.log('SUCCESS!'))

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json({
  extended: true
}))
app.use(cookieParser())
app.use(express.static('./static'))

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  //这段仅仅为了方便返回json而已
  res.header("Content-Type", "application/json;charset=utf-8");
  if(req.method == 'OPTIONS') {
  //让options请求快速返回
  res.sendStatus(200);
  } else {
  next();
  }
 });

// 处理路径

app.use((req, res, next) => {
    console.log("这里是server ， 看看取到了啥" + JSON.stringify(req.body));

  if (req.method === 'GET') {
    let {url} = req,
        cookies = req.cookies;
              
    url === '/' ? url = '/index.html' : null;
    // 已经登陆
    if (!!cookies.userState) {
      res.type('text/html')
      res.status(200)
      promiseFS.readFile(`./valid${url}`).then(result => {
        res.send(result)
      }).catch(err => {
        res.redirect('/index.html')
      })
      return
    }
    if (url === '/index.html' && !cookies.userState) {
      res.redirect('/login.html')
    }
  }
  next()
})


// 登陆接口
app.post('/user/login', loginHandle)

// 注册接口
app.post('/user/reg', regHandle)
//重置密码接口
app.post('/user/reset', sendMail)
//
app.post('/user/check',checkCode)