const express = require('express')
const query = require('./curd')
// var multer = require('multer')
const chinaTime = require('china-time');
var router = express.Router()

// 1. 查询类型
router.get("/getSort", (req, res, next) => {
    let result = []
    query("select * from H_sort",(err,vals,fields) => {
        //do something
        if (vals) {
            result = JSON.stringify(vals)
        }
        res.send({result})
    });
    
})
// 2. 根据类型、指定id查询文章
router.get("/getArticle", (req, res, next) => {
    let result = []
    let articleparams = `select A.title,A.create_time,B.sort_name from H_article A left join H_sort B on A.type=B.id `
    query(articleparams,(err,vals,fields) => {
        //do something
        if (vals) {
            result = JSON.stringify(vals)
        }
        res.send({result})
    });
    
})

router.post("/getArticle", (req, res, next) => {
    let result = []
    let articleparams = `select * from H_article where type = ${req.body.type} `
    console.log(articleparams)
    query(articleparams,(err,vals,fields) => {
        //do something
        if (vals) {
            result = JSON.stringify(vals)
        }
        res.send({result})
    });
    
}) 
// 添加技术类别
router.post("/addSort", (req, res, next) => {
    let sort_name
    let create_time = chinaTime('YYYY-MM-DD HH:mm:ss')
    console.log(req.body)
    if (req.body) {
        sort_name = req.body.sort_name
    }
    let insertparams = `insert into H_sort(sort_name,create_time) values ('${sort_name}', '${create_time}')`
    query(insertparams,(err,vals,fields) => {
        //do something
        if (vals) {
            res.send({
                res: 'ok'
            })
        }
       
    });
})

// 添加文章
router.post("/addSortCon", (req, res, next) => {
    let title, content, type
    let create_time = chinaTime('YYYY-MM-DD HH:mm:ss')
    console.log(req.body)
    if (req.body) {
        title = req.body.title
        content = req.body.content
        type = req.body.type
    }
    let insertparams = `insert into H_article(title,content,type,create_time) values ('${title}', '${content}', '${type}', '${create_time}')`
    query(insertparams,(err,vals,fields) => {
        //do something
        if (vals) {
            res.send({
                res: 'ok'
            })
        }
       
    });
})
module.exports = router