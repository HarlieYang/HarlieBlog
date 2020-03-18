import tableName from './createTable.js'

class H_article {
    constructor () {

    }
    queryArticle = () =>{
        tableName.H_article.findAll().then(data => {
            // 查询所有数据
            console.log("All sort:", JSON.stringify(data));
            const data = JSON.stringify(data)
            return data
        });
    } 
    addArticle  = (params) =>{
        tableName.H_article.create(params).then(jane => {
            console.log("Jane's auto-generated ID:", jane.id);
        });
    } 
    deleteArticle = () => {
        tableName.H_article.destroy({
            where: {
                id: ""
            }
        }).then(() => {
            console.log("Done");
        });
    } 
    updateArticle = (params) => {
        tableName.H_article.update(params, {
            where: {
                id: null
            }
            }).then(() => {
                console.log("Done");
        });
    } 
}

export default H_article