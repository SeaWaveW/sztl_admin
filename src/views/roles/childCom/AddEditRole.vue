<template>
<div class="AddEditRole">
    
    <el-dialog
    :title="AddOrEdit ? '编辑角色' : '添加角色'"
    :visible.sync="dialogVisible"
    width="45%"
    :before-close="handleClose">
        <el-form :model="roleDataForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名称" prop="roleName">
                <el-input v-model="roleDataForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="roleDesc">
                <el-input v-model="roleDataForm.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="AddEditRoleClick">确 定</el-button>
        </span>
        
    </el-dialog>
    
</div>
</template>
    
<script>
import {reqAddRolds,reqEditRolds} from "network/api" 
export default {
    name:"AddEditRole",
    data(){return{
        dialogVisible:false, //弹窗默认是否打开 ①
        //表单①
        roleDataForm:{
            roleName:"",
            roleDesc:""
        },
        //表单效验规则①
        rules:{
           roleName:[
                { required: true, message: '请输入角色名称', trigger: 'blur' },
                { min: 2, message: '名称长度至少为 2 位', trigger: 'blur' }
           ],
           roleDesc:[
                { required: true, message: '请输入角色描述', trigger: 'blur' },
                { min: 2, message: '描述长度至少为 2 位', trigger: 'blur' }
           ]
        }
    }},
    props:{ //接收父组件传过来的数据②1
        roleInfoData:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        AddOrEdit(){ //判断父组件是否传有数据过来②2
            return Boolean( this.roleInfoData.roleName || this.roleInfoData.roleDesc )
        }
    },
    watch: {
        roleInfoData(newData){ //判断父组件传过来的数据是否发生变化②3
            const {roleName,roleDesc} = newData
            this.roleDataForm.roleName = roleName
            this.roleDataForm.roleDesc = roleDesc
        }
    },
    methods:{
        handleClose(){ //关闭弹窗 ①
            this.dialogVisible = false
            this.$refs.ruleForm.resetFields()
        },
        //添加、编辑 角色事件 ②
        AddEditRoleClick(){
            //先判断表单效验是否通过async
            this.$refs.ruleForm.validate(async boo =>{
                //表单效验通过
                if(boo){
                    // 再判断是添加还是编辑
                    if(this.AddOrEdit){ //编辑
                        //发送编辑请求
                        const result = await reqEditRolds(this.roleInfoData.id,this.roleDataForm)
                        if(result.meta.status !== 200) return this.$message.error(result.meta.msg) //编辑失败
                        this.$message.success("修改角色信息成功") //编辑成功
                        this.$emit("UpdateRoleList") //向父元素发送更新角色列表的请求
                        //最后关闭弹窗并清空表单及效验
                        this.dialogVisible = false
                        this.$refs.ruleForm.resetFields()
                    }
                    else{ //添加
                        //发送添加请求
                        const result = await reqAddRolds(this.roleDataForm)
                        if(result.meta.status !== 201) return this.$message.error(result.meta.msg) //添加失败
                        this.$message.success(result.meta.msg) //添加成功
                        this.$emit("UpdateRoleList") //向父元素发送更新角色列表的请求
                        //最后关闭弹窗并清空表单及效验
                        this.dialogVisible = false
                        this.$refs.ruleForm.resetFields()
                    }
                    
                }
            })
            
        }
    },
}
    
</script>
<style scoped lang="scss">
    
</style>