<template>
    <div class="one-box">
        <router-link v-for="(item,i) in urls" :key="i" :to="'/type/'+item">{{item}}</router-link>
    </div>
</template>
<script>
import {getOneType} from "../tools/Ajax"
export default {
    data(){
        return{
            urls:[]
        }
    },
    created(){
        getOneType().then(res=>{
            this.urls=res.splice(0,9)
        })
    }
}
</script>

<style scoped>
 .one-box{
     width:1200px;
     margin: auto;
     display: flex;
     justify-content: space-between;
     padding: 10px;
 }
 a{
     text-decoration: none;
     color: #666;
     display: inline-block;
     border-radius: 5px; 
     padding: 0px 10px;
     transition: all 0.5s;
 }
 a:hover{
     background-color: purple;
     color: white;
 }
</style>