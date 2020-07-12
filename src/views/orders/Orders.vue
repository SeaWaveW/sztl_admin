<template>
<div class="Orders">
    
    <!-- 头部 -->
    <HeaderAdmin :list="['订单管理','订单列表']"></HeaderAdmin>
    <el-card>
        <!-- 搜索栏 -->
        <el-row :gutter="30">
            <!-- 搜索框③ -->
            <el-col :span="8">
                <el-input placeholder="请输入内容" v-model="reqOrdersData.query" clearable @clear="searchOrders">
                    <el-button slot="append" icon="el-icon-search" @click="searchOrders"></el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-table :data="orderDataList" style="width: 100%" border>
            <el-table-column prop="order_number" label="订单编号" width="220px"></el-table-column>
            <el-table-column prop="order_price" label="订单价格"></el-table-column>
            <el-table-column label="是否付款">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.pay_status == 0">未付款</el-tag>
                    <el-tag type="success" v-else>已付款</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货"></el-table-column>
            <el-table-column label="下单时间">
                <template  slot-scope="scope">
                    {{ LDate(scope.row.create_time)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="190px">
                <template slot-scope="scope">
                    <el-button type="primary" icon="el-icon-edit" size="mini" @click="EditAddressClick(scope.row)"></el-button>
                    <el-button type="success" icon="el-icon-location" size="mini" @click="ViewLogisticsClick(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="reqOrdersData.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="reqOrdersData.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
        </el-pagination>
    </el-card>
    <!-- 修改收货地址dialog ④ -->
    <EditAddress ref="EditAddress" :addrData="addrData"></EditAddress>
    <!-- 查看物流⑤ -->
    <ViewLogistics ref="ViewLogistics" :LogisticsData="LogisticsData" @updateLogisticsData="updateLogisticsData"></ViewLogistics>
</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue"   
import {reqGetOrders} from 'network/api';  
import EditAddress from "./childCom/EditAddress" 
import ViewLogistics from "./childCom/ViewLogistics" 
export default {
    name:"Orders",
    components:{
        HeaderAdmin,EditAddress,ViewLogistics
    },
    data(){return{
        //订单列表请求参数①
        reqOrdersData:{
            query:"", //查询参数
            pagenum:1, //页数
            pagesize:5 //条数
        },
        //用于保存订单列表请求回来的数据①
        orderDataList:[],
        total:0,
        //点击修改收货地址的数据④
        addrData:{},
        //点击查看物流的数据 id(单号) ⑤
        LogisticsData:{},
    }},
    methods:{
        //请求订单列表①
        async getOrdersData(){
            const result = await reqGetOrders(this.reqOrdersData)
            const {total,goods} = result.data
            this.orderDataList = goods
            this.total = total
        },
        //转换时间为本地时间格式①
        LDate(dt){
            const date = new Date(dt)
            return date.toLocaleString()
        },
        //分页请求②
        handleSizeChange(size){
            this.reqOrdersData.pagesize = size
            this.getOrdersData()

        },
        handleCurrentChange(page){
            this.reqOrdersData.pagenum = page
            this.getOrdersData()
        },
        //搜索请求③
        searchOrders(){
            this.reqOrdersData.pagenum = 1
            this.getOrdersData()
        },
        // 修改收货地址④
        EditAddressClick(rowData){
            this.$refs.EditAddress.dialogVisible = true
            this.addrData = rowData
        },
        // 查看物流 ⑤
        ViewLogisticsClick(rowData){
            this.LogisticsData = rowData
            this.$refs.ViewLogistics.dialogVisible = true
        },
        updateLogisticsData(){
            this.LogisticsData = {}
        }


    },
    created(){//一进来就发送订单列表请求①
        this.getOrdersData()
    },
}
    
</script>
<style scoped lang="scss">
    
</style>