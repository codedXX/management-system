import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '@/views/Main.vue';
import User from '@/views/User.vue';
import Home from '@/views/Home.vue';
import Mall from '@/views/Mall.vue';
import PageOne from '@/views/PageOne.vue';
import PageTwo from '@/views/PageTwo.vue';
import Login from '@/views/Login.vue';
import Cookies from 'js-cookie';


Vue.use(VueRouter)

const routes =[
  {
    name:'main',
    path:'/',
    component:Main,
    redirect:'/home', //重定向
    children:[
    ]
  },
  {
    name:'login',
    path:'/login',
    component:Login
  }
]


const router = new VueRouter({
  routes
})

//全局前置守卫：初始化时执行、每次路由切换前执行
router.beforeEach((to,from,next)=>{
  const token = Cookies.get('token');
  if(!token && to.path!=='/login'){
    next({name:'login'})
  }else{
    next();
  }

})


export default router
