import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//挂载axios到Vue的原型，由于继承性，所有组件都可以使用this.$http.get()
import axios from 'axios'
import {getStore} from '@/utils/storage';
axios.defaults.baseURL='http://localhost:3000'
Vue.prototype.$http=axios;
Vue.config.productionTip = false;
axios.interceptors.request.use(config=>{
    const token=getStore('token');
    if(token){
      //表示用户已登录
      config.headers.common['Authorization']=token;
    }
    return config;
},error=>{
  return Promise.reject(error);
})
//守卫
router.beforeEach((to,from,next)=>{  
  axios.post('/api/validate',{}).then(res=>{
    let data= res.data;
    if(data.state!=1){
      if (to.matched.some(record => record.meta.auto)) {
        //用户未登录,跳转到登录页面
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next();
      }
    }else{
      //保存用户的信息
      store.commit('ISLOGIN',data);
      if(to.path==='/login'){
        router.push({
          path:'/'
        })
      }
      next()
    }
  }).catch(error=>{
    console.log(error);
    
  })
  next();
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
