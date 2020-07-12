<template>
<div class="Params">
    
    <!-- 头部 -->
    <HeaderAdmin :list="['商品管理','参数列表']"></HeaderAdmin>
    <el-card>
        <!-- 警示 -->
        <el-row> <el-alert title="注意：只允许为第三级分类设置相关参数！" type="warning" show-icon :closable="false"> </el-alert> </el-row>
        <!-- Cascader 级联选择器 -->
        <el-row style="margin:15px 0">
            <span>选择商品分类：</span> 
            <el-cascader v-model="selectCategories" :options="categoriesList" :props="options" @change="handleChange" :clearable="true"></el-cascader>
        </el-row>
        <!-- Tabs 标签页 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="many">
                <StaticDynamic :activeName="activeName" :CategoriesAttributesList="CategoriesAttributesList" :selectCategories="selectCategories" @updateCatList="updateCatList"></StaticDynamic>
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="only">
                <StaticDynamic :activeName="activeName" :CategoriesAttributesList="CategoriesAttributesList" :selectCategories="selectCategories" @updateCatList="updateCatList"></StaticDynamic>
            </el-tab-pane>
        </el-tabs>
    </el-card>
    
</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue"    
import {reqGetCategories,reqCategoriesAttributesList} from "network/api"
import StaticDynamic from "./childCom/StaticDynamic.vue"
export default {
    name:"Params",
    components:{
        HeaderAdmin,StaticDynamic
    },
    data(){return{
        categoriesList:[],//保存商品分类数据列表①
        //监听渲染 Cascader 级联选择器 ②
        options:{
            expandTrigger: 'hover',
            value:"cat_id",
            label:"cat_name",
            children:"children"
        },
        selectCategories:[],//保存选中的商品分类②
        activeName:"many",//选中Tabs标签对应的name②
        CategoriesAttributesList:[],//保存参数列表③
        
    }},
    methods:{
        //获取商品分类数据列表①
        async getCategoriesList(){
            const result = await reqGetCategories({type:"",pagenum:"",pagesize:""})
            this.categoriesList = result.data
        },
        //当商品分类被选中状态的改变事件②
        async handleChange(){
            if(this.selectCategories.length !== 3){
                this.selectCategories = []
                this.CategoriesAttributesList = []
                return
            }
            const id = this.selectCategories[this.selectCategories.length-1]
            const sel = this.activeName
            //发送参数列表请求③
            const result = await reqCategoriesAttributesList(id,sel)
            if(result.meta.status !==200) return this.$message.error("获取参数列表失败")
            // 子组件的34--对数据进行改造
            result.data.forEach(item =>{
                item.attr_vals = item.attr_vals.split(" ")
                //子组件的42---对数据改造
                item.inputVisible = false
                item.inputValue = ""
            })
            this.CategoriesAttributesList = result.data
            console.log(this.CategoriesAttributesList)
        },
        //Tabs标签页切换时的事件
        handleClick(){
            this.handleChange()
        },
        // 接收子组件传回来的更新参数列表请求
        updateCatList(){
            this.handleChange()
        }
    },
    created(){
        //一进该路由就发送请求①
        this.getCategoriesList()
    }
}
    
</script>
<style scoped lang="scss">
    
</style>