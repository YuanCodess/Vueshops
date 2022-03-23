<template>
   <div class="search-box">
       <good-list :list="list"></good-list>
       <div v-if="list.length<=0">抱歉没有找到要搜索的商品</div>
   </div>
</template>

<script>
import GoodList from "@/components/GoodList"
import {getSearch} from "@/tools/Ajax"
export default {
    components:{
        GoodList
    },
    data() {
        return {
            list:[]
        }
    },
    created() {
        getSearch({
            word:this.$route.query.keyword
        }).then(res=>{
            console.log(res,"search++++++++++++")
            this.list = res
        })
    },
    beforeRouteUpdate (to, from, next) {
          getSearch({
            word:to.query.keyword
        }).then(res=>{
            console.log(res,"search++++++++++++")
            this.list = res
        })
        next()
    }

}
</script>

<style scoped>

</style>