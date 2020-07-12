<template>
<div class="HeaderAdmin">
    
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{list[0]}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{list[1]}}</el-breadcrumb-item>
    </el-breadcrumb>
    
</div>
</template>
    
<script>
    
export default {
    name:"HeaderAdmin",
    components:{
        
    },
    data(){return{
        
    }},
    props:{
        list:{
            type:Array,
            default(){
                return ["一级","二级"]
            }
        }
    }
}
    
</script>
<style scoped lang="scss">
    .el-breadcrumb{
        padding-bottom: 10px;
        font-size: 10px;
    }
</style>