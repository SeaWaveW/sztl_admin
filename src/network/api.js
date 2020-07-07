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

//用户列表的请求 与 关键字搜索
export const reqUsersList = ((params)=>{
    return request({
        url:"users",
        method:"get",
        params
    })
})

//用户状态修改
export const reqUpdateUsersStatus = ((uId,type)=>{
    return request({
        url:`users/${uId}/state/${type}`,
        method:"put"
    })
})

//添加用户
export const reqAddUsers = ((userForm)=>{
    return request({
        url:"users",
        method:"post",
        data:userForm
    })
})

//修改用户
export const reqExitUsers = ((id,email,mobile)=>{
    return request({
        url:`users/${id}`,
        method:"put",
        data:{
            email,mobile
        }
    })
})
