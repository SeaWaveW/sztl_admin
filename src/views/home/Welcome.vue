<template>
<div class="Welcome">
    
    <h1>欢迎{{userInfo.username}},来到后台管理系统</h1>
<<<<<<< HEAD
    
=======
    <p>未完成功能：订单查询，地址修改，物流查看</p>
>>>>>>> dev
</div>
</template>
    
<script>
import stroage from 'tools/storage';    
export default {
    name:"Welcome",
    data(){return{
        userInfo:{}
    }},
    methods:{
        
    },
    created(){
        this.userInfo = stroage.session.get("userInfo")
    }
}
    
</script>
<style scoped lang="scss">
    
</style>