<template>
<div class="RoleInformation">
    
    <el-row v-for="itemA in roleInformationDataList" :key="itemA.id" :gutter="20">
        <!-- 一级 -->
        <el-col :span="6">
            <el-tag closable @close="delRoles(itemA.id)">{{itemA.authName}}</el-tag>
            <i class="el-icon-caret-right"></i>
        </el-col>
        <el-col :span="18">
            <el-row v-for="itemB in itemA.children" :key="itemB.id">
                <!-- 二级 -->
                <el-col :span="8">
                    <el-tag type="success" closable @close="delRoles(itemB.id)">{{itemB.authName}}</el-tag> 
                    <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 三级 -->
                <el-col :span="16">
                    <el-tag type="warning" closable v-for="itemC in itemB.children" :key="itemC.id" @close="delRoles(itemC.id)">{{itemC.authName}}</el-tag> 
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    
</div>
</template>
    
<script>
import {reqDeleteRights} from "network/api"
export default {
    name:"RoleInformation",
    props:{
        roleInformationList:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){return{
        roleInformationDataList:[] //接收父组件的数据
    }},
    methods:{
        //删除角色的某个权限
        async delRoles(rolesId){
            const roleId = this.roleInformationList.id //角色ID
            const rightId = rolesId //权限ID
            //请求
            const result = await reqDeleteRights(roleId,rightId)
            //删除失败
            if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
            //删除成功
            this.$message.success(result.meta.msg)
            this.roleInformationDataList = result.data //让当前组件自动渲染dom
        }
    },
    created(){
        this.roleInformationDataList = this.roleInformationList.children //将父组件传过来的数据刻印到自己身上
    }
}
    
</script>
<style scoped lang="scss">
    .RoleInformation>.el-row:first-child{
        border-top: 1px solid #eee;
    }
    .el-row{
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        .el-row:last-child{
            border-bottom: none;
        }
    }
    .el-tag{
        margin: 15px;
    }
    
</style>