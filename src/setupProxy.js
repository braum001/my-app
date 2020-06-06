//跨域
//设置代理
const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(createProxyMiddleware([process.env.REACT_APP_BASE_URL], {
        target: process.env.REACT_APP_API,//配置要请求的服务器地址
        changeOrigin: true,
        pathRewrite: {
            [`^${process.env.REACT_APP_API}`]: "",
        }
    }))
    /* 
    1.匹配到devApi后 开始代理 http://www.web-jshtml.cn/api/react/devApi/login
    2.将devApi/login重写成/login
    3.替换之后的地址： http://www.web-jshtml.cn/api/react/login
    */
    // app.use(proxy("/manage/api",{
    //     target: "http://admintest.happymmall.com:7000",
    //     changeOrigin: true,
    // }))
}