import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect:"/login"
  },
  {
    path:"/login",
    component:() => import("views/login/Login.vue")
  },
  {
    path:"/home",
    component:() => import("views/home/Home.vue"),
    redirect:"/users",
    children:[
      {
        path:"/users",
        component:() => import("views/users/Users.vue"),
      },
      {
        path:"/roles",
        component:() => import("views/roles/Roles.vue"),
      },
      {
        path:"/rights",
        component:() => import("views/rights/Rights.vue"),
      },
      
    ]
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
