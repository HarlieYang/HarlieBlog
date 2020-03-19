const now = Date.now()
const H_article  = require('../db/models/H_article')

const queryArticle = async (res) => {
    const query = await H_article.findAll()
    if (query.length>0) {
        return query[0]['dataValues']
    } else {
        return []
    }
};

const addArticle = async (title, content, sort_id) => {
    let data = await H_article.create({
        title: title,
        content: content,
        sort_id: sort_id,
        createdAt: now,
        updatedAt: now
    });
    let status = false
    if (data.id) {
        status = true
    }
    return {status}
}

const updateArticle = async (params,id) => {
    let res = await H_article.update(params,{
        'where': { 'id': id }
    });
    let status = false
    if (res.length > 0) {
        status = true
    }
    return {status}
}

const deleteArticle = async (id) => {
    let res = await H_article.destroy({
        'where': { 'id': id }
    });
    console.log(res)
    let status = false
    if (res) {
        status = true
    }
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