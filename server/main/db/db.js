const Sequelize = require('sequelize');

console.log('init sequelize...');

const sequelize = new Sequelize('blog', 'root', '!Wzh18916152877', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // 建立连接最长时间
        idle: 10000 // 空闲最长连接时间
    },
    // 默认输出执行sql语句
    ladding: console.log(),
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true
    };
    attrs.create_time = {
        type: Sequelize.DATE,
        allowNull: false
    };
    attrs.update_time = {
        type: Sequelize.DATE,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    if (!obj.id) {
                        obj.id = generateId();
                    }
                    obj.create_time = now;
                    obj.update_time = now;
                } else {
                    obj.updatedAt = Date.now();
                }
            }
        }
    });
}