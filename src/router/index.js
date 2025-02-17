import { Navigate, createBrowserRouter } from 'react-router-dom'
import Login from "@/pages/Login"
import Layout from '@/pages/Layout'
import Home from '@/pages/Layout/Home'
import Article from '@/pages/Layout/Article'
import Publish from '@/pages/Layout/Publish'
import AuthRouter from '@/components/AuthRouter'

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
                element: <Home />
            },
            {
                path: 'article',
                element: <Article />
            },
            {
                path: 'publish',
                element: <Publish />
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