<template>
  <div class="list-box">
      <router-link  :to="`/detail?id=${item.Id}`" v-for="(item,i) in list" :key="item.Id">
            <img alt="" v-lazy="item.imageUrl">
            <h4 class="title">{{item.title}}</h4>
            <p> 
                <span class="price">￥{{item.priceStr}}</span>
                <span class="mack" v-html="item.mack"></span>
            </p>
      </router-link>
  </div>
</template>

<script>
export default {
    props:["list"],

}
</script>

<style scoped>
.list-box{
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

}
a{
    width: 210px;
    height: 220px;
    border:1px solid lightgray;
    box-sizing: border-box;
    margin: 20px 37px 0 0 ;
    text-decoration: none;
}
a:nth-child(5n){
    margin-right: 0;
}
img{
    width: 160px;
    height: 160px;
}
.price{
    text-align: left;
    float: left;
    position: relative;
    top: 10px;
}
.mack{
    float: right;
    position: relative;
    top: 10px;
}
.title{
    text-align: left;
    color: black;
}
.mack>>>span{
    padding: 0 5px;
}

</style>