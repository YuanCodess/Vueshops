<template>
  <div class="shop-box">
    <el-checkbox-group v-model="checkList" v-if="shopList.length > 0">
      <ul class="goodlist">
        <li v-for="(item, i) in shopList" :key="item.Id">
          <el-checkbox :label="item.Id" @change="changeSelect"></el-checkbox>
          <img :src="item.imageUrl" alt="" />
          <h3>{{ item.title }}</h3>
          <div>
            <b>￥{{ item.priceStr }}</b>
            <br />
            <i class="el-icon-circle-plus-outline" @click="addGood(item.Id,i)"></i>
            <span>{{ item.count }}</span>
            <i class="el-icon-remove-outline" @click="remove(item.Id,i)"></i>
          </div>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click.native="removeGood(item.Id)"
            >删除</el-button
          >
        </li>
      </ul>
    </el-checkbox-group>
    <div v-else>
      <i class="el-icon-shopping-cart"> 购物车空空如也 </i>
      <router-link to="/">去逛逛</router-link>
    </div>
    <div class="pay">
      <div class="pay-content">
        <el-checkbox
          v-model="checkAll"
          :indeterminate="isIndeterminate"
        ></el-checkbox>
        <b>总价格:{{ allPrice }}</b>
        <el-button type="primary">去结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAddCart,
  getCartDelete,
  getShopCart,
  getCartRemove,
} from "@/tools/Ajax";
import { mapState } from "vuex";
export default {
  data() {
    return {
      shopList: [], //购物车的商品
      checkList: [], //多选框组双向绑定的数据 如果是shopList于checkList如果是相同，这时候全选
      isIndeterminate: false, //全选按钮的不确定状态，如果为true,为不确定状态，如果W为false 确定状态，只有全选和全不选
      checkAll: false,
    };
  },
  created() {
    this.getShopData();
  },
  activated() {
    this.getShopData();
  },
  computed: {
    ...mapState(["token"]),
    allPrice() {
      var total = 0;
      for (var i = 0; i < this.checkList.length; i++) {
        var thisID = this.checkList[i];
        for (var j = 0; j < this.shopList.length; j++) {
          var thatID = this.shopList[j].Id;
          if (thisID === thatID) {
            total += this.shopList[j].priceStr * this.shopList[j].count;
            break;
          }
        }
      }
      return total;
    },
  },
  watch: {
    checkAll(newValue) {
      console.log(newValue);
      this.isIndeterminate = false;
      if (newValue) {
        // 全选 把所有的商品的id字段放进checkList数组
        this.shopList.forEach((element) => {
          if (this.checkList.indexOf(element.Id) == -1) {
            this.checkList.push(element.Id);
          }
        });
      } else {
        // 全不选
        this.checkList = [];
      }
    },
  },
  methods: {
    addGood(id,i){
      getAddCart({
        goodId:id,
        token:this.token
      }).then(res=>{
        this.disposeRes(res)
      })
    },
    remove(id,i){
        if(this.shopList.length[i].count==1){
          alert("不能在减少了")
          return
        }
        getCartRemove({
          goodId:id,
          token:this.token
        }).then(res=>{
          this.disposeRes(res)
        })
    },
    disposeRes(res){
        if(res.code==0){
          this.$message({
            type:"success",
            message:"登录过期，即将跳转登录页面"
          })
          this.$router.push("/login")
        }else if(res.code==1){
          this.getShopData()
          this.$message({
            type:"success",
            message:"修改成功"
          })
        }else{
          this.$message.error("购物失败，请稍后再试")
        }
    },
    // 获取购物车列表的请求
    getShopData() {
      console.log(this.token, "2222222222");
      getShopCart({
        token: this.token,
      }).then((res) => {
        console.log(res, "购物车");
        this.shopList = res;
      });
    },
    changeSelect() {
      if (this.shopList.length === this.checkList.length) {
        // 如果选中的商品的个数和购物车所有的商品个数如果一致
        // 证明全选上
        (this.checkAll = true), (this.isIndeterminate = false); // 把全选按钮状态置位确定状态
      } else if (this.checkList.length === 0) {
        //没有选中商品
        this.checkAll = false; //先把全选按钮置位false
        this.isIndeterminate = false;
      } else {
        this.isIndeterminate = true; // 非确定状态
      }
    },
     // 删除的商品ID
  removeGood(index) {
    this.$confirm("此操作需要删除此商品，是否继续操作", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      getCartDelete({
        goodId: index,
        token: this.token,
      }).then((res) => {
        if (res.code == 1) {
          alert("删除成功");
          // 删除checklist所保存该商品的删除
          this.getShopData()
          this.checkList.forEach((item, i) => {
            if (item == index) {
                console.log("sssss")
              this.checkList.splice(i, 1);
              this.changeSelect(); //判断全选状态
            }
          });
        } else {
          alert("服务器繁忙，请重试");
        }
      });
    });
  }
  },
};
</script>

<style scoped>
.shop-box {
  width: 1000px;
  margin: 80px auto;
}
ul {
  list-style: none;
  font-size: 20px;
}
li {
  height: 130px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid lightcoral;
  border-radius: 10px;
  /* box-sizing: border-box; */
}
img {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid lightgray;
}
h3 {
  font-size: 20px;
}
i {
  font-size: 20px;
  font-weight: bold;
  border-radius: 50%;
}
span {
  font-size: 20px;
  font-weight: border;
}
b {
  font-size: 20px;
  color: red;
  /* margin: 20px; */
}
.shop-box >>> .el-checkbox__label {
  color: white;
}
.pay {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: yellowgreen;
}
.pay-content {
  width: 1300px;
  margin: 10px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>