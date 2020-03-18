const Sequelize = require('sequelize')  // 引入sequelize
const sequelize = new Sequelize('blog', 'root', '!Wzh18916152877', {
    host: 'rm-8vbh6cf3mfulpa660qo.mysql.zhangbei.rds.aliyuncs.com',
    dialect: 'mysql',
    port: '',
    pool: { //连接池
        max: 50,
        min: 0,
        acquire: 30000, // 建立连接最长时间
        idle: 10000 // 空闲最长连接时间
    },
    // 默认输出执行sql语句
    ladding: console.log(),

})
// 测试连接
sequelize.authenticate()
.then(res => {
    console.log(res)
    console.log('mysql connect success')
})
.catch(error => {
    console.log('mysql unenable connect',error)
})

// 关闭连接
// sequelize.close()
module.exports = {
    sequelize,
    Sequelize
}