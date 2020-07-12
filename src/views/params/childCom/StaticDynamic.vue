<template>
<div class="StaticDynamic">
    <el-row>
        <!-- 3 -->        
         <!-- <el-button type="primary" size="small">{{manyORonly ? "添加参数" : "添加属性"}}</el-button> -->
        <!-- 12 -->
        <!-- <el-button type="primary" size="small" @click="addMOClick">{{manyORonly ? "添加参数" : "添加属性"}}</el-button> -->
        <!-- 20 -->
        <el-button type="primary" size="small" @click="addMOClick" :disabled="selectCategories.length < 3">{{manyORonly ? "添加参数" : "添加属性"}}</el-button>
    </el-row>
    <!-- 5 -->
    <el-table :data="CategoriesAttributesList" stripe style="width: 100%" border>
        <el-table-column type="expand">
            <!-- 33 -->
            <template slot-scope="scope">
                <!-- 为什么会成数组，请看父组件中的34改造 -->
                <!-- <el-tag v-for="(item,index) in scope.row.attr_vals" :key="index" style="margin:0 10px;">{{item}}</el-tag> -->
                <el-tag v-for="(item,index) in scope.row.attr_vals" :key="index" style="margin:0 10px;" closable @close='deleteAttrvalsClick(scope.row,index)'>
                    {{item}}
                </el-tag>
                <!-- 41 -->
                <!-- <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="addInputTextJoinAttrvals"
                @blur="clearInputText"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button> -->
                <!-- 42 -->
                
                <el-input
                v-if="scope.row.inputVisible"
                v-model="scope.row.inputValue"
                ref="saveTagInput"
                size="small"
                style="width:120px"
                @keyup.enter.native="addInputTextJoinAttrvals(scope.row)"
                @blur="clearInputText(scope.row)"
                >
                </el-input>
                <el-button  class="button-new-tag" size="small" v-else @click="showInputClick(scope.row)" >+ New Tag</el-button>
            </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <!-- 6 -->
        <el-table-column prop="attr_name" :label="manyORonly ? '参数名称' : '属性名称'" ></el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                  <!-- 7 -->
                  <el-button type="primary" icon="el-icon-edit" size="mini" @click="editMOClick(scope.row)">编辑</el-button>
                  <!-- 50 删除事件 -->
                  <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteMOattridClick(scope.row)">删除</el-button>
            </template>
        </el-table-column>
    </el-table>
    
    <!-- 9 -->
    <!-- <el-dialog title="提示" :visible="dialogVisible" width="45%" :before-close="handleClose"> -->
    <!-- 19 -->
    <el-dialog :title="addOReditMO" :visible="dialogVisible" width="45%" :before-close="handleClose">
        <!-- 21 -->
        <el-form :model="paramsForm" :rules="paramsRules" ref="paramsForm" label-width="100px" class="demo-ruleForm">
            <el-form-item :label="manyORonly ? '动态参数' : '静态属性'" prop="attr_name">
                <el-input v-model="paramsForm.attr_name"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <!-- 24 -->
            <el-button type="primary" @click="addOReditClick">确 定</el-button>
        </span>
    </el-dialog>
    
</div>
</template>
    
<script>
import {reqAddCategorieAttr,reqEditCategorieAttr,reqDeleteCategorieSmallAttr,reqDeleteCategorieSmallAttrId} from 'network/api';
export default {
    name:"StaticDynamic",
    data(){return{
        // 10
        dialogVisible:false,
        // 15 保存的是编辑的那一行数据
        editCatData:{},
        // 21
        paramsForm:{
            attr_name:""
        },
        paramsRules:{
            attr_name:[
                { required: true, message: '请输入参数名', trigger: 'blur' },
            ]
        },
        // 41
        // inputVisible:false, //显示输入？
        // inputValue:"",//双向绑定
    }},
    props:{
        activeName:{ //接收传过来的参数类型说明 1
            type:String
        },
        CategoriesAttributesList:{ //接收传过来的参数列表 4
            type:Array
        },
        selectCategories:{ // 保存传过来的选中数组 20
            type:Array
        }
    },
    computed:{
        //判断是many还是only 2
        manyORonly(){ 
            //many 为 ture   only为false
            return this.activeName === "many"
        },
        // 14 添加还是编辑
        addOReditMO(){
            if(this.manyORonly){ //为many
                // 18
                if(this.editCatData.id || this.editCatData.attr_name){ //有数据为编辑
                    return "修改动态参数"
                }
                return "添加动态参数"

            }else{ //为only
                // 18
                if(this.editCatData.id || this.editCatData.attr_name){ //有数据为编辑
                    return "修改静态属性"
                }
                return "添加静态属性"
            }
        }
    },
    methods: {
        // 点击编辑按钮 8
        editMOClick(editCatData){
            this.dialogVisible = true
            // 16
            this.editCatData = editCatData
            // 22
            this.paramsForm.attr_name = editCatData.attr_name
        },
        // 11
        handleClose(){
            this.dialogVisible = false
            // 17 
            this.editCatData = {}
            // 22
            this.paramsForm.attr_name = ""
            // 23
            this.$refs.paramsForm.resetFields()
        },
        // 13
        addMOClick(){
            this.dialogVisible = true
            // 17
            this.editCatData = {}
        },
        // 24 点击确定，发送请求
        addOReditClick(){
            // 25 验证表单
            this.$refs.paramsForm.validate(async boo =>{
                if(boo){
                    // 27 获取传过来的数组的值（id）
                    const id = this.selectCategories[this.selectCategories.length-1]
                    // 28 获取输入的参数内容
                    const attr_name = this.paramsForm.attr_name
                    // 29 获取属性
                    const attr_sel = this.activeName
                    // 31 获取当前编辑的参数id
                    const attrId = this.editCatData.attr_id
                    // 26 当有数据的是为编辑
                    if(this.editCatData.id || this.editCatData.attr_name){
                        // 32 发送编辑请求
                        const result = await reqEditCategorieAttr(id,attrId,attr_name,attr_sel)
                        if(result.meta.status !== 200) return this.$message.error("修改失败")
                        this.$message.success("修改成功")
                        this.$emit("updateCatList")
                        this.handleClose()

                    }else{ //否则为添加
                        // 30 发送添加请求
                        const result = await reqAddCategorieAttr(id,attr_name,attr_sel)
                        if(result.meta.status !== 201) return this.$message.error("添加失败")
                        this.$message.success("添加成功")
                        this.$emit("updateCatList")
                        this.handleClose()
                    }

                }
            })
        },
        // 33
        async deleteAttrvalsClick(AttrvalsData,index){
            AttrvalsData.attr_vals.splice(index,1)
            // 34 获取传过来的数组的值（id）
            const id = this.selectCategories[this.selectCategories.length-1]
            // // 35 获取输入的参数内容
            const attr_name = AttrvalsData.attr_name
            // 36 获取属性
            const attr_sel = this.activeName
            // 37 获取当前删除的参数id
            const attrId = AttrvalsData.attr_id
            // 38 将当前的小参数再转换成字符串
            const attr_vals = AttrvalsData.attr_vals.join(" ")
            // 39 发送删除小的请求
            const result = await reqDeleteCategorieSmallAttr(id,attrId,attr_name,attr_sel,attr_vals)
            if(result.meta.status !== 200) return this.$message.error("删除失败")
            this.$message.success("删除成功")

        },
        // // 41 点击时让用户可以输入1
        // showInput(){
        //     this.inputVisible = true
        // },
        // // 41 失去焦点时清空输入的内容2
        // clearInputText(){
        //     this.inputValue = ""
        //     this.inputVisible = false
        // },
        // bug解决请看父组件42与本组件的42

        // 42
        // 让用户可以输入1
        showInputClick(rowInfo){
            rowInfo.inputVisible = true
            //获取焦点2
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        // 失去焦点时清空输入的内容3
        clearInputText(rowInfo){
            rowInfo.inputValue = ""
            rowInfo.inputVisible = false
        },
        // 43 按下回车时发送添加小参数请求
        async addInputTextJoinAttrvals(rowInfo){
            // 先把输入的 小参数 内容存下 44-1
            const atvas = rowInfo.inputValue
            // 获取 创建一个空数组 44-2
            const arr = [] //创建一个空数组
            // 循环本行所有小参数 44-3
            rowInfo.attr_vals.forEach(item=>{
                arr.push(item)
            })
            // 将输入的小参数添加到数组arr中 44-4
            arr.push(atvas)
            // 再将arr数组以空格形式拼接成字符串 44-5
            const attr_vals = arr.join(" ")

            // 获取传过来的数组的值（id） 45
            const id = this.selectCategories[this.selectCategories.length-1]
            // 获取 本行 的id 46
            const attrId = rowInfo.attr_id
            // 获取 本行 参数名 47
            const attr_name = rowInfo.attr_name
            // 获取属性方式 48
            const attr_sel = this.activeName

            // 先发送请求 49
            const result = await reqDeleteCategorieSmallAttr(id,attrId,attr_name,attr_sel,attr_vals)
            console.log(result)
            if(result.meta.status !== 200) return this.$message.error("添加失败") //添加失败
            //添加成功
            this.$message.success("添加成功")
            //再更新本页面
            rowInfo.attr_vals.push(atvas)
            //再让添加小参数的框框变回初始状态
            this.clearInputText(rowInfo)
            
            
        },
        // 50 删除参数
        deleteMOattridClick(rowInfo){
            // 弹框
            this.$confirm('此操作将会永久删除该参数或属性, 是否继续?',{
                title:"系统提示",
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                //当用户点击确定时
                // 获取 分类ID
                const id = this.selectCategories[this.selectCategories.length-1]
                // 获取当前的 参数ID
                const attrid = rowInfo.attr_id
                //发送请求
                const result = await reqDeleteCategorieSmallAttrId(id,attrid)
                if(result.meta.status!==200) return this.$message.error('删除失败!')
                this.$emit("updateCatList") //发送更新参数列表请求给父亲
                this.$message.success('删除成功!')
            }).catch(() => {
                this.$message.info('取消删除!')          
            });
        }
    },
    
}
    
</script>
<style scoped lang="scss">
    
</style>