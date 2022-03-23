<template>
    <div class="search-box">
        <el-input v-model="keyWord" placeholder="请输入要搜索的商品" @keyup.native.enter="search"> </el-input>
        <el-button icon="el-icon-search" @click="search">搜索</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyWord:"" //搜索关键字
        }
    },
    methods: {
        search(){
            this.$router.push("/search?keyword="+this.keyWord)
        }
    },
}
</script>

<style scoped>
    .search-box{
        width: 600px;
    }
    .search-box >>> input{
        color:lightpink;
        border: 1px solid lightgrey;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-right: none;
    }
    .search-box >>> button{
        color: slateblue;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .search-box >>>input:focus{
        color: lightsalmon;
        border:1px solid red;
    }
     .search-box >>>button:focus{
        color: lightsalmon;    
    }
    .search-box >>> .el-input{
        width:400px
    }


</style>