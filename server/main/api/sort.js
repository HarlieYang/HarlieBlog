import requestApi from './api.js'
import '../bll/sort.js'

// let result = []
// query("select * from H_sort",(err,vals,fields) => {
//     //do something
//     if (vals) {
//         result = JSON.stringify(vals)
//     }
//     res.send({result})
// });
requestApi('/getSort').get().then(res => {

})