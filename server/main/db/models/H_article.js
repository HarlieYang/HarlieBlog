const db = require('../db.js');

module.exports = db.defineModel('H_article', {
    title: {
        type: db.STRING,
        allowNull: false
    },
    content: {
        type: db.STRING,
    },
    sort_id: {
        type: db.STRING,
    }
});