import H_article  from '../db/article'

const queryArticle = H_article.querySort()

const addArticle = (params) => {
    let params = {
        sort_name: params.sort_name,
        create_time: params.create_time
    }
    H_article.addArticle().then(res => {
        console.log(res)
    })
}

const  deleteArticle = (params) => {
    H_article.deleteArticle(params).then(res => {
        console.log(res)
    })
}

const updateArticle = (params) => {
    H_article.updateArticle(params).then(res => {
        console.log(res)
    })
}