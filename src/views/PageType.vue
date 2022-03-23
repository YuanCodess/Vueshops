<template>
  <div class="type-box">
    <one-type></one-type>
    <ul class="nav" ref="nav" v-if="newList.length > 0">
      <li
        v-for="(n, i) in newList"
        :key="i"
        @click="check(i)"
        :class="currentIndex == i ? 'active' : ''"
      >
        {{ n.type }}
      </li>
    </ul>

    <div class="type-view" ref="type_view">
      <div class="type-item" v-for="(item, i) in newList" :key="i">
        <h2 class="type_title">{{ item.type }}</h2>
        <good-list :list="item.list"></good-list>
      </div>
    </div>
    <div id="d1"></div>
  </div>
</template>
<script>
import OneType from '@/components/OneType'
import {getShopList} from "../tools/Ajax"
import GoodList from '@/components/GoodList'
export default {
    data() {
        return {
            list:[],
            currentIndex:0,
        }
    },
    components:{
        OneType,
        GoodList
    },
    beforeRouteEnter (to, from, next) {
        next(vm=>{
            vm.getData(to)
        })
    },
    beforeRouteUpdate (to, from, next) {
        this.getData(to)
        next()
    },
    computed: {
        newList(){
            var newArr = []
            for(var i = 0;i<this.list.length;i++){
                var hasType = false
                for(var j = 0;j<newArr.length;j++){
                    if(this.list[i].type_two===newArr[j].type){
                        newArr[j].list.push(this.list[i])
                        hasType = true
                        break
                    }
                }
                if(!hasType){
                    newArr.push({
                        type:this.list[i].type_two,
                        list:[this.list[i]]
                    })
                }
            }
            return newArr
        }
    },
    created() {
        this.addScroll()
        this.count = 0
    },
    methods: { 
          // created触发添加scroll事件
      addScroll(){
        window.addEventListener("scroll",this.bindScroll)
      },
      // 页面销毁的时候触发这个函数
      clearScroll(){
         window.removeEventListener("scroll",this.bindScroll)
      },
    bindScroll(){
        this.count++
        if(this.count%10!=0)return
        // 获取网页滚动高度
        var scrollTop = document.body.scrollTop||document.documentElement.scrollTop
        for(let i = this.$refs.type_view.children.length-1;i>=0;i--){
            // offsetTop代表所有子元素的距离浏览器顶部的距离
             var offsetTop = this.$refs.type_view.children[i].offsetTop
             if(offsetTop-scrollTop<200){
                 this.currentIndex = i
                 break
             }
        }
    },
        check(i){
            this.currentIndex = i
            // title 要滚动的元素
            var title  = this.$refs.type_view.getElementsByClassName("type_title")[this.currentIndex]
            // 要滚动的距离
            var targetTop = title.offsetTop - 100
            // 已经滚动距离
            var currentTop = document.scrollingElement.scrollTop
            // 剩余要移动的距离
            var distance = currentTop - targetTop
            // 每次需要滚动的距离
           var step = distance / 20
            function move(){
                // console.log(this)
                currentTop-=step
                document.scrollingElement.scrollTop = currentTop
                if((distance>0&&currentTop>targetTop)||(distance<0&&currentTop<targetTop)){
                        requestAnimationFrame(move.bind(this))
                }else{
                    // 已经滚动目标区域
                    document.scrollingElement.scrollTop = targetTop
                    this.currentIndex = i
                }
            }
            requestAnimationFrame(move.bind(this))
        },
        getData(to){
          console.log(to.params.typeid);
          getShopList({
              "type_one":to.params.typeid
          }).then(res=>{
              console.log(res)
              this.list = res
          })
        }
    },
}
</script>

<style scoped>
h2 {
  width: 1200px;
  background-color: lightskyblue;
  margin: 30px auto;
  padding: 20px;
  border-radius: 5px;
  font-size: 20px;
}
.nav {
  position: fixed;
  top: 230px;
  left: 10px;
  list-style: none;
  border: 1px solid plum;
  border-radius: 5px;
  padding: 10px;
  width: 120px;
  text-align: center;
}
.nav li {
  line-height: 30px;
  font-weight: bold;
}
.nav li:hover {
  color: purple;
  filter: drop-shadow(0 0 10px purple);
}
.nav li.active {
  color: purple;
  filter: drop-shadow(0 0 10px purple);
}
#d1{
    width: 1200px;
    margin: auto;
    height: 450px;
}
</style>