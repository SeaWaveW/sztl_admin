<template>
<div class="Users">
    <!-- 头部 -->
    <HeaderAdmin :list="['用户管理','用户列表']"></HeaderAdmin>
    
    <el-card class="box-card">
        <!-- 搜索栏 -->
        <el-row :gutter="30">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="params.query" class="input-with-select"  clearable @clear="searchClearClick">
                    <el-button slot="append" icon="el-icon-search" @click="searchUsers"></el-button>
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" @click="AddUserClick">添加用户</el-button>
            </el-col>
        </el-row>
        <!-- 数据表格 -->
        <el-table
        :data="usersData"
        stripe
        border
        >
            <el-table-column label="" width="80" type="index" align="center"></el-table-column>
            <el-table-column prop="username" label="姓名" align="center"></el-table-column>
            <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
            <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
            <el-table-column prop="role_name" label="角色" align="center"></el-table-column>
            <el-table-column prop="mg_state" label="状态" align="center">
                <template slot-scope="data">
                    <el-switch v-model="data.row.mg_state" @change="changeUsersClick(data.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="data">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false" >
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="ExidUserClick(data.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUserClick(data.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="AssignRolesClick(data.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>

        </el-table>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="params.pagenum"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </el-card>
    
    <AddExidUsers ref="addexidusers" :userInfoData="userInfoData" :aeuClose="aeuClose" @updateUsersList="updateUsersList"></AddExidUsers>
    <AssignRoles ref="assignroles" :userRolesData="userRolesData" :rolesList="rolesList" @updateUsersList="updateUsersList"></AssignRoles>

</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue"
import {reqUsersList,reqUpdateUsersStatus,reqDeleteUsers,reqRolesList} from 'network/api';
import AddExidUsers from "./child/AddExidUsers.vue"
import AssignRoles from "./child/AssignRoles.vue"

export default {
    name:"Users",
    components:{
        HeaderAdmin,AddExidUsers,AssignRoles
    },
    data(){return{
        //getUsers请求
        params:{
            query:"",//搜索关键字-搜索栏的input框数据
            pagenum:1,//第几页
            pagesize:2,//每页多少条
        },
        //getUsers请求响应的数据替换掉表格中的数据
        usersData:[],
        //总页数
        total:0,
        //传给弹窗 添加用户、编辑用户、分配角色的数据
        userInfoData:{},
        //传给弹窗 分配角色 的数据
        userRolesData:{},//用户数据
        rolesList:[],//权限列表

    }},
    created(){
        //页面一创建就调用用户列表请求
        this.getUsers()
    },
    methods:{
        //用户列表请求--------------------------------------------------------------------------------------------------
        async getUsers(){
            const result = await reqUsersList(this.params)
            //判断是否请求成功
            if(result.meta.status !== 200){//不成功
                return this.$message.error({
                    message:"获取数据失败",
                    timeout:1000
                })
            }
            //请求成功
            
            const {users,total} = result.data
            this.usersData = users
            this.total = total
        },
        //分页--------------------------------------------------------------------------------------------------
        handleSizeChange(size){
            this.params.pagesize = size
            this.getUsers()
        },
         handleCurrentChange(page) {
            this.params.pagenum = page
            this.getUsers()
        },
        //搜索--------------------------------------------------------------------------------------------------
        searchUsers(){
            this.params.pagenum = 1 //从一页开始
            this.getUsers()
        },
        //搜索框清空还原
        searchClearClick(){
            this.params.pagenum = 1
            this.getUsers()
        },
        //添加用户事件--------------------------------------------------------------------------------------------------
        AddUserClick(){
            this.$refs.addexidusers.dialogVisible = true
            this.userInfoData = {}
        },
        //用户状态----------------------------------------------------------------------------
        async changeUsersClick(userData){
            const {id,mg_state} = userData
            const result = await reqUpdateUsersStatus(id,mg_state)
            if(result.meta.status != 200) return this.$message.error(result.meta.msg) //设置不成功
            this.$message.success(result.meta.msg)
        },
        //编辑用户事件--------------------------------------------------------------------------------------------------
        ExidUserClick(userData){
            this.userInfoData = userData
            this.$refs.addexidusers.dialogVisible = true
        },
        //添加、编辑按钮事件--bug解决
        aeuClose(){
            this.userInfoData = {}
        },
        //接收孩子传归来的事件updateUsersList
        updateUsersList(){
            this.getUsers() //更新列表
        },
        //删除单个用户
        deleteUserClick(data){
            this.$confirm('此操作会删除用户, 是否继续?', {
                title:"系统提示",
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const result = await reqDeleteUsers(data.id)
                if(result.meta.status !== 200) return this.$message.error("删除失败")
                this.$message.success("删除成功")
                this.getUsers()//更新列表
            })
        },
        //分配角色
        async AssignRolesClick(data){
            const result = await reqRolesList().then(data=>{
                this.rolesList = data.data
                console.log(this.rolesList)
            })
            this.$refs.assignroles.dialogVisible = true
            this.userRolesData = data
        }
    },
    
}
    
</script>
<style scoped lang="scss">
</style>