const express = require('express')
const bodyParser = require('body-parser')

const router = require('./main/router/router')
const app = express()

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(bodyParser.urlencoded({extended:false}))

app.use('/', router)

app.listen(7000,function(){
    console.log('服务器已经启动,通过http://127.0.0.1:7000来访问')
})
