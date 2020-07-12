<template>
<div class="AddEditGoos">
    
    <el-dialog
    :title="addORedit ? '修改商品信息' : '添加商品'"
    :visible="dialogVisible"
    width="35%"
    :before-close="handleClose">

        <!-- 商品表单 -->
        <el-form :model="goodsForm" :rules="goodsRules" ref="goodsForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="goods_name">
                <el-input v-model="goodsForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="goods_cat">
                <el-cascader
                style="width:100%"
                v-model="classification"
                :options="categoriesList"
                :props="props"
                @change="handleChange"
                clearable>
                </el-cascader>
            </el-form-item>
            <el-form-item label="价格" prop="goods_price">
                <el-input v-model="goodsForm.goods_price"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="goods_number">
                <el-input v-model="goodsForm.goods_number"></el-input>
            </el-form-item>
            <el-form-item label="重量" prop="goods_weight">
                <el-input v-model="goodsForm.goods_weight"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="AddOrEditClick">确 定</el-button>
        </span>
    </el-dialog>

    
</div>
</template>
    
<script>
import {reqAddGoods,reqEditGoods} from 'network/api'; 
import {regNumber} from 'tools/regExp';
export default {
    name:"AddEditGoos",
    data(){return{
        dialogVisible:false,
        //编辑所需要的id 5
        goods_id:0,

        // 判断是添加还是编辑 3
        addOReditInfo:{},

        //分类列表渲染配置 4-2
        props:{ 
            expandTrigger: 'hover' ,
            checkStrictly:true,
            value:"cat_id",
            label:"cat_name",
            children:"children"
        },
        //分类选中 4-3
        classification:[],

        //商品表单的数据 4
        goodsForm:{
            goods_name:"", //名称
            goods_cat:"",//商品分类
            goods_price:"", //价格
            goods_number:"", //数量
            goods_weight:"", //重量
        },
        goodsRules:{
            goods_name:[
                { required: true, message: '请填写商品名称', trigger: 'blur' },
            ],
            goods_cat:[
                { required: true, message: '请选择商品的分类', trigger: 'blur' },
            ],
            goods_price:[
                { required: true, message: '请输入商品价格', trigger: 'blur' },
                { validator:regNumber, message: '价格为整数', trigger: 'blur' }
            ],
            goods_number:[
                { required: true, message: '请输入商品库存', trigger: 'blur' },
                { validator:regNumber, message: '库存为整数', trigger: 'blur' }
            ],
            goods_weight:[
                { required: true, message: '请输入商品单个重量', trigger: 'blur' },
                { validator:regNumber, message: '商品重量为整数', trigger: 'blur' }
            ]
        }
    }},
    props:{ //接收父组件穿过来的数据 1
        addeditData:{
            type:Object,
            default(){
                return {}
            }
        },
        // 接收父组件传过来的方法 6
        getGoodsList:{
            type:Function
        },
        // 
        categoriesList:{ //分类列表 4-1
            type:Array, 
            default(){
                return []
            }
        }
    },
    watch: { //监听父组件穿过来的数据 2
        addeditData(newGoodData){

            this.addOReditInfo = newGoodData //3

            //3 4 5 6
            if( newGoodData.goods_id || newGoodData.goods_name){
                const {goods_id,goods_name,goods_price,goods_number,goods_weight} = newGoodData
                const goods_cat = ""
                this.goodsForm = {
                    goods_name,goods_cat,goods_price,goods_number,goods_weight
                },
                this.goods_id = goods_id
            }

        }
    },
    computed:{
        // 6 设置计算属性-辨明是添加还是编辑---添加为false、编辑为true
        addORedit(){
            return Boolean(this.addOReditInfo.goods_id || this.addOReditInfo.goods_name)
        }
    },
    methods:{
        //取消事件 7
        handleClose(){
            this.dialogVisible = false
            this.$refs.goodsForm.resetFields()
            this.classification = []
            this.goods_id = 0
            this.$emit("updataGoodInfo") //向父组件发送更新传过来的数据事件
        },
        //确定事件 8 --发送请求
        AddOrEditClick(){
            this.$refs.goodsForm.validate(async boo => {
                if(!boo) return //表单验证未通过
                //表单验证通过
                if(this.addORedit){ //编辑
                    const result = await reqEditGoods(this.goods_id,this.goodsForm)
                    //修改失败
                    if(result.meta.status !== 200) return this.$message.error(result.meta.msg)
                    //修改成功
                    this.$message.success("修改商品信息成功")
                    this.getGoodsList()
                    this.handleClose()

                }else{ //添加
                    const result = await reqAddGoods(this.goodsForm)
                    //添加失败
                    if(result.meta.status !== 201) return this.$message.error(result.meta.msg)
                    //添加成功
                    this.$message.success("添加商品成功")
                    this.getGoodsList()
                    this.handleClose()

                }
            })
        },
        handleChange(){ //4-4 级联列表选中
            this.goodsForm.goods_cat = this.classification.join(",")
        }
    },

}
    
</script>
<style scoped lang="scss">
    
</style>