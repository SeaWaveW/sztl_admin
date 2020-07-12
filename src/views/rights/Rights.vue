<template>
<div class="Rights">
    
    <!-- 头部 -->
    <HeaderAdmin :list="['权限管理','权限列表']"></HeaderAdmin>
    <el-card>
        <el-table :data="rolesList" style="width: 100%" border>
            <el-table-column type="index" align="center"></el-table-column>
            <el-table-column prop="authName" label="权限名称" align="center"></el-table-column>
            <el-table-column prop="path" label="路径" align="center"></el-table-column>
            <el-table-column prop="level" label="权限等级" align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.level == 0">一级</el-tag>
                    <el-tag type="success" v-else-if="scope.row.level == 1">二级</el-tag>
                    <el-tag type="warning" v-else>三级</el-tag>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue"
import {reqRightsList} from 'network/api';
export default {
    name:"Rights",
    components:{
       HeaderAdmin 
    },
    data(){return{
        rolesList:[]
    }},
    methods:{
        async getAssignRolesList(data){
            const result = await reqRightsList()
            this.rolesList = result.data
        }
    },
    created(){
        this.getAssignRolesList()
    }
}
    
</script>
<style scoped lang="scss">
    
</style>