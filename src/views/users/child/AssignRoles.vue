<template>
<div class="AssignRoles">
    
    <el-dialog
    title="分配角色"
    :visible="dialogVisible"
    width="30%"
    :before-close="handleClose">
        <p>当前的用户：{{userRolesData.username}}</p>
        <p>当前的角色：{{userRolesData.role_name}}</p>
        <p>分配新角色：
            <el-select v-model="userRole" placeholder="请选择">
                <el-option
                v-for="item in rolesList"
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
import {reqAssignRoles} from 'network/api.js';  
export default {
    name:"AssignRoles",
    data(){return{
        dialogVisible:false,
        userRole:"",//默认选中
    }},
    props:{
        userRolesData:{ //userRolesData
            type:Object,
            default(){
                return {}
            }
        },
        rolesList:{ //权限列表
            type:Array
        }
    },
    methods:{
        //关闭事件
        handleClose(){
            this.dialogVisible = false
            this.userRole = ""
        },
        //确定分配async
        async AssignRolesClick(){
            const result = await reqAssignRoles(this.userRolesData.id,this.userRole)
            if(result.meta.status !== 200) return this.$message.error(result.meta.msg) //请求不成功
            //请求成功
            this.dialogVisible = false
            this.userRole = ""
            this.$emit("updateUsersList")
            this.$message.success(result.meta.msg)
        }
    },
}
    
</script>
<style scoped lang="scss">
    p{
        margin: 15px 0;
    }
</style>