<template>
<div class="Categories">
    
    <!-- 头部 -->
    <HeaderAdmin :list="['商品管理','商品分类']"></HeaderAdmin>
    
</div>
</template>
    
<script>
import HeaderAdmin from "components/HeaderAdmin.vue"     
export default {
    name:"Categories",
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