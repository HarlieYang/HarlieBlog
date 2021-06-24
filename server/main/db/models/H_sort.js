const db = require('../db.js');
/**
 * @description: 类目表
 * @param {*}   sort_name   类目名称
 * @param {*}   sort_title  类目说明
 * @return {*}
 */
module.exports = db.defineModel('H_sort', {
    sortName: {
        type: db.STRING(100)
    },
    sortTitle: {
        type: db.STRING(100)
    }
});