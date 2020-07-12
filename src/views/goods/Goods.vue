<template>
<div class="Goods">
    
    <!-- 头部 -->
    <HeaderAdmin :list="['商品管理','商品列表']"></HeaderAdmin>
    <el-card>
        <!-- 搜索栏 -->
        <el-row :gutter="30">
            <el-col :span="8">
                <!-- 搜索框③ -->
                <el-input placeholder="请输入内容" v-model="params.query" clearable @clear="searchClearClick">
                    <el-button slot="append" icon="el-icon-search" @click="searchGoodsClick"></el-button>
                </el-input>
            </el-col>
            <el-col :span="3">
                <!-- 添加商品④ -->
                <el-button type="primary" @click="AddEditClick({})">添加商品</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table :data="goodsList" style="width: 100%" border>
            <el-table-column type="index"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="800px"> </el-table-column>
            <el-table-column prop="goods_price" label="商品价格（元）"> </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量" > </el-table-column>
            <el-table-column prop="add_time" label="创建时间"> </el-table-column>
            <el-table-column label="操作" width="130px">
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start" :enterable="false">
                        <!-- 编辑商品⑤ -->
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="AddEditClick(scope.row)"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start" :enterable="false" >
                        <!-- 删除商品 ⑥ -->
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="DeleteGoodClick(scope.row)"></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="params.pagesize"
        :current-page="params.pagenum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="goodsTotal">
        </el-pagination>

        <!-- 添加、编辑 商品的dialog ④⑤ -->
        <AddEditGoos ref="AddEditGoos" :addeditData="addeditData" :getGoodsList="getGoodsList" @updataGoodInfo="updataGoodInfo" :categoriesList="categoriesList"></AddEditGoos>
    </el-card>
</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue"  
import {reqGetGoods,reqDeleteGoods,reqGetCategories} from 'network/api';
import AddEditGoos from "./childCom/AddEditGoos"
export default {
    name:"Goods",
    components:{
       HeaderAdmin,AddEditGoos
    },
    data(){return{
        //定义获取商品列表的参数①
        params:{
            query:"",//查询参数---搜索③需要用到
            pagenum:1,//当前页码
            pagesize:5,//每页显示条数
        },
        goodsList:[],//商品列表
        goodsTotal:0,//商品总数 --分页③需要用到

        addeditData:{}, //添加、编辑事件传给子组件的数据④⑤
        categoriesList:[], //传给子组件的分类列表数据 ④⑤
    }},
    methods:{
        //设置方法①
        async getGoodsList(){
            const result = await reqGetGoods(this.params)
            this.goodsList = result.data.goods //保存商品列表
            this.params.pagenum = Number(result.data.pagenum) //记录当前页数
            this.goodsTotal = result.data.total //记录商品总数
            //将商品创建时间毫秒数转换成时间戳
            this.goodsList.forEach((item,index)=>{
                let date = new Date(item.add_time)//创建时间
                item.add_time = date.toLocaleString(); //重新修改商品列表中每一项的时间
            })
        },
        //分页事件②
        handleSizeChange(size){ //多少条每页
            this.params.pagesize = size
            this.getGoodsList()
        },
        handleCurrentChange(page){ //第几页
            this.params.pagenum = page
            this.getGoodsList()
        },
        //搜索商品事件③
        searchClearClick(){ //清空搜索框
            this.params.pagenum = 1 
            this.params.query = ""
            this.getGoodsList()
        },
        searchGoodsClick(){ //搜索商品
            this.params.pagenum = 1 
            this.getGoodsList()
        },
        //删除商品⑥
        async DeleteGoodClick(rowInfo){
            this.$confirm('确定要删除该商品嘛?',{
                title:"温馨提示",
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const result = await reqDeleteGoods(rowInfo.goods_id)
                if(result.meta.status!==200) return this.$message.error("删除商品失败")
                this.getGoodsList()
                this.$message.success("删除商品成功")
            }).catch(() => {
                this.$message.info('已取消删除');        
            });
            
        },
        // 添加、编辑事件 ④⑤
        AddEditClick(rowGoodInfo){
            this.addeditData = rowGoodInfo
            this.$refs.AddEditGoos.dialogVisible = true
            console.log(rowGoodInfo)
        },
        updataGoodInfo(){ //子组件传过来的更新
            this.addeditData = {}
        },
        async getCategoriesList(){ //获取分类列表
            const result = await reqGetCategories({tyep:"",pagenum:"",pagesize:""})
            if(result.meta.status !== 200) return this.$message.error("获取分类列表失败")
            this.categoriesList = result.data
        }
    },
    created(){
        //创建时获取商品列表①
        this.getGoodsList()
        // 创建时获取分类列表④⑤
        this.getCategoriesList()
    }
}
    
</script>
<style scoped lang="scss">
    
</style>