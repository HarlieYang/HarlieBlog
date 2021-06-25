import axios from 'axios'
import {Api} from './api'

axios.defaults.headers.post['Content-Type'] = 'text/plain'

// todo 更细化的操作
export const requestPost = (fun,kwargs = {}) => {
    const api = 'http://127.0.0.0:7000'
    return axios.post( api + Api[fun], kwargs )
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