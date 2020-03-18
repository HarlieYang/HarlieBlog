const db = require('../db.js');

module.exports = db.defineModel('H_sort', {
    title: {
        type: db.STRING,
        allowNull: false
    },
    content: {
        type: db.STRING,
    },
    sort_id: {
        type: db.INTEGER,
    }
});