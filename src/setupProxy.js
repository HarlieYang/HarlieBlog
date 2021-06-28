const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/api", {
        target: "http://42.192.37.59:7001" , //配置你要请求的服务器地址
        changeOrigin: true,
        pathRewrite: {
            '^/api': ''
        },
    }))
};
