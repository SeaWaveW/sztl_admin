<template>
<div class="Home">

<el-container>
    <el-header>
        <el-row :gutter="20">
            <el-col :span="1.5">
                <img src="~assets/img/heima.png">
            </el-col>
            <el-col :span="21">
                <span class="name">后台电商管理</span>
            </el-col>
            <el-col :span="1" :offset="0.5">
                 <el-button type="info" @click="exitClick">退出</el-button>
            </el-col>
        </el-row>
    </el-header>
    <el-container>
        <!-- 左侧导航栏 -->
        <el-aside width="200px">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航一</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                        <el-menu-item index="1-3">选项3</el-menu-item>
                    </el-menu-item-group>   
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>导航二</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 右侧内容 -->
        <el-main>
             <template>
                <el-table :data="tableData" style="width: 100%;" ref="multipleTable">
                    <el-table-column type="selection" width="55" @click="getTableData(tableData)"></el-table-column>
                    <el-table-column fixed prop="date" label="日期" width="150"></el-table-column>
                    <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                    <el-table-column prop="province" label="省份" width="120"></el-table-column>
                    <el-table-column prop="city" label="市区" width="120"></el-table-column>
                    <el-table-column prop="address" label="地址" width="300"></el-table-column>
                    <el-table-column prop="zip" label="邮编" width="120"> </el-table-column>
                </el-table>
            </template>
        </el-main>
    </el-container>
</el-container>

</div>
</template>
    
<script>   
export default {
    name:"Home",
    data() {return {
        //表单数据 
         tableData: [
            {
                date: '2016-05-03',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            },
            {
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
            },
        ],
        //表单选中数据收集
        multipleSelection: [],
    }},
    methods: {
        //左边侧栏
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        getTableData(data){
            console.log(data)
        },
        //退出事件
        exitClick(){
            this.$confirm("是否退出系统？",{
                title:"系统提示:",//标题
                type: 'info',
                confirmButtonText: '确定', //确定按钮文本内容
                cancelButtonText: '取消', //取消按钮文本内容
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message.warning({
                    type: 'warning',
                    message: '已取消删除'
                });          
            });
        }
        
    }
}  
</script>
<style scoped lang="scss">
    $headerHeight:60px;
    .el-header{
        height: $headerHeight;
        background-color: #303133;
        line-height: $headerHeight;
        min-width: 1380px;
        .name{
            font-size: 20px;
            color: #E4E7ED;
        }
    }
    .el-aside,.el-main{
        height: calc(100% - $headerHeight);
    }
    .el-aside{
        background-color: red;
    }
    .el-main{
        background-color: pink;
        .el-table-column{
            text-align: center;
        }
    }
</style>