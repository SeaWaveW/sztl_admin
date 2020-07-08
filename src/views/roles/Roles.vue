<template>
<div class="Roles">
    
    <!-- 头部 -->
    <HeaderAdmin :list="['权限管理','角色列表']"></HeaderAdmin>
    <el-card>
        <el-button type="primary" @click="AddEditRoleClick({})">添加角色</el-button>
        <el-table style="width: 100%" :data="rolesList" border>
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <RoleInformation :roleInformationList="scope.row"></RoleInformation>
                </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"> </el-table-column>
            <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="AddEditRoleClick(scope.row)">编辑</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="DeleteRoleClick(scope.row)">删除</el-button>
                    <el-button type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <AddEditRole ref="AddEditRole" :roleInfoData="roleInfoData" @UpdateRoleList="UpdateRoleList"></AddEditRole>
    
</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue" //头部
import RoleInformation from "./childCom/RoleInformation" //角色权限
import AddEditRole from "./childCom/AddEditRole" //添加编辑角色
import {reqRolesList,reqDeleteRolds} from "network/api"
export default {
    name:"Roles",
    components:{
       HeaderAdmin,RoleInformation,AddEditRole
    },
    data(){return{
        rolesList:[],//角色列表①
        roleInfoData:{} //传给子组件（添加、编辑角色）的数据②
    }},
    methods:{
        //获取角色列表①
        async getRolesList(){
            const result = await reqRolesList()
            this.rolesList = result.data
        },
        //添加、编辑角色事件②
        AddEditRoleClick(roleData){
            this.roleInfoData = roleData
            this.$refs.AddEditRole.dialogVisible = true //打开弹窗 
        },
        //接收子组件传过来的更新角色列表方法②
        UpdateRoleList(){
            this.getRolesList()
        },
        //删除角色③
        DeleteRoleClick(roleData){
            this.$confirm('是否删除该角色？',{
                title:"系统提示",
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const result = await reqDeleteRolds(roleData.id)
                if(result.meta.status !== 200) return this.$message.error( result.meta.msg)
                this.$message.success( result.meta.msg)
                this.getRolesList() //更新角色列表
            }).catch(() => {
                this.$message.info('已取消删除');         
            });
        }

    },
    created(){
        //一进当前路由就获取①
        this.getRolesList()
    }
}
    
</script>
<style scoped lang="scss">
    
</style>