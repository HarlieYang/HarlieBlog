const express = require('express')
const bodyParser = require('body-parser')

const router = require('./main/router/router')
const app = express()

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({extended:false}))


app.all('*', function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
   res.header("X-Powered-By",' 3.2.1');
   res.header("Content-Type", "application/json;charset=utf-8");
   next();
})
    
app.use('/', router)

app.listen(7000,function(){
    console.log('服务器已经启动,通过http://127.0.0.1:7001来访问')
})
