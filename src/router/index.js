import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/login"
  },
  {
    path:"/login",
    component:() => import("views/Login.vue")
  },
  {
    path:"/home",
    component:() => import("views/Home.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach( (to,form,next) => {
  const token = sessionStorage.getItem("token")
  if(to.path !== "/login"){
    if(token){
      next()
    }else{
      next("/login")
    }
  }
  next() 
})

export default router
