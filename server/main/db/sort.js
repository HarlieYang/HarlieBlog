import tableName from './createTable.js'

class H_sort {
    constructor () {

    }
    querySort = () =>{
        tableName.H_sort.findAll().then(data => {
            // 查询所有数据
            console.log("All sort:", JSON.stringify(data));
            const data = JSON.stringify(data)
            return data
        });
    } 
    addSort  = (params) =>{
        tableName.H_sort.create(params).then(data => {
            console.log("Jane's auto-generated ID:", data.id);
            return data
        });
    } 
    deleteSort = (params) => {
        tableName.H_sort.destroy({
            where: {
                id: params.id
            }
        }).then(() => {
            console.log("Done");
        });
    } 
    updateSort = (params) => {
        tableName.H_sort.update(params, {
            where: {
                id: null
            }
            }).then(() => {
                console.log("Done");
        });
    } 
}

export default H_sort