<template>
  <div class="login-box">
    <el-input class="eit" placeholder="请输入账号"  v-model.trim="username" @focus="usererr=''" prefix-icon="el-icon-user-solid">
    </el-input>
    <span v-show="usererr" class="err">{{usererr}}</span>
     <el-input class="eit" placeholder="请输入密码"  v-model.trim="password" @focus="passworderr=''" prefix-icon="el-icon-user-solid">
    </el-input>
    <span v-show="passworderr" class="err">{{passworderr}}</span>
    <br>
    <el-button type="primary" @click="loginClick">登录</el-button>
   </div>
</template>

<script>
import {getLogin} from "../tools/Ajax"
import {mapMutations, mapState} from "vuex"
export default {
data() {
      return {
          username:"",
          usererr:"",
          password:"",
          passworderr:""
      }
    },
    methods: {
       loginClick(){
         var userReg = /^[\w\u4e00-\u9fa5]{6,12}$/
         if(!userReg.test(this.username)){
           this.usererr = "账号必须是字母、数字、汉字组合而成的"
           return false
         }
         var pswReg = /^\w{6,12}$/
         if(!pswReg.test(this.password)){
           this.passworderr = "密码必须是字母、数字、汉字组合而成6位以上的"
           return false
         }
        getLogin({
            userName:this.username,
            password:this.password
        }).then(res=>{
          console.log(res,"11111111111")
            if(res.code==0){
                this.$message({
                  type:"warning",
                  message:"账号或密码错误"
                })
            }else{
              this.$message({
                type:"success",
                duration:1000,
                message:"欢迎"+this.username+"登录成功",
                onClose:()=>{
                  //  this.$router.push("/")
                }
              })   
               this.$router.push("/")   
               this.$store.commit("setToken",res.token)   //修改仓库token状态
              //  this.setToken(res.token)
            }
            this.username=this.password=this.confirmpsw=this.usererr=this.passworderr=this.confirmpswerr=""
        })
      },
      // ...mapMutations(["setToken"])
  }
}
</script>

<style scoped>
 .login-box{
     width:400px;
     margin: 80px auto;
  }
  .eit{
    margin-top: 20px;
  }
  .login-box >>> button{
    margin-top: 20px;
  }
  .err{
    color:red;
    font-size: 12px;
  }
</style>