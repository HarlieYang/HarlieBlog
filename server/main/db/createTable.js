// 建模
const {sequelize, Sequelize} = require('./index')

// 技术类别表
const H_sort = sequelize.define('H_sort', {
    sort_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    sort_title: {
        type: Sequelize.STRING
    },
    create_time: {
      type: Sequelize.DATE
    }
});

// 技术文章表
const H_article = sequelize.define('H_article', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
    },
    sort_id: {
        type: Sequelize.INTEGER,
    },
    create_time: {
      type: Sequelize.DATE
    }
});

// const tableName = {
//     H_sort,
//     H_article
// }

console.log(H_sort)
console.log(H_article)
// export default tableName