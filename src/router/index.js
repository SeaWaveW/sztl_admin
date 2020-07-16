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
    redirect:"/welcome",
    children:[
      {
        path:"/welcome",
        component:() => import("views/home/Welcome.vue"),//用户管理--用户列表
      },
      {
        path:"/users",
        component:() => import("views/users/Users.vue"),//用户管理--用户列表
      },
      {
        path:"/roles",
        component:() => import("views/roles/Roles.vue"),//权限管理--角色列表
      },
      {
        path:"/rights",
        component:() => import("views/rights/Rights.vue"),//权限管理--权限列表
      },
      {
        path:"/goods",
        component:() => import("views/goods/Goods.vue"),//商品管理--商品列表
      },

      {
        path:"/goods/add",
        component:()=> import("views/goods/childCom/AddGoods.vue") //商品管理---商品列表---添加商品
      },
      {
        path:"/params",
        component:() => import("views/params/Params.vue"),//商品管理--分类参数
      },
      {
        path:"/categories",
        component:() => import("views/categories/Categories.vue"),//商品管理--商品分类
      },
      {
        path:"/orders",
        component:() => import("views/orders/Orders.vue"),//订单管理--订单列表
      },
      {
        path:"/reports",
        component:() => import("views/reports/Reports.vue"),//数据统计--数据报表
      }
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
