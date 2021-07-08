/*
 * @Author: your name
 * @Date: 2021-06-23 10:01:03
 * @LastEditTime: 2021-07-08 11:12:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /HarlieBlog/server/app.js
 */
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

const PORT = 7000;
const HOST = '0.0.0.0';
app.listen(PORT, HOST, () => {
    console.log('服务器已经启动,通过http://localhost:7000来访问')
});