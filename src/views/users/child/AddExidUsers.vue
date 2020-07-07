<template>
<div class="AddExidUsers">
    
    <el-dialog
    :title="detectionUser ? '修改用户信息' : '添加用户'"
    :visible="dialogVisible"
    width="50%"
    :before-close="handleClose">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" :disabled="detectionUser"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" v-if="!detectionUser">
                <el-input v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="mobile">
                <el-input v-model="userForm.mobile"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="userAddExid">确 定</el-button>
        </span>
    </el-dialog>
    
</div>
</template>
    
<script>
import {regMobile} from 'tools/regExp.js';
import {reqAddUsers,reqExitUsers} from "network/api.js"
export default {
    name:"AddExidUsers",
    data(){return{
        dialogVisible:false,
        //表单双向数据
        userForm:{
            username:"",
            password:"",
            email:"",
            mobile:""
        },
        userId:"",//接收某项需要操作的id
        //表单效验规则
        rules:{
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '用户名的长度在3~10个字符之间', trigger: 'blur' }
            ],
            password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '密码的长度在6~15个字符之间', trigger: 'blur' }
            ],
            email:[
                { required: true, message: '请输入邮箱', trigger: 'blur' },
                { type:"email", message: '请输入合法的邮箱', trigger: ['blur', 'change'] }
            ],
            mobile:[
                { required: true, message: '请输入手机号', trigger: 'blur' },
                { validator:regMobile, message: '请输入合法的手机号', trigger: 'blur' }
            ]
        }
    }},
    methods: {
        //右上角关闭窗口事件、与取消事件
        handleClose(){
            this.dialogVisible = false
            this.$refs.userForm.resetFields() //数据归置初始化，并移除效验规则
            //向父亲发送时间
            this.$emit("aeuClose")
        },
        //添加用户--修改用户
        userAddExid(){
            //先判断表单效验是否通过
            this.$refs.userForm.validate(async boo =>{
                if(!boo){ return } //验证未通过
                //通过验证
                if(this.detectionUser){ //修改用户
                    const result = await reqExitUsers(this.userId,this.userForm.email,this.userForm.mobile)
                    if(result.meta.status !== 200) return this.$message.error("修改用户失败："+result.meta.msg) //x修改失败
                    //修改成功
                    this.dialogVisible = false //关闭窗口
                    this.$refs.userForm.resetFields() //数据归置初始化，并移除效验规则
                    this.$emit("updateUsersList") //发送事件给父亲，让父亲更新列表
                    this.$message.success("修改用户信息成功")
                }
                else{ //添加用户
                    const result = await reqAddUsers(this.userForm)
                    //添加失败
                    if(result.meta.status !== 201){
                        return this.$message.error("添加用户失败："+result.meta.msg) //添加失败
                    }
                    //添加成功
                    this.dialogVisible = false //关闭窗口
                    this.$refs.userForm.resetFields() //数据归置初始化，并移除效验规则
                    this.$emit("updateUsersList") //发送事件给父亲，让父亲更新列表
                    this.$message.success("添加用户成功")
                }
            })
            
        },
    },
    props:{
        userInfoData:{ //父亲传给的数据
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed: {
        detectionUser(){
            return Boolean(this.userInfoData.id || this.userInfoData.username)
        }
    },
    watch: {
        userInfoData(newData){ //监听父亲传过来的数据是否发生变化
            const {id,username,email,mobile} = newData //解析所需要的数据
            this.userForm = {
                username,email,mobile,
                //因为当是修改用户时，密码是不需要的，因此赋予空值
                password:""
            }
            this.userId = id

        }
    },
}
    
</script>
<style scoped lang="scss">
    
</style>