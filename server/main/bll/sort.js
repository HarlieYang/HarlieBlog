const H_sort  = require('../db/models/H_sort')
const utils = require('../utils')

const querySort = async () => {
    const query = await H_sort.findAll()
    if (query.length>0) {
        return {status: 200 , data: query}
    } else {
        return {status: 200, data: []}
    }
    
};

const addSort = async ( sortName, sortTitle ) => {
    const data = await H_sort.create({
        sortName,
        sortTitle,
        createdAt: utils.getCurrentDateFn(),
        updatedAt: utils.getCurrentDateFn()
    });
    
    const status = data.id ? true : false
    return { status } 
}

const updateSort = async ( params, id ) => {
    let res = await H_sort.update(params,{
        'where': { 'id': id }
    });
    const status = res.length ? true : false
    return {status}
}

const deleteSort = async (id) => {
    let res = await H_sort.destroy({
        'where': { 'id': id }
    });
    const status = res.length ? true : false
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
let sortBll = {
    querySort,
    addSort,
    updateSort,
    deleteSort
}
module.exports = sortBll