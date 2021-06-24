/*
 * @Author: HarlieYang
 * @Date: 2021-06-23 10:01:03
 * @LastEditTime: 2021-06-24 10:41:44
 * @LastEditors: Please set LastEditors
 * @Description: sequelize 统一Model的定义
 * @FilePath: /HarlieBlog/server/main/db/db.js
 */

const Sequelize = require('sequelize');
const config = require('./config');
const uuid = require('node-uuid');

console.log('init sequelize...');

/**
 * @description: 1. 创建一个sequelize对象实例
 * @param {*}
 * @return {*}
 */
const sequelize = new Sequelize(config.database, config.username, config.password, {
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


/**
 * @description: 2. 定义模型 映射数据库表
 * @param {*} name
 * @param {*} attributes
 * @return {*}
 */

const generateId = () => {
    return uuid.v4();
}

const ID_TYPE = Sequelize.STRING(50);
const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

const defineModel = (name, attributes) => {
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
    attrs.createdAt = {
        type: Sequelize.BIGINT,
        allowNull: false
    };
    attrs.updatedAt = {
        type: Sequelize.BIGINT,
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
                    obj.createdAt = now;
                    obj.updatedAt = now;
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
    // sync() 自动创建数据库
    sync: () => {
        sequelize.sync({ force: true });
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

module.exports = exp;