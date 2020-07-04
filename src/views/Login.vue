<template>
<div class="Login">
    
    <div class="loginBox">
        <div class="logo">
            <img src="~assets/img/logo.png"/>
        </div>
        <el-form :model="login_form" :rules="rules" class="loginForm" ref="loginForm">
            <el-form-item prop="username">
                <el-input v-model="login_form.username">
                    <i class="iconfont icon-user" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="login_form.password" type="password">
                    <i class="iconfont icon-3702mima" slot="prefix"></i>
                </el-input>
            </el-form-item>
            <el-form-item class="loginFormBtns">
                <el-button type="primary" @click="loginClick">登录</el-button>
                <el-button type="info" @click="resetClick">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</div>
</template>
    
<script>
//引入并解析封装好的登录请求
import {reqLogin} from "network/api.js"
//引入本地存储
import stroage from "tools/storage"

export default {
    name:"Login",
    data(){return{
        //表单验证规则
        rules: {
            username:[
                 { required: true, message: '请输入登录名称', trigger: 'blur' },
                 { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
            ],
            password:[
                 { required: true, message: '请输入登录密码', trigger: 'blur' },
                 { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
            ]
        },
        //表单数据双向绑定
        login_form:{
            username:"",
            password:""
        }
    }},
    methods:{
        //登录事件
        loginClick(){
            //判断表单中数据是否符合验证规则
            this.$refs.loginForm.validate( async (valid)=>{
                //当不符合规则时,不继续后面操作
                if(!valid){return}
                //符合规则时：发送请求---配合等待await、
                const result = await reqLogin(this.login_form).then(data=>{
                    //当请求响应回来时,解析所需数据
                    const {msg,status} = data.meta
                    //登录不成功
                    if(status!=200){
                        return this.$message.error(msg);
                    }
                    //登录成功
                    //保存token到本地
                    stroage.session.set("token",data.data.token)
                    //再跳转
                    this.$router.replace("/home")
                    
                })
            })
        },
        //重置表单数据事件
        resetClick(){
            this.$refs.loginForm.resetFields()
        }
    }
}
    
</script>
<style scoped lang="scss">
    .Login{
        background-color:#2b4b6b;
        height:100%;
        align-items:center;
        justify-content:center;
        display:flex;
        .loginBox{
            width:450px;
            height:300px;
            background-color:#fff;
            position: relative;
            border-radius: 5px;
            .logo{
                width:132px;
                height:132px;
                border-radius: 50%;
                padding:10px;
                background-color:#fff;
                position: absolute;
                left: 50%;
                transform: translate(-50%,-50%);
                box-shadow: 0 0 10px #fff;
                img{
                    width:100%;
                    height:100%;
                    background-color:#eee;
                    border-radius: 50%;
                }
            }
            .loginForm{
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 0 20px;
                .loginFormBtns{
                    text-align: right;
                }
            }

        }
    }
</style>