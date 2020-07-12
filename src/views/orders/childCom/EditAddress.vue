<template>
<div class="EditAddress.">
    
    <el-dialog
    title="修改地址"
    :visible.sync="dialogVisible"
    width="40%"
    :before-close="handleClose">
        <el-form :model="addressDataForm" :rules="addressDataRules" ref="addressDataForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="省市区/县" prop="address">
                <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                style="width:100%">
                </el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailedAddress">
                <el-input v-model="addressDataForm.detailedAddress"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="EditAddressClick">确 定</el-button>
        </span>
    </el-dialog>
    
</div>
</template>
    
<script>
import { regionData } from 'element-china-area-data'
export default {
    name:"EditAddress.",
    data(){return{
        dialogVisible:false,
        //第三方地址插件需要绑定的数据
        options: regionData,
        selectedOptions:[],
        // 表单
        addressDataForm:{
            // 地址
            address:[],
            //详细地址
            detailedAddress:""
        },
        addressDataRules:{
            address:[
                { required: true, message: '请选择您的地址', trigger: 'blur' }
            ],
            detailedAddress:[
                { required: true, message: '请填写详细地址', trigger: 'blur' }
            ]
        },
        // 用户个人数据
        userData:{}
    }},
    props:{
        addrData:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    watch: {
        addrData(newAddrData){
            this.userData = newAddrData
        }
    },
    methods:{
        handleClose(){
            this.dialogVisible = false //关闭对话框
            this.$refs.addressDataForm.resetFields() //清空表单效验
            this.selectedOptions = [] //清空地址选择
        },
        // 地址发生变化
        handleChange(value){
            this.addressDataForm.address = value

        },
        // 发送修改地址请求
        EditAddressClick(){
            this.$refs.addressDataForm.validate(boo => {
                //验证不通过
                if(!boo) return console.log("表单验证不通过")
                //验证通过
                console.log("验证通过")
            })
            console.log(this.userData)
        }
    },
}
    
</script>
<style scoped lang="scss">
    
</style>