const db = require('../db.js');
module.exports = db.defineModel('H_sort', {
    sort_name: {
        type: db.STRING(100)
    },
    sort_title: {
        type: db.STRING(100)
    }
});