<template>
  <div class="detail-box">
    <el-button icon="el-icon-arrow-left" @click="$router.back()"
      >返回</el-button
    >

    <div class="main-detail">
      <!-- 放大镜组件 -->

      <!-- <div class="left"></div> -->
      <ZoomImage :imgs="showImages"></ZoomImage>
      <div class="right">
        <h2 class="title">{{ goodDatas.title }}</h2>

        <p class="supplier">{{ goodDatas.supplier }}</p>

        <p class="price">{{ goodDatas.priceStr }}</p>

        <!-- 评分组件 -->
        <el-rate :value="3.7" disabled show-score text-color="#ff0000">
        </el-rate>
        <el-button
          type="danger"
          icon="el-icon-shopping-cart-2"
          @click="addGoods"
          >添加购物车</el-button
        >
      </div>
    </div>

    <!-- 类似商品的展示 -->

    <div class="same">
      <p>相似商品推荐</p>
      <good-list :list="sameList"></good-list>
    </div>

  </div>
</template>

<script>
import { getSameList, getDetail, getAddCart } from "@/tools/Ajax";
import GoodList from "@/components/GoodList";
import ZoomImage from "@/components/ZoomImage";
import { mapState } from "vuex";
export default {
  data() {
    return {
      sameList: [],
      goodDatas: {}, //详情的数据
      showImages: [],
    };
  },
  components: {
    GoodList,
    ZoomImage,
  },
  created() {
    this.getData(this.$route);
  },
  beforeRouteUpdate(to, from, next) {
    this.getData(to);
    next();
  },
  activated() {
    this.getData(this.$route);
    document.scrollingElement.scrollTop = 0;
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    addGoods() {
      if (this.token) {
        getAddCart({
          token: this.token,
          goodId: this.goodDatas.Id,
        }).then((res) => {
          if (res.code == 0) {
            this.$message({
              type: "success",
              message: "通行证已过期",
            });
            this.$router.push("/login");
          }else if(res.code==1){
            this.$message({
             type:"success",
             message:"添加成功"
           })
          }else{
            this.$message({
             type:"success",
             message:"添加失败，请稍后重试"
           })
          }
        });
      } else {
        this.$message({
          type: "success",
          message: "还没登录请登录",
        });
        this.$router.push("/login");
      }
    },
    getData(to) {
      getDetail({
        goodId: to.query.id,
      }).then((res) => {
        console.log(res, "++++++++++");
        this.goodDatas = res[0];
        this.getSame(res[0].supplier);
        this.showImages = JSON.parse(res[0].imgs);
      });
    },
    getSame(good) {
      getSameList({
        supplier: good,
      }).then((res) => {
        this.sameList = res;
      });
    },
  },
};
</script>

<style scoped>
.detail-box {
  text-align: left;
  width: 1200px;
  margin: auto;
}
.main-detail {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  width: 200px;
  height: 240px;
  border: 1px solid black;
  padding: 10px;
}
.right {
  /* border: 1px solid purple; */
  width: 200px;
  height: 240px;
  margin-right: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}
.title {
  font-size: 20px;
}
.supplier {
  color: gray;
}
.price {
  color: red;
}
.same {
  margin-top: 20px;
}
.same p {
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
}
.same >>> .list-box {
  width: 1100px;
}
.same >>> a {
  text-align: center;
  width: 180px;
  padding: 5px;
  /* box-sizing: border-box; */
  height: 230px;
  margin-top: 10px;
}
.same >>> h4 {
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>