//引入并解析封装好的请求体
import {request} from './request';

//登录请求--解析传过来的数据
export const reqLogin = ({username,password}) => {
    return request({
        url:"login",
        method:"post",
        data:{
            username,password
        }
    })
}

//身份识别--左侧菜单权限menus.get
export const reqMenus = (()=>{
    return request({
        url:"menus",
        method:"get"
    })
})

//用户列表的请求
export const reqUsersList = ((params)=>{
    return request({
        url:"users",
        method:"get",
        params
    })
})