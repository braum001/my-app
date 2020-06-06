import service from '../utils/reuqest';

export function Login(data){
    return service.request({
        url: "/login/",
        method: "post",
        data,//请求类型为post时接收数据
        // params: data 请求类型为get时接受数据
    })
}

//获取验证码
export function GetCode(data){
    return service.request({
        url: "/getSms/",
        method: "post",
        data,//请求类型为post时接收数据
        // params: data 请求类型为get时接受数据
    })
}