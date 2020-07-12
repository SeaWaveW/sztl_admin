<template>
<div class="Categories">
    
    <!-- 头部 -->
    <HeaderAdmin :list="['商品管理','商品分类']"></HeaderAdmin>
    <el-card>
        <el-row style="margin-bottom:20px;">
             <el-button type="primary" @click="AddCategoriesClick">添加分类</el-button>
        </el-row>
        <zk-table
        ref="table"
        :data="cart_list"
        :columns="columns"
        border
        :selection-type="false"
        :expand-type="false"
        :show-index="true"
        index-text="#"
        >
            <template slot="validity" scope="scope">
                <i class="el-icon-success"  style="color:green" v-if="!scope.row.cat_deleted"></i>
                <i class="el-icon-error"  style="color:red" v-else></i>
            </template>
            <template slot="sorting" scope="scope">
                <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
                <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
                <el-tag type="warning" v-else-if="scope.row.cat_level === 2">三级</el-tag>
            </template>
            <template slot="operation" slot-scope="scope">
                 <el-button type="primary" icon="el-icon-edit" size="mini" @click="EditCategoriesClick(scope.row)">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini" @click="DeleteCategoriesClick(scope.row)">删除</el-button>
            </template>
        </zk-table>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="cart_list_params.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="cart_list_params.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>

        <!-- 添加的dialog -->  
        <AddCategories ref="AddCategories" :allCategoriesList="allCategoriesList" :getCategoriesList="getCategoriesList"></AddCategories>
        <!-- 编辑的dialog -->
        <EditCategories ref="EditCategories"  :EditCategoriesData="EditCategoriesData" :getCategoriesList="getCategoriesList"></EditCategories>
    </el-card>
</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue" 
import {reqGetCategories,reqDeleteCat} from "network/api" 
import AddCategories from "./childCom/AddCategories.vue"
import EditCategories from "./childCom/EditCategories.vue"
export default {
    name:"Categories",
    components:{
        HeaderAdmin,AddCategories,EditCategories
    },
    data(){return{
        //①定义分类请求
        cart_list_params:{
            type:"",
            pagenum:1,//第几页
            pagesize:5,//每页几条
        },
        //①接收分类请求回来的数据
        total:0,//总页数
        cart_list:[],//数据
        columns:[ //表格各列监听的数据
            {
                label:"分类名称",
                prop:"cat_name"
            },
            {
                label:"是否有效",
                prop:"cat_deleted",//使用了template，这个无效了
                type:"template",
                template:"validity"
            },
            {
                label:"排序",
                prop:"cat_level",//使用了template，这个无效了
                type:"template",
                template:"sorting"

            },
            {
                label:"操作",
                type:"template",
                template:"operation"
            },
        ],
        //所有分类列表
        allCategoriesList:[],
        //编辑所需的的数据 11
        EditCategoriesData:{}

    }},
    methods:{
        //①请求分类数据
        async getCategoriesList(){
            const result = await reqGetCategories(this.cart_list_params)
            if(result.meta.status !== 200) return this.$message.error("请求分类参数列表数据失败")
            this.cart_list = result.data.result
            this.total = result.data.total
        },
        //②分页
        handleSizeChange(size){ //每页条
            this.cart_list_params.pagesize = size
            this.getCategoriesList()
        },
        handleCurrentChange(page){ //页
            this.cart_list_params.pagenum = page
            this.getCategoriesList()
        },
        //添加分类
        async AddCategoriesClick(){
            this.$refs.AddCategories.dialogVisible = true
            const result = await reqGetCategories({type:"",pagenum:"",pagesize:""})
            this.allCategoriesList = result.data
            console.log(this.allCategoriesList)
        },
        // 编辑按钮事件
        EditCategoriesClick(rowInfo){
            this.EditCategoriesData = rowInfo //12
            this.$refs.EditCategories.dialogVisible = true
        },
        // 删除按钮事件
        DeleteCategoriesClick(rowInfo){
            console.log(rowInfo)
            this.$confirm(`此操作会删除  ${rowInfo.cat_name}  分类, 是否继续?`,{
                title:"温馨提示",
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const result = await reqDeleteCat(rowInfo.cat_id)
                if(result.meta.status !== 200) return this.$message.error('删除失败!');
                this.getCategoriesList()
                this.$message.success('删除成功!');
            }).catch(() => {
                this.$message.info('已取消删除!');         
            });
        }
    },
    created(){
        //①一进来就请求分类数据
        this.getCategoriesList()
    }
}
    
</script>