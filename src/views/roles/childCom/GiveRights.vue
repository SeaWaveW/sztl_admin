<template>
<div class="GiveRights">
    <el-dialog
    title="提示"
    :visible="dialogVisible"
    width="30%"
    :before-close="handleClose">
        
        <el-tree
        ref="tree"
        :data="rightsTree"
        show-checkbox
        node-key="id"
        :props="rightsTreeProps"
        :default-expand-all="true"
        :default-checked-keys="currentRoleData"
        >
        
        </el-tree>

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="updateRoleRights">确 定</el-button>
        </span>
    </el-dialog>
    
    
</div>
</template>
    
<script>
import {reqRightsTree,reqGiveRights} from "network/api"  //②
export default {
    name:"GiveRights",
    data(){return{
        dialogVisible:false, //对话框①
        rightsTree:[],//用于保存获取到的树状权限列表数据②
        rightsTreeProps:{ //监听指定树状权限列表中的数据
            label:"authName",
            children:"children"
        },
        //存储父组件传过来的数据--选中③  ---会出现问题，请看④解决
        currentRoleData:[], //对应属性default-checked-keys
    }},
    methods:{
        handleClose(){ //对话框关闭事件①
            this.dialogVisible = false
            //④
            this.currentRoleData = [] //将选中数组重新设为空 1
            //使用nextTick函数确保setCheckedKeys正确清除缓存3
            this.$nextTick(()=>{
                this.$refs.tree.setCheckedKeys([]) //将element对此树状插件内部的数组也设为空2
                                  //此时发现只有第一次有数据可以渲染上去，从第二次开次就渲染不上了2
                                  //发生此问题是执行时机不对，因为setCheckedKeys是dom渲染前（时）就执行了，因此渲染不上去2
            })
            //发现点击取消后再次点击这个角色进行分配权限，监听中的事件没效果了，因为重复点击时，父组件传过来的数据没有发生变化4
            //解决
            this.$emit("updateRoleData")
        },
        //获取树状权限列表②
        async getRightsTree(){
            const result = await reqRightsTree()
            this.rightsTree = result.data
        },
        //设置递归函数-查询id--获取选中状态的id③
        getGiveRightsId(obj,arr){
            //当对象中不存在children时，表示为最后一层
            if( !obj.children ){ 
                return arr.push(obj.id)
            }
            //当对象中还存在child时，进行循环
            obj.children.forEach( item => {
                //循环时，每一次都会调用递归函数，相当于展开多分支进行循环
                this.getGiveRightsId(item,arr)
            })
        },
        //获取选中并进行分配请求⑤
        async updateRoleRights(){
            const roleId = this.roleRightsData.id //当前角色的ID
            const halfNode = this.$refs.tree.getHalfCheckedKeys()//半页子节点 -- 一个小横杠
            const allNode = this.$refs.tree.getCheckedKeys() //全叶子节点--打钩
            const rids = [...halfNode,...allNode].join(",")
            //发送请求
            const result = await reqGiveRights(roleId,rids)
            //更新失败
            if(result.meta.status !== 200) return this.$message.error("分配权限失败")
            //更新成功
            this.$message.success("分配权限成功")
            this.getRolesList()//调用父组件传过来的方法
            this.dialogVisible = false
        }

    },
    created(){
        this.getRightsTree() //一进来就获取树状权限列表②
    },
    props:{ 
        roleRightsData:{ //接收父组件传过来的数据③
            type:Object,
            default(){
                return {}
            }
        },
        getRolesList:{ //接收父组件传过来的的更新角色列表的方法⑤
            type:Function,
        }
    },
    watch: { //监听父组件传过来的数据③
        roleRightsData(newRoleData){
            //调用递归函数
            this.getGiveRightsId(newRoleData,this.currentRoleData)
        }
    },
}
    
</script>
<style scoped lang="scss">
    
</style>