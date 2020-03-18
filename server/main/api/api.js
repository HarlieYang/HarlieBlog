const express = require('express')
var router = express.Router()

// 1.  
class requestApi {
    constructor (url) {
        url
    }
    GET = () => {
        router.get(this.url, (req, res, next) => {
            let result = []
            res.send(res)
        })
    }
    POST = () => {
        router.post(this.url, (req, res, next) => {
            let result = []
            res.send(res)
        })
    }
}

export default requestApi
