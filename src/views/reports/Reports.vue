<template>
<div class="Reports">
    
    <!-- 头部 -->
    <HeaderAdmin :list="['数据统计','数据报表']"></HeaderAdmin>
    
    <div id="myChart" :style="{width: '800px', height: '500px'}"></div>

</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue"   
import {reqDataStatistics} from 'network/api';  
export default {
    name:"Reports",
    components:{
        HeaderAdmin
    },
    data(){return{
        
    }},
    mounted(){
        this.drawLine();
    },
    methods:{
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
                title: {
                    text: '用户来源'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['华东', '华南', '华北', '西部', '其他']
                },
                // toolbox: {  //下载图片
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '华东',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [2999, 3111, 4100, 3565, 3528, 6000]
                    },
                    {
                        name: '华南',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [5090, 2500, 3400, 6000, 6400, 6800]
                    },
                    {
                        name: '华北',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [6888, 4000, 8010, 12321, 13928, 12984]
                    },
                    {
                        name: '西部',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [9991, 4130, 7777, 12903, 13098, 41028]
                    },
                    {
                        name: '其他',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {},
                        data: [15212, 5800, 10241, 14821, 15982, 14091]
                    }
                ]
            });
        },
        async getDataStatistics(){
            const result = await reqDataStatistics()
            console.log(result)
        }
    },
}



</script>
<style scoped lang="scss">
    
</style>