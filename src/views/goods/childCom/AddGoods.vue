<template>
<div class="AddGoods">
    <HeaderAdmin :list="['商品管理','商品列表']"></HeaderAdmin>
    <el-card>
        <el-row>
            <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
        </el-row>
        <el-row style="margin:15px 120px">
            <el-steps :space="150" :active="+tabPage" finish-status="success">
                <el-step title="基本信息"></el-step>
                <el-step title="商品参数"></el-step>
                <el-step title="商品属性"></el-step>
                <el-step title="商品图片"></el-step>
                <el-step title="商品内容"></el-step>
                <el-step title="完成"></el-step>
            </el-steps>
        </el-row>
        <el-tabs tab-position="left" v-model="tabPage" :before-leave="beforeLeave" >
            <el-tab-pane label="基本信息" name="0">
                <el-form :model="goodsForm" :rules="goodsRules" ref="goodsForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="商品名称" prop="goods_name">
                        <el-input v-model="goodsForm.goods_name"></el-input>
                    </el-form-item>
                    <el-form-item label="商品价格" prop="goods_price">
                        <el-input v-model="goodsForm.goods_price" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品重量" prop="goods_weight"> 
                        <el-input v-model="goodsForm.goods_weight" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品数量" prop="goods_number">
                        <el-input v-model="goodsForm.goods_number" type="number"></el-input>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="goods_cat">
                        <el-cascader
                        v-model="classification"
                        :options="categoriesList"
                        :props="props"
                        @change="handleChange"
                        :clearable="true">
                        </el-cascader>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1">
                <el-row style="font-size:14px;padding:10px">{{categoriesManyList[0].attr_name}}</el-row>
                <el-checkbox style="margin:5px 10px" border 
                v-for="(item,index) in categoriesManyList[0].attr_vals" :key="index" v-model="categoriesManyList[0].attr_vals_checked[index]"
                @change="attrValsCheckedClick(index)">
                    {{item}}
                </el-checkbox>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
                <el-form >
                    <el-form-item v-for="(item) in categoriesOnlyList" :label="item.attr_name" :key="item.attr_id">
                        <el-input v-model="item.attr_vals"></el-input>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
                <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
                <el-row>
                    <div ref="editorElem" style="text-align:left;"></div>
                </el-row>
                <el-row style="margin:15px 0">
                    <el-button type="primary" @click="addGoodsAdmin">添加商品</el-button>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </el-card>
    
</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue"   
import {reqGetCategories,reqCategoriesAttributesList,reqAddGoods} from 'network/api';  
import E from "wangeditor";
export default {
    name:"AddGoods",
    components:{
        HeaderAdmin
    },
    data(){return{
        categoriesList:[],//分类列表 1
        //表单 1
        goodsForm:{
            goods_name:"",
            goods_price:0,
            goods_weight:0,
            goods_number:0,
            goods_cat:"", 
        },
        //表单验证 1
        goodsRules:{
            goods_name:[
                { required: true, message: '请输入商品名称', trigger: 'blur' },
            ],
            goods_price:[
                { required: true, message: '请输入商品价格', trigger: 'blur' },
            ],
            goods_weight:[
                { required: true, message: '请输入商品重量', trigger: 'blur' },
            ],
            goods_number:[
                { required: true, message: '请输入商品数量', trigger: 'blur' },
            ],
            goods_cat:[
                // { required: true, message: '请选择商品分类', trigger: 'blur' },
            ],
        },
        //级联 1
        classification:[],//选中
        props:{ 
            expandTrigger: 'hover',
            clearable:true,
            value:"cat_id",
            label:"cat_name",
            children:"children"
        },
        //tab标签页 1
        tabPage:"0",
        //该many分类所有信息 2
        categoriesManyList:[
            {  attr_name:"",attr_vals:"" }//设置初始值，防报错3
        ],
        //该only分类所有信息 2
        categoriesOnlyList:[],
        //图片上传
        fileList: [],
        //富文本
        editor: null,
        editorContent: ''
    }},
    methods:{
        //获取分类列表 1
        async getCategoriesList(){ 
            const result = await reqGetCategories({tyep:"",pagenum:"",pagesize:""})
            if(result.meta.status !== 200) return this.$message.error("获取分类列表失败")
            this.categoriesList = result.data
        },
        //级联发生改变时的事件 1
        handleChange(value){
            if(value.length < 3){
                this.categoriesOnlyList = []
                this.categoriesManyList = [ {  attr_name:"",attr_vals:"" } ]
                this.fileList = []
                this.goodsForm.goods_cat = value.join(",")
            }else{
                this.getCategoriesAttributesList("many")
                this.getCategoriesAttributesList("only")
            }
            
        },
        //tab切换之前的钩子 1
        beforeLeave(newActive,oldActive){
            let p = new Promise( (resolve,reject) => {
                this.$refs.goodsForm.validate(boo =>{
                    if( !boo && this.goodsForm.goods_cat === ""){
                        this.$message.error("请选择商品分类")
                        reject()
                    }else{
                        resolve()
                    }
                })
            })
            return p
        },
        //获取选中的分类参数 2
        async getCategoriesAttributesList(way){
            console.log(`发送了${way}请求`)
            const result = await reqCategoriesAttributesList(this.classification[this.classification.length-1],way)
            if(result.meta.status !== 200) return this.$message.error("获取失败")
            console.log(result)
            if(way === "many"){
                if(!result.data[0]){
                    result.data[0] = []
                }
                if(result.data[0].attr_vals){
                    result.data[0].attr_vals = result.data[0].attr_vals.split(" ")
                }else{
                    result.data[0].attr_vals = []
                }
                //改造 3
                result.data[0].attr_vals_checked = []
                for(let i=0; i<result.data[0].attr_vals.length; i++){
                    result.data[0].attr_vals_checked.push(true)
                }
                this.categoriesManyList = result.data
            }else{
                this.categoriesOnlyList = result.data
            }
            
        },
        //tab切换事件 2
        // tabClick(){
        //     this.$nextTick(_=>{  this.$nextTick(_=>{
        //         // categories标签页
        //         if(this.tabPage==="1" && this.categoriesManyList[0].attr_name === ""){
        //             this.getCategoriesAttributesList("many")
        //         }
        //         // attr 标签页
        //         if(this.tabPage==="2" && this.categoriesOnlyList.length < 1){
        //             this.getCategoriesAttributesList("only")
        //         }
        //     })})
        // },
        // 参数点击事件 3
        attrValsCheckedClick(index){
            this.categoriesManyList[0].attr_vals_checked.splice(index,1)
            this.categoriesManyList[0].attr_vals.splice(index,1)
        },
        //图片上传
        handleRemove(file, fileList) {
            // console.log(file, fileList)
        },
        handlePreview(file) {
            // this.fileList.push(file)
            // console.log(this.fileList)
        },
        //富文本
        catchData(){},
        //添加商品
        async addGoodsAdmin(){
            //商品基本信息
            const {goods_name,goods_cat,goods_price,goods_number,goods_weight} = this.goodsForm

            //介绍
            let goods_introduce = ""

            //图片
            let pics = "" 

            //参数与属性
            let attrs = []
            //参数
            this.categoriesManyList.forEach(item=>{
                item.attr_vals = item.attr_vals.join(" ")
                attrs.push(item)
            })
            //属性
            this.categoriesOnlyList.forEach(item=>{
                attrs.push(item)
            })

            const addGoodData = {
                goods_name,goods_cat,goods_price,goods_number,goods_weight,goods_introduce,pics,attrs
            }
            
            const result = await reqAddGoods(addGoodData)
            if(result.meta.status !== 201) return this.$message.error("添加商品失败:"+result.meta.msg)
            this.$message.success("添加商品成功")
            this.$router.push("/goods")

        }
    },
    created(){
        this.getCategoriesList() //1
    },
    //富文本
    mounted() {
        this.editor = new E(this.$refs.editorElem);
        // 编辑器的事件，每次改变会获取其html内容
        this.editor.customConfig.onchange = html => {
        this.editorContent = html;
        this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
        };
        this.editor.customConfig.menus = [
        // 菜单配置
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
        ];
        this.editor.create(); // 创建富文本实例
    }
}
</script>
<style scoped lang="scss">

.el-tabs{
    // height: 810px;
}
</style>