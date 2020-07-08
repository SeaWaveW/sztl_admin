<template>
<div class="AddEditGood">
    
    <el-dialog
    :title="AddOrEditGood ? '编辑商品' : '添加商品'"
    :visible.sync="dialogVisible"
    width="35%"
    :before-close="handleClose">
        <!-- 5 -->
        <el-form :model="goodsDataForm" :rules="goodsDataRules" ref="goodsDataForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="goods_name">
                <el-input v-model="goodsDataForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label='分类' prop="goods_cat">
                <el-input v-model="goodsDataForm.goods_cat"></el-input>
            </el-form-item>
            <el-form-item label='价格' prop="goods_price">
                <el-input v-model="goodsDataForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label='数量' prop="goods_number">
                <el-input v-model="goodsDataForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label='重量' prop="goods_weight">
                <el-input v-model="goodsDataForm.goods_weight"></el-input>
            </el-form-item>
            <el-form-item label='介绍' prop="goods_introduce">
                <el-input v-model="goodsDataForm.goods_introduce"></el-input>
            </el-form-item>
            <el-form-item label='图片' prop="pics">
                <el-input v-model="goodsDataForm.pics"></el-input>
            </el-form-item>
            <el-form-item label='参数' prop="attrs">
                <el-input v-model="goodsDataForm.attrs"></el-input>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    
</div>
</template>
    
<script>
    
export default {
    name:"AddEditGood",
    components:{
        
    },
    props:{ //接收父组件传过来的数据1
        AddEditGoodsData:{ 
            type:Object,
            default(){
                return {}
            }
        }
    },
    watch: { //监听父组件传过来的数据3
        AddEditGoodsData(newGoodsData){
            this.goodsData = newGoodsData
        }
    },
    data(){return{
        dialogVisible:false, //0
        goodsData:{}, //创建本组件属性用于接收父组件的数据2,
        //表单
        goodsDataForm:{ //添加、编辑请求所需数据 5
            goods_name:"", //商品名称
            goods_cat:"",  //以为','分割的分类列表 
            goods_price:"", //价格
            goods_number:"", //数量
            goods_weight:"", //重量
            goods_introduce:"",//介绍--可为空
            pics:"",   //上传的图片临时路径（对象）--可为空
            attrs:"",  //商品的参数（数组），包含 `动态参数` 和 `静态属性`--可为空
        },
        //表单效验规则 
        goodsDataRules:{
            goods_name:[],
            goods_cat:[],
            goods_price:[],
            goods_number:[],
            goods_weight:[],
            goods_introduce:[],
            pics:[],
            attrs:[],
        }

    }},
    computed: {
        AddOrEditGood(){ //用于判断父组件传过来的数据，以便确认是添加还是编辑4
            return Boolean(this.goodsData.id || this.goodsData.goods_name)
        }
    },
    methods:{
        handleClose(){ //00
            this.dialogVisible = false
        }
    },
}
    
</script>
<style scoped lang="scss">
    
</style>