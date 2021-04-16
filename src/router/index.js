import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home'),
    redirect: '/test1',
    children: [
      // 测试路由
      {
        path: '/test1',
        name: 'Test1',
        component: () => import('@/views/test/Test1')
      },
      {
        path: '/test2',
        name: 'Test2',
        component: () => import('@/views/test/Test2')
      }
    ]
  },
  {
    path: '/sss',
    name: 'Test1',
    component: () => import('@/views/test/Test1')
  },
]

const router = new VueRouter({
  // 如果需要使用history模式，需要在后端服务器上配置，如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面
  // 详情见，https://router.vuejs.org/zh/guide/essentials/history-mode.html
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
