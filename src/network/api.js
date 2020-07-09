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

//角色列表
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

//获取列表式权限列表
export const reqRightsList = () => {
    return request({
        url:"rights/list",
        method:"get"
    })
}
//删除角色指定权限
export const reqDeleteRights = (roleId,rightId) => {
    return request({
        url:`roles/${roleId}/rights/${rightId}`,
        method:"delete"
    })
}

//添加角色
export const reqAddRolds = (addRoleData) => {
    return request({
        url:"roles",
        method:"post",
        data:addRoleData
    })
}
//编辑提交角色
export const reqEditRolds = (id,addRoleData) => {
    return request({
        url:`roles/${id}`,
        method:"put",
        data:addRoleData
    })
}

//删除角色
export const reqDeleteRolds = (id) => {
    return request({
        url:`roles/${id}`,
        method:"delete"
    })
}

//获取树状式权限列表
export const reqRightsTree = () => {
    return request({
        url:"rights/tree",
        method:"get"
    })
}

//角色授权
export const reqGiveRights = (roleId,rids) => {
    return request({
        url:`roles/${roleId}/rights`,
        method:"post",
        data:{
            rids
        }
    })
}


//商品列表数据
export const reqGetGoods = (params) => {
    return request({
        url:"goods",
        method:"get",
        params:params
    })
}

//添加商品
export const reqAddGoods = () => {
    return request({
        url:"goods",
        method:"post",
    })
}


//商品分类数据列表
export const reqGetCategories = (dataParams) => {
    return request({
        url:"categories",
        method:"get",
        params:dataParams
    })
}