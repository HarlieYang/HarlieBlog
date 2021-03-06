const H_article  = require('../db/models/H_article')
const utils = require('../utils')

const queryArticle = async ( params,id ) => {
    const query = params.id ? 
    await H_article.findAll({  'order': [ ['createdAt', 'DESC'] ], where: { id: params.id} }) : 
    await H_article.findAll( {'order': [ ['createdAt', 'DESC'] ] })
    if (query.length>0) {
        return {status: 200 , data: query}
    } else {
        return {status: 200, data: []}
    }
};

const addArticle = async ( title, content, url, sortId ) => {
    // 获取到内容后，将内容放在html文件上传到oss中
    
    const data = await H_article.create({
        title,
        content,
        url,
        sortId,
        createdAt: utils.getCurrentDateFn(),
        updatedAt: utils.getCurrentDateFn()
    });
    // 
    const status = data.id ? true: false
    return {status }
}

const updateArticle = async ( params, id ) => {
    let res = await H_article.update( params, {
        'where': { 'id': id }
    });
    const status = res.length ? true: false
    return {status}
}

const deleteArticle = async (id) => {
    let res = await H_article.destroy({
        'where': { 'id': id }
    });
    const status = res ? true: false
    return {status}
}
// addArticle('标题','内容','a6df4dc8-e845-4fc4-8430-80960ac5d563')
// console.log(queryArticle())
// updateArticle({title: '标题'},'da6be260-c32c-449a-b369-0bfe5be62a66').then(res => {
//     console.log(res)
// })
// deleteArticle('da6be260-c32c-449a-b369-0bfe5be62a66')
let articleBll = {
    queryArticle,
    addArticle,
    updateArticle,
    deleteArticle
}
module.exports = articleBll