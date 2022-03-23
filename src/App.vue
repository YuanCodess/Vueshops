<template>
  <div id="app">
    <div class="mask" v-show="show"></div>
     <!-- 导航组件 -->
    <header-nav></header-nav>
     <keep-alive>
       <router-view></router-view>
     </keep-alive>

     <!-- 回到顶部组件 -->
     <el-backtop :right="40" :bottom="40">回到顶部</el-backtop>
   
  </div>
</template>
<script>
import HeaderNav from "./components/HeaderNav.vue"
export default {
    components:{
      HeaderNav
    },
    data() {
      return {
        show:false
      }
    },
    created() {
      this.show=true
      setTimeout(()=>{
        this.show = false
      },2000)
    },
    watch: {
      $route(){
         this.show=true
      setTimeout(()=>{
        this.show = false
      },2000)
      }
    },
}
</script>
<style>
.mask{
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-image: url(./assets/loading.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  z-index:100000;
  background-size: 100% 100%;
}
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
      height: 2000px;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
#app .el-backtop{
  background-color: purple;
  color: wheat;
  font-size: 10px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
</style>
