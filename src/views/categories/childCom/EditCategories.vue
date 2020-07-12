<template>
<div class="EditCategories">
    
    <el-dialog
    title="修改分类"
    :visible="dialogVisible"
    width="40%"
    :before-close="handleClose">
    
        <el-form :model="EditData" :rules="EditDataRules" ref="EditData" label-width="100px" class="demo-ruleForm">
            <el-form-item label="分类名称" prop="cat_name">
                <el-input v-model="EditData.cat_name"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="EditCategoriesClick">确 定</el-button>
        </span>
    </el-dialog>
    
</div>
</template>
    
<script>
import {reqEditCat} from 'network/api';    
export default {
    name:"EditCategories",
    props:{
        EditCategoriesData:{
            type:Object
        },
        getCategoriesList:{
            type:Function
        }
    },
    data(){return{
        dialogVisible:false,
        EditData:{
            id:0,
            cat_name:""
        },
        EditDataRules:{
            cat_name:[
                 { required: true, message: '请输入分类名称', trigger: 'blur' },
            ]
        }
    }},
    watch: {
        EditCategoriesData(newData){
            this.EditData.id = newData.cat_id
            this.EditData.cat_name = newData.cat_name
        }
    },
    methods:{
        handleClose(){
            this.dialogVisible = false
        },
        EditCategoriesClick(){
            //先验证表单是否通过
            this.$refs.EditData.validate(async boo =>{
                if(!boo) return 
                const result = await reqEditCat(this.EditData.id,this.EditData.cat_name)
                if(result.meta.status!==200) return this.$message.error("修改失败")
                this.getCategoriesList()
                this.handleClose()
                this.$message.success("修改成功")


            })
            
        }
    },
}
    
</script>
<style scoped lang="scss">
    
</style>