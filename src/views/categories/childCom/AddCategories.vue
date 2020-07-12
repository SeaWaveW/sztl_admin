<template>
<div class="AddCategories">
    
    <el-dialog
    title="添加分类"
    :visible.sync="dialogVisible"
    width="45%"
    :before-close="handleClose">
        
        <el-form :model="addCatParamsInfo" :rules="addCategoriesRules" ref="addCategoriesForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类名称" prop="cat_name">
                <el-input v-model="addCatParamsInfo.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类" >
                <el-cascader
                v-model="checkCategoriesArray"
                :options="allCategoriesList"
                :props="props"
                @change="handleChange"
                clearable>
                </el-cascader>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="AddCategoriesClick">确 定</el-button>
        </span>
    </el-dialog>
    
</div>
</template>
    
<script>
import {reqGetCategories,reqAddCategories} from 'network/api.js';  
export default {
    name:"AddCategories",
    data(){return{
        dialogVisible:false,
        //表单
        addCategoriesRules:{
            cat_name:[
                 { required: true, message: '请输入分类名称', trigger: 'blur' },
            ]
        },
        checkCategoriesArray:[],//保存级联列表的选中
        props:{ //级联列表显示
            expandTrigger: 'hover',
            checkStrictly:true,
            value:"cat_id",
            label:"cat_name",
            children:"children"
        },
        //发送添加分类请求的数据
        addCatParamsInfo:{
            cat_pid:0,
            cat_name:"",
            cat_level:0,
        }

    }},
    props:{
        allCategoriesList:{ //接收父组件请求回来的所有分类列表
            type:Array,
            default(){
                return []
            }
        },
        getCategoriesList:{
            type:Function,
        },
    },
    methods:{
        //点击左上角X、取消、空白处关闭
        handleClose(){
            this.dialogVisible = false
            this.addCatParamsInfo.cat_pid = 0
            this.addCatParamsInfo.cat_name = ""
            this.addCatParamsInfo.cat_level = 0
            this.$refs.addCategoriesForm.resetFields()
        },
        //级联列表内容发生变化
        handleChange(){
            if(this.checkCategoriesArray.length === 0){
                this.addCatParamsInfo.cat_pid = 0
                this.addCatParamsInfo.cat_level = 0
                return
            }
            this.addCatParamsInfo.cat_pid = this.checkCategoriesArray[this.checkCategoriesArray.length-1]
            this.addCatParamsInfo.cat_level = this.checkCategoriesArray.length
        },
        //点击确定按钮发送更新请求
        AddCategoriesClick(){
            //1先验证表单是否通过
            this.$refs.addCategoriesForm.validate(async boo =>{
                if(!boo) return //不通过
                //通过--则发送请求
                const result = await reqAddCategories(this.addCatParamsInfo)
                if(result.meta.status !== 201) return this.$message.error("添加失败")
                this.$message.success("添加成功")
                this.handleClose()
                this.getCategoriesList()
                
            })
        }
    },
}
    
</script>
<style scoped lang="scss">
    
</style>