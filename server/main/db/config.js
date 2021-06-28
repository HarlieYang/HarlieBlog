/*
 * @Author: HarlieYang
 * @Date: 2021-06-23 10:01:03
 * @LastEditTime: 2021-06-28 16:44:10
 * @LastEditors: Please set LastEditors
 * @Description: 数据库配置文件
 * @FilePath: /HarlieBlog/server/main/db/config.js
 */

var config = {
    dialect: 'mysql',      
    database: 'blog',
    username: 'root',
    port: 3306,
    password: '数据库密码',
    host: 'rm-8vbh6cf3mfulpa660qo.mysql.zhangbei.rds.aliyuncs.com'
};

module.exports = config;
