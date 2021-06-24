const db = require('../db.js');

/**
 * @description: 
 * @param {*} title     文章标题
 * @param {*} content   文章内容 是否需要存储 ？？？
 * @param {*} url       文章html地址
 * @param {*} sort_id   类目ID
 * @return {*}
 */
module.exports = db.defineModel('H_article', {
    title: {
        type: db.STRING,
        allowNull: false
    },
    content: {
        type: db.STRING,
    },
    url: {
        type: db.STRING,
    },
    sortId: {
        type: db.STRING,
    }
});