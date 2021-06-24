const express = require('express')
const sortBll = require('../bll/sort.js') 
const articleBll = require('../bll/article.js') 
// const chinaTime = require('china-time');  // 时间库
var router = express.Router()

// 1. 查询技术类别
router.get("/getSort", (req, res, next) => {
    sortBll.querySort().then(result => {
        res.send(result)
    })
})

// 2. 查询文章
router.get("/getArticle", (req, res, next) => {
    let sortId =  req.body.sortId ? req.body.sortId : null
    articleBll.queryArticle(sortId).then(result => {
        res.send(result)
    })
})


// 3. 添加技术类别
router.post("/addSort", (req, res, next) => {
    let sortName,sortTitle
    if (req.body) {
        [ sortName,sortTitle ] = req.body
    }
    sortBll.addSort(sortName, sortTitle).then(result => {
        res.send(result)
    })
})

// 4.添加文章
router.post("/addArticle", (req, res, next) => {
    let sortId, title, content, url
    if (req.body) {
        [ sortId, title, content, url] = req.body
    }
    articleBll.addArticle(title, content, url, sortId).then(result => {
        res.send(result)
    })
})

// 5.删除类别
router.post("/deleteSort", (req, res, next) => {
    let id
    if (req.body) {
        id = req.body.id
    }
    sortBll.deleteSort(id).then(result => {
        res.send(result)
    })
})

// 6.删除文章
router.post("/deleteArticle", (req, res, next) => {
    let id
    if (req.body) {
        id = req.body.id
    }
    articleBll.deleteArticle(id).then(result => {
        res.send(result)
    })
})

module.exports = router