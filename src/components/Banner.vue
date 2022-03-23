<template>
    <div class="banner-box">
        <el-carousel indicator-position="none" height="500px">
        <el-carousel-item v-for="(item,i) in imgUrls" :key="i">
            <img :src="item" alt="">
        </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
import {getBanner} from "../tools/Ajax.js"
export default {
    data() {
        return {
            imgUrls:[]
        }
    },
    created() {
        getBanner().then(res=>{
           this.imgUrls =  res.url
        })
    },
};
</script>

<style scoped>
.banner-box{
    width: 1200px;
    margin: auto;
    height: 500px;
}

img{
    height: 500px;
}
.banner-box >>> button{
    width:50px;
    height: 50px;
    background-color: purple;
    font-size: 30px;
}

</style>