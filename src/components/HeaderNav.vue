<template>
  <div class="header-box">
    <header>
      <div class="top">
        <img src="@/assets/logo.png" alt="" />
        <!-- 封装输入的组件 -->
        <my-search v-show="pos==='static'"></my-search>
      </div>
    </header>

    <div class="nav-box" :style="{position:pos}" :class="{fix:pos=='fixed'}">
      <nav >
        <template v-if="token">
        <router-link to="/">首页</router-link>
        <router-link to="/shopCart">购物车</router-link>
        <a @click="loginOut">退出登录</a>
        </template>
       <template v-else>
         <router-link to="/">首页</router-link>
        <router-link to="/login">登录</router-link>
        <router-link to="/register">注册</router-link>
        </template>

        <my-search class="search"  v-show="pos==='fixed'"></my-search>
      </nav>
    </div>
  </div>
</template>
<script>
import MySearch from "./MySearch";
import {mapState} from "vuex"
export default {
  components: {
    MySearch,
  },
  data() {
      return {
          pos:"static",
          t:""
      }
  },
  created() {
  },
  methods: {
    loginOut(){
      this.$store.commit("setToken","")
      this.$message({
        type:"success",
        message:"退出成功",
        onClose:()=>{
          this.$router.push("/")
        }
      })
      //this.$router.push("/")
    }
  },
  mounted() {
      window.onscroll=()=>{
          var scrollTop = document.body.scrollTop||document.documentElement.scrollTop
          if(scrollTop>100){
              this.pos="fixed"
          }else{
              this.pos="static"
          }
      }
  },
  computed: {
    ...mapState(["token"])
  },
};
</script>
<style scoped>
.header-box {
  box-shadow: 0 2px 6px gray;
  padding-top: 20px;
  height: 180px;
  margin-bottom: 10px;
}
header {
  width: 1200px;
  text-align: left;
  margin: auto;
}
.fix{
  width: 100%;
  right: 0;
  top: -10px;
  background-color: white;
}
img {
  width: 188px;
}
.top {
  display: flex;
  justify-content: space-between;
  height: 60px;
  padding: 20px;
}
.nav-box {
  padding: 20px;
  z-index: 10000;
}
nav {
  width: 1200px;
  /* border:1px solid red; */
  margin: auto;
  display: flex;
  position: relative;
  /* top:100px */
}
nav a {
  margin: 0 20px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  padding: 10px 0px;
  height: 20px;
  width: 80px;
  display: inline-block;
  position: relative;
  top: 10px;
}
.search {
  position: absolute;
  right: 0px;
  top: 10px;
}
nav a:hover {
  color: purple;
  /* text-decoration: underline; */
  border-bottom: 1px solid purple;
}
nav a.router-link-exact-active {
  color: #42b983;
  border-bottom: 1px solid purple;
}
</style>