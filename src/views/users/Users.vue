<template>
<div class="Users">
    <!-- 头部 -->
    <HeaderAdmin :list="['用户管理','用户列表']"></HeaderAdmin>
    
    <el-card class="box-card">
        <!-- 搜索栏 -->
        <el-row :gutter="30">
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </el-col>
            <el-col :span="3">
                <el-button type="primary">添加用户</el-button>
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
                    <el-switch v-model="data.row.mg_state"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="data">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false" >
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="设置" placement="top" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
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
    
</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue"

import {reqUsersList} from 'network/api';

export default {
    name:"Users",
    components:{
        HeaderAdmin
    },
    data(){return{
        searchInput:"",//搜索栏的input框数据
        //getUsers请求
        params:{
            pagenum:1,//第几页
            pagesize:2,//每页多少条
        },
        //getUsers请求响应的数据替换掉表格中的数据
        usersData:[],
        //总页数
        total:0
    }},
    methods:{
        //用户列表请求
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
        //分页
        handleSizeChange(value){
            this.params.pagesize = value
            this.getUsers()
        },
         handleCurrentChange(value) {
            this.params.pagenum = value
            this.getUsers()
        }
    },
    created(){
        this.getUsers()
    }
}
    
</script>
<style scoped lang="scss">
</style>