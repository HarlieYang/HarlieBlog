const db = require('../db.js');

/**
 * @description: 
 * @param {*} title     文章标题
 * @param {*} content   文章内容
 * @param {*} sort_id   类目ID
 * @return {*}
 */
module.exports = db.defineModel('H_article', {
    title: {
        type: db.STRING,
        allowNull: false
    },
    content: {
        type: db.TEXT,
    },
    sortId: {
        type: db.STRING,
    }
});