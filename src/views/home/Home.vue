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
        <el-aside :width="collapseFlag ? '180px' : '64px'">
            <div class="shrinkage" @click="collapseFlag = !collapseFlag">|||</div>
            <el-menu 
                class="el-menu-vertical-demo" 
                background-color="#333744" 
                text-color="#fff" 
                active-text-color="#fafd66" 
                unique-opened 
                :collapse="!collapseFlag" 
                :collapse-transition="false"
                router
                :default-active="activePath"
            >
                <el-submenu v-for="item in menuList" :key="item.id" :index="item.id+''" >
                    <template slot="title">
                        <i :class="iconList[item.id]"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item v-for="citem in item.children" :key="citem.id" :index="'/'+citem.path">
                        <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span>{{citem.authName}}</span>
                        </template>
                        
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-aside>
        <!-- 右侧内容 -->
        <el-main>
             <router-view />
        </el-main>
    </el-container>
</el-container>

</div>
</template>
    
<script> 
//引入请求
import {reqMenus} from 'network/api';

export default {
    name:"Home",
    data() {return {
        menuList:[], //侧边栏数据
        iconList:{  //侧边栏导航小图标
            "125":"iconfont icon-user",
            "103":"iconfont icon-tijikongjian",
            "101":"iconfont icon-shangpin",
            "102":"iconfont icon-danju",
            "145":"iconfont icon-baobiao",
        },
        collapseFlag:true,//侧边栏导航收起条件
    }},
    methods: {
        //退出事件
        exitClick(){
            this.$confirm('是否退出系统？',{
                title:"系统提示",
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                sessionStorage.clear()
                this.$router.replace("/login")
                this.$message.success({ 
                    message: '退出成功!',
                    timeout:1000
                })
            })
        },
        //左侧菜单栏请求
        async getMenu(){
            const result = await reqMenus()
            //请求失败
            if(result.meta.status !== 200){
                return this.message.error("获取左侧菜单栏失败")
            }
            //请求成功--保存数据--回到data新建属性用于保存
            this.menuList = result.data
        },

    },
    created(){
        //调用左侧菜单栏请求
        this.getMenu()
    },
    computed: {
        activePath(){ //侧边栏导航路由条件-----激活路由
            //新建一个空数组用于接收children的路由地址地址
            const childrenPathList = new Array()
            //将保存的数据进行循环
            this.menuList.forEach(item=>{
                //将每一项item的children再次进行循环
                item.children.forEach(citem=>{
                    //将每一项children中的路由地址添加到空数组childrenPathList当中
                    childrenPathList.push("/"+citem.path)
                })
            })
            //新建一个childrenPath常量用于接收 在childrenPathList中查找到的对应的路由
            const childrenPath = childrenPathList.find(item=>{
                //如果路由当中包含，childrenPathList中某一项的路由地址，则返回childrenPathList对应的路由地址
                return this.$route.path.indexOf(item)>=0
            })
            return childrenPath
        }
    },
}  
</script>
<style scoped lang="scss">
    .Home{
        min-width: 1380px;
    }
    $headerHeight:60px;
    .el-header{
        height: $headerHeight;
        background-color: #333744;
        line-height: $headerHeight;
        
        .name{
            font-size: 20px;
            color: #E4E7ED;
        }
        .el-row{
            height: 100%;
            .el-col{
              height: 100%;  
            }
        }
    }
    .el-aside,.el-main{
        height: calc(100% - $headerHeight);
    }
    .el-aside{
        background-color: #333744;
        .el-menu{
            border: none;
            
        }
        .shrinkage{
            text-align: center;
            line-height: 25px;
            background-color: #606266;
            cursor: pointer;
        }
        .iconfont{
            margin-right:15px;
        }
    }
    .el-main{
        background-color: #eaedf1;
        .el-table-column{
            text-align: center;
        }
    }
</style>