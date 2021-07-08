/*
 * @Author: your name
 * @Date: 2021-06-23 10:01:03
 * @LastEditTime: 2021-07-08 14:19:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /HarlieBlog/src/setupProxy.js
 */
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/api", {
        target: "http://115.159.109.203:7000" , //配置你要请求的服务器地址
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        },
    }))
};
