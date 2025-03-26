import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'

import HelloWorld from "@/views/user/layout/HomePage.vue";

//定义路由关系
const routes = [
    {path: '/',component:HelloWorld,},
    {path: '/adminLogin',component: () => import('@/views/admin/AdminLogin.vue'),},
    {path: '/adminHome',component: () => import('@/views/admin/layout/AdminHome.vue'),
        children: [
            {path: '/userList',component: () => import('@/views/admin/views/UserList.vue'),},
            {path: '/petList',component: () => import('@/views/admin/views/PetList.vue'),},
            {path: '/petTypeList',component: () => import('@/views/admin/views/PetTypeList.vue')},
            {path: '/goodList',component: () => import('@/views/admin/views/GoodList.vue')},
            {path: '/chat',component: () => import('@/views/Chat.vue')},
        ]
    },
]

//创建路由器
const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(), // 这里使用 Hash 模式
    routes: routes
})

//导出路由
export default router