const now = Date.now()
const H_sort  = require('../db/models/H_sort')

const querySort = async (res) => {
    const query = await H_sort.findAll()
    return query[0]['dataValues']
};

const addSort = async (sort_name, sort_title) => {
    let data = await H_sort.create({
        sort_name: sort_name,
        sort_title: sort_title,
        createdAt: now,
        updatedAt: now
    });
    let status = false
    if (data.id) {
        status = true
    }
    return {status}
}

const updateSort = async (params,id) => {
    let res = await H_sort.update(params,{
        'where': { 'id': id }
    });
    let status = false
    if (res.length > 0) {
        status = true
    }
    return {status}
}

const deleteSort = async (id) => {
    let res = await H_sort.destroy({
        'where': { 'id': id }
    });
    console.log(res)
    let status = false
    if (res) {
        status = true
    }
    return {status}
}
// querySort().then(res => {
//     console.log('res-----',res)
// })
// addSort('名称','小标题')
// console.log(queryArticle())
// updateSort({sort_name: '名称一'},'c677687e-b2cc-47c9-ae01-76ff6a4b4004').then(res => {
//     console.log(res)
// })
// deleteSort('c677687e-b2cc-47c9-ae01-76ff6a4b4004')
let articleBll = {
    querySort,
    addSort,
    updateSort,
    deleteSort
}
module.exports = articleBll