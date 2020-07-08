<template>
<div class="Reports">
    
    <!-- 头部 -->
    <HeaderAdmin :list="['数据统计','数据报表']"></HeaderAdmin>
    
</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue"     
export default {
    name:"Reports",
    components:{
        HeaderAdmin
    },
    data(){return{
        
    }},
    methods:{
        
    },
}
    
</script>
<style scoped lang="scss">
    
</style>