const Sequelize = require('sequelize');
const config = require('./config');
const uuid = require('node-uuid');

console.log('init sequelize...');

const generateId = () => {
    return uuid.v4();
}
const ID_TYPE = Sequelize.STRING(50);
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

let sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000, // 建立连接最长时间
        idle: 10000 // 空闲最长连接时间
    },
    // 默认输出执行sql语句
    ladding: console.log(),
});

let defineModel = (name, attributes) => {
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
        type: ID_TYPE,
        allowNull: false
    };
    attrs.update_time = {
        type: ID_TYPE,
        allowNull: false
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        hooks: {
            beforeValidate: (obj) => {
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

const exp = {
    ID: ID_TYPE,
    generateId: generateId,
    defineModel: defineModel,
    sync: () => {
        sequelize.sync({ force: true });
        
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

module.exports = exp;