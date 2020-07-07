<template>
<div class="AssignRoles">
    
    <el-dialog
    title="分配角色"
    :visible="dialogVisible"
    width="30%"
    :before-close="handleClose">
        <p>当前的用户：{{userInfoData.username}}</p>
        <p>当前的角色：{{userInfoData.role_name}}</p>
        <p>分配新角色：
            <el-select v-model="userRole" placeholder="请选择" @change="selectedClick">
                <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
                </el-option>
            </el-select>
        </p>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="AssignRolesClick">确 定</el-button>
        </span>
    </el-dialog>
    
</div>
</template>
    
<script>
import {reqRolesList,reqAssignRoles} from 'network/api.js';  
export default {
    name:"AssignRoles",
    data(){return{
        dialogVisible:false,
        //角色列表
        roleList:[],
        userRole:"",//默认选中
    }},
    props:{
        userInfoData:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        //关闭事件
        handleClose(){
            this.dialogVisible = false
            this.userRole = ""
        },
        //选中
        selectedClick(value){
            console.log(value)
        },
        //确定分配
        async AssignRolesClick(){
            const result = await reqAssignRoles(this.userRole)
            console.log(result)
        }
    },
    created(){
        reqRolesList().then(data=>{
            this.roleList = data.data
            console.log(this.roleList)
        })

    }
}
    
</script>
<style scoped lang="scss">
    p{
        margin: 15px 0;
    }
</style>