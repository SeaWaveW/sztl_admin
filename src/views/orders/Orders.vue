<template>
<div class="Orders">
    
    <!-- 头部 -->
    <HeaderAdmin :list="['订单管理','订单列表']"></HeaderAdmin>
    
</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue"     
export default {
    name:"Orders",
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