<template>
  <div>
    <!-- 遮罩层 小图片 放大的图片又包含在div里面-->
     <div ref="img_box" class="img-box" @mousemove="move" @mouseout="flag=false" @mouseover="flag=true">
       <!-- 原始图片 400*400-->
       <img :src="currentImg" alt="">
       <!-- 大图的div 480 * 480 -->
       <div class="big_img_box" v-show="flag">
         <!-- 800*800 -->
         <img :src="currentImg" alt="" :style="{left:left+'px',top:top+'px'}" v-show="flag">
       </div>
       <!-- 遮罩层 260*260 -->
       <div v-show="flag" class="mask" :style="{left:l+'px',top:t+'px'}"></div>
     </div>
    
    <!-- 五张小图 -->
    <div class="imgs-btn">
      <img :src="item" alt="" v-for="(item,i) in imgs" :key="item" v-if="i>0" @click="currentImg=item" :class="item==currentImg?'active':''">
    </div>
  </div>
</template>

<script>
export default {
    props:['imgs'],
    data() {
        return {
            currentImg:this.imgs[0],
            flag:false,
            left:0,
            top:0,
            l:0,
            t:0
        }
    },
    watch: {
        imgs(newV){
            this.currentImg = this.imgs[0]
        }
    },
    methods:{
        move(e){
            // 获取鼠标距离浏览器的左边的距离
            var x = e.pageX 
            var y = e.pageY

            //获取div的距离浏览器边上的距离
            var divX = this.$refs.img_box.offsetLeft
            var divY = this.$refs.img_box.offsetTop
            
            // 鼠标点相对于div的距离
            x = x - divX
            y = y - divY

            // 限制x,y必须再div范围内 中心点坐标
            x = x<130?130:x
            x = x>270?270:x
            y = y<130?130:y
            y = y>270?270:y

            // 遮罩层的位置
            this.l = x - 130
            this.t = y - 130

            // 放大镜图片的位置
            this.left = -x*2 +240
            this.top = -y*2 + 240
        }
    }
}
</script>

<style scoped>
 .img-box{
   width: 400px;
   position: relative;
   cursor: crosshair;
 }
 .img-box img{
   width: 100%;
   /* height: 400px; */
   /* border: 1px solid lightblue;  */
   border-radius: 10px;
 }
 .big_img_box{
   position: absolute;
   left:402px;
   top: 0;
   width:480px ;
   height: 480px;
   overflow: hidden;
   z-index: 100;
 }
 .big_img_box img{
   position: absolute;
   left: 0;
   top: 0;
   width: 800px;
   /* height: 800px; */
 }
 .mask{
   position: absolute;
   top: 0;
   left: 0;
   width: 260px;
   height: 260px;
   background: rgba(0,0,0,0.2);
 }
 .imgs-btn img{
   float: left;
   width: 80px;
   border: 2px solid white;
   box-sizing: border-box;
 }
.imgs-btn .active{
   border: 2px solid purple;
 }
</style>