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

//1.8.1. 商品列表数据 --- 搜索商品
export const reqGetGoods = (params) => {
    return request({
        url:"goods",
        method:"get",
        params:params
    })
}

// 1.8.2. 添加商品
export const reqAddGoods = (addGoodsData) => {
    return request({
        url:"goods",
        method:"post",
        data:addGoodsData
    })
}


// 1.8.4. 编辑提交商品
export const reqEditGoods = (id,editGoodsData) => {
    return request({
        url:`goods/${id}`,
        method:"put",
        data:editGoodsData
    })
}


// 1.8.5. 删除商品
export const reqDeleteGoods = (id) =>{
    return request({
        url:`goods/${id}`,
        method:"delete"
    })
}



//1.6.1商品分类数据列表
export const reqGetCategories = (dataParams) => {
    return request({
        url:"categories",
        method:"get",
        params:dataParams
    })
}
//1.6.2添加分类
export const reqAddCategories = ({cat_pid,cat_name,cat_level}) => {
    return request({
        url:"categories",
        method:"post",
        data:{
            cat_pid,cat_name,cat_level
        }
    })
}
//1.7.1参数列表
export const reqCategoriesAttributesList = (id,sel) =>{
    return request({
        url:`categories/${id}/attributes`,
        method:"get",
        params:{
            sel
        }
    })
}
// 1.7.2 添加动态参数或者静态属性
export const reqAddCategorieAttr = (id,attr_name,attr_sel) =>{
    return request({
        url:`categories/${id}/attributes`,
        method:"post",
        data:{
            attr_name,attr_sel
        }
    })
}
// 1.7.5 编辑提交参数
export const reqEditCategorieAttr = (id,attrId,attr_name,attr_sel) => {
    return request({
        url:`categories/${id}/attributes/${attrId}`,
        method:"put",
        data:{
            attr_name,attr_sel
        }
    })
}

// 1.7.5 编辑提交参数--删除、添加附属小的参数
export const reqDeleteCategorieSmallAttr = (id,attrId,attr_name,attr_sel,attr_vals) => {
    return request({
        url:`categories/${id}/attributes/${attrId}`,
        method:"put",
        data:{
            attr_name,attr_sel,attr_vals
        }
    })
}

// 1.7.3 删除参数
export const reqDeleteCategorieSmallAttrId = (id,attrid) => {
    return request({
        url:`categories/${id}/attributes/${attrid}`,
        method:"delete"
    })
}

// 1.6.4. 编辑提交分类
export const reqEditCat = (id,cat_name) => {
    return request({
        url:`categories/${id}`,
        method:"put",
        data:{
            cat_name
        }
    })
}

// 1.6.5 删除分类
export const reqDeleteCat = (id) => {
    return request({
        url:`categories/${id}`,
        method:"delete"
    })
}


//1.10.1. 订单数据列表
export const reqGetOrders = (ordersData) => {
    return request({
        url:"orders",
        method:"get",
        params:ordersData
    })
}

// 1.10.5 查看物流信息
export const reqViewLogistics = (id) => {
    return request({
        url:`/kuaidi/${id}`,
        method:"get"
    })
}

// 1.11.1 基于时间统计的折线图
export const reqDataStatistics = () => {
    return request({
        url:"reports/type/1",
        method:"reports/type/1"
    })
}

