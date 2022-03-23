<template>
  <div class="home">
    <one-type></one-type>
    <banner></banner>
    <good-list :list="goodsData"></good-list>
    <div class="loading" >{{loadingTxt}}</div>
  </div>
</template>
<script>
import Banner from '@/components/Banner'
import OneType from '@/components/OneType'
import GoodList from '@/components/GoodList'
import {getShopList} from "../tools/Ajax"
export default {
  data(){
      return {
        isLoading:false,
        page:0 ,// 分页
        goodsData:[],
        loadingTxt:"正在加载中..."
      }
  },
  name: 'Home',
  components: {
   Banner,
   OneType,
   GoodList
  },
  created(){
    this.getGoodList()
    this.addScroll()
  },
  methods:{
      // created触发添加scroll事件
      addScroll(){
        window.addEventListener("scroll",this.bindScroll)
      },
      // 页面销毁的时候触发这个函数
      clearScroll(){
         window.removeEventListener("scroll",this.bindScroll)
      },

    // 触底加载的判断
      bindScroll(){
        if(this.isLoading) return
        var b = document.documentElement.scrollHeight
        var h = window.innerHeight
        var s = document.body.scrollTop||document.documentElement.scrollTop
        if(b-h-s<10){
          console.log("触底")
          this.getGoodList()
        }
     },
    // 请求数据的函数
     getGoodList(){
       this.page++
       this.isLoading = true
        getShopList({page:this.page}).then(res=>{
          this.isLoading = false
          console.log(res);
          if(res.length>0){
            this.goodsData.push(...res)
          }else{
            this.loadingTxt = "我是有底线的..."
          }
        })       
     }
  }
}
</script>
