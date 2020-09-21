import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import {setStore} from '@/utils/storage';
import { getStore } from '../utils/storage';
export default new Vuex.Store({
  state: {
    login:false,//是否登录
    userInfo:null,//用户信息
    cartList:[],//加入购物车的商品
    showCart:false
  },
  mutations: {
    INITBUYCART(state){
      let initCart=getStore('buyCart');
      if(initCart){
        state.cartList=JSON.parse(initCart).cartList
      }
    }
    ,
    SHOWCART(state,{showCart}){
      state.showCart=showCart;
    },
    ISLOGIN(state,info){
      state.userInfo=info;
      state.login=true;
      setStore('userInfo',info)
    },
    ADDCART(state,{productId,salePrice,productName,productImg,productNum=1}){
      let cart=state.cartList;
      let goods={
        productId, 
        salePrice, 
        productName, 
        productImg
      }
      let flag=true;
      if(cart.length){
        cart.forEach(item=>{
          if(item.productId===productId){
            if(item.productNum>=0){
              flag=false;
              item.productNum+=productNum;
            }
          }
        })
      }
      if(!cart.length||flag){
        goods.productNum=productNum;
        cart.push(goods);
      }
      state.cartList=cart;
      setStore('buyCart',cart);
    }
  },
  actions: {
  },
  modules: {
  }
})
