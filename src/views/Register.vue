<template>
  <div class="register-box">
    <el-input class="eit" placeholder="请输入账号"  v-model.trim="username" @focus="usererr=''" prefix-icon="el-icon-user-solid">
    </el-input>
    <span v-show="usererr" class="err">{{usererr}}</span>


     <el-input class="eit" placeholder="请输入密码"  v-model.trim="password" @focus="passworderr=''" prefix-icon="el-icon-user-solid">
    </el-input>
    <span v-show="passworderr" class="err">{{passworderr}}</span>

    <el-input class="eit" placeholder="请确认密码"  v-model.trim="confirmpsw" @focus="passworderr=''" prefix-icon="el-icon-user-solid">
    </el-input>
    <span v-show="confirmpswerr" class="err">{{confirmpswerr}}</span>
    <br>
    <el-button type="primary" @click="registClick">注册</el-button>
  </div>
</template>
<script>
import {getRegister} from "../tools/Ajax"
export default {
    data() {
      return {
          username:"",
          usererr:"",
          password:"",
          passworderr:"",
          confirmpsw:"",
          confirmpswerr:""
      }
    },
    methods: {
      registClick(){
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
        if(this.password!=this.confirmpsw){
          this.confirmpswerr = "俩次密码不一致"
          return false
        }
        getRegister({
            userName:this.username,
            password:this.password
        }).then(res=>{
            if(res.code==0){
                this.$message({
                  type:"warning",
                  message:"用户名已经占用"
                })
            }else{
              this.$message({
                type:"success",
                duration:1000,
                message:"恭喜你注册成功,可以去登录了",
                onClose:()=>{
                   this.$router.push("/login")
                }
              })          
            }
            this.username=this.password=this.confirmpsw=this.usererr=this.passworderr=this.confirmpswerr=""
        })
      }
    },
}
</script>

<style scoped>
  .register-box{
     width:400px;
     margin: 80px auto;
  }
  .eit{
    margin-top: 20px;
  }
  .register-box >>> button{
    margin-top: 20px;
  }
  .err{
    color:red;
    font-size: 12px;
  }
</style>