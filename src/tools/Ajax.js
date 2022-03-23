import axios from "axios";
var baseURL = require("./baseURL.js")

// 封装发请求的API
function getData(url,params){
    return new Promise((resolve,reject)=>{
        axios.get(url,{params}).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
}
// 登录请求 
function getLogin(params){
   return getData("/myApi/login",params)
}

// 注册请求 
function getRegister(params){
    return getData("/myApi/register",params)
}

// 商品列表请求 
function getShopList(params){
    return getData("/myApi/goodList",params)
}

// 获取一级导航菜单
function getOneType(){
    return getData("/myApi/getTypeOne")
}
// 检索商品的接口
function getSearch(params){
    return getData("/myApi/search",params)
}
// 商品详情的接口
function getDetail(params){
    return getData("/myApi/detail",params)
}

//获取类似商品的接口
function getSameList(params){
    return getData("/myApi/sameList",params)
}

//添加购物车商品的接口
function getAddCart(params){
    return getData("/myApi/add",params)
}
//获取购物车商品的接口
function getShopCart(params){
    return getData("/myApi/shopList",params)
}
//减少数量的接口
function getCartRemove(params){
    return getData("/myApi/remove",params)
}
// 删除商品的接口
function getCartDelete(params){
    return getData("/myApi/del",params)
}


function getBanner(){
    return new Promise((resove,reject)=>{
            resove({
                url:[
                    baseURL+"/images/a.jpg",
                    baseURL+"/images/b.jpg",
                    baseURL+"/images/c.jpg",
                    baseURL+"/images/d.jpg",
                    baseURL+"/images/e.jpg",
                ]
            })
    })
}
export{
    getLogin,
    getRegister,
    getShopList,
    getOneType,
    getBanner,
    getSearch,
    getDetail,
    getSameList,
    getAddCart,
    getCartDelete,
    getShopCart,
    getCartRemove
}