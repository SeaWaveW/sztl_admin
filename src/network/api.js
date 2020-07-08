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

//删除单个用户
export const reqDeleteUsers = id =>{
    return request({
        url:`users/${id}`,
        method:"delete"
    })
}

//角色(权限)列表
export const reqRolesList = () =>{
    return request({
        url:"roles",
        method:"get"
    })
}

//分配用户角色
export const reqAssignRoles = (id,rid) => {
    return request({
        url:`users/${id}/role`,
        method:"put",
        data:{
            rid
        }
    })
}




//编辑角色 O.o！
// export const reqAssignRoles = (id,roleName,roleDesc) =>{
//     return request({
//         url:`roles/${id}`,
//         method:"put",
//         data:{
//             roleName,roleDesc
//         }
//     })
// }
