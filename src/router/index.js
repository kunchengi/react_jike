import { Navigate, createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Login from "@/pages/Login"
import Layout from '@/pages/Layout'
import AuthRouter from '@/components/AuthRouter'

// 1. lazy函数对组件进行导入
const Home = lazy(() => import('@/pages/Layout/Home'))
const Article = lazy(() => import('@/pages/Layout/Article'))
const Publish = lazy(() => import('@/pages/Layout/Publish'))

// 定义路由表
const routers = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/layout',
        element: <AuthRouter> <Layout /> </AuthRouter>,// 将组件包裹在路由校验组件中，通过校验才渲染
        children: [
            {
                // 默认重定向到home
                path: '/layout',
                element: <Navigate to="/layout/home" />
            },
            {
                path: 'home',
                // 2. 使用Suspense组件包裹懒加载的组件，当组件加载时显示loading组件
                element: <Suspense fallback={'加载中'}><Home /></Suspense>
            },
            {
                path: 'article',
                element: <Suspense fallback={'加载中'}><Article /></Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback={'加载中'}><Publish /></Suspense>
            }
        ]
    },
    {
        // 重定向到首页，如果没有token，会跳到登录页
        path: '/',
        element: <Navigate to="/layout" />
    },
    {
        // 当找不到路由时，重定向到首页，如果没有token，会跳到登录页
        path: '*',
        element: <Navigate to="/layout" />
    }
]

const router = createBrowserRouter(routers)

export default router