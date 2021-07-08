/*
 * @Author: your name
 * @Date: 2021-06-24 14:34:00
 * @LastEditTime: 2021-07-08 11:38:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /HarlieBlog/src/api/request.js
 */
import axios from 'axios'
import {Api} from './api'

axios.defaults.headers.post['Content-Type'] = 'text/plain'

// todo 更细化的操作
export const requestPost = (fun,kwargs = {}, method = 'post') => {
    console.log('kwargs',kwargs)
    
    const api = process.env.NODE_ENV === 'development' ? '/api' :'http://115.159.109.203:7000'
    return axios[method](  api + Api[fun],  kwargs )
    .then((res) => {
        let data
        switch(res.status){
            case 200:
                return res.data ? res.data : []
            case 404:
                data = '接口不存在'
                return { data:data, code: -1 }
            default:
                data = '接口错误'
                return { data:data, code: -1 }
        }
        
    })
    .catch((err) => {
        if(err.response) {
            return { data:err.response.data, code: -1 }
        }
    })
}