/*
 * @Author: HarlieYang
 * @Date: 2021-06-23 10:01:03
 * @LastEditTime: 2021-06-24 10:45:46
 * @LastEditors: Please set LastEditors
 * @Description: 自动导入所有Model：
 * @FilePath: /HarlieBlog/server/main/db/model.js
 */

const fs = require('fs');  // 文件系统类
const db = require('./db');

let files = fs.readdirSync(__dirname + '/models');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {};

// 1. 获取所有的model,映射数据库表
for (let f of js_files) {
    console.log(`import model from file ${f}...`);
    let name = f.substring(0, f.length - 3);
    module.exports[name] = require(__dirname + '/models/' + f);
}

// 创建所有映射数据表
module.exports.sync = (resolve,reject) => {
    db.sync() // 自动创建数据库
}