<template>
<div class="ViewLogistics">
    
    <el-dialog
    title="物流进度"
    custom-class="logistics"
    :visible="dialogVisible"
    width="40%"
    :before-close="handleClose">

        <span>这是一段信息</span>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
    </el-dialog>
    
</div>
</template>
    
<script>
// id
import {reqViewLogistics} from 'network/api';   
export default {
    name:"ViewLogistics",
    data(){return{
        dialogVisible:false,
        userLogisticsData:{}
    }},
    props:{
        LogisticsData:{
            type:Object,
            default(){
                return {}
            }
        },
    },
    watch: {
        LogisticsData(newData){
            this.userLogisticsData = newData
        }
    },
    methods:{
        handleClose(){
            this.dialogVisible = false
            this.$emit("updateLogisticsData")
        },
        async ViewLogistics(){
            const id = 1106975712662
            const result = await reqViewLogistics(id)
            console.log(result) 
        },
    },
    creatd(){
        this.ViewLogistics()
    }
}
    
</script>
<style scoped lang="scss">
</style>