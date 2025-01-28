import { Navigate } from 'react-router-dom'
import Login from "@/pages/Login"
import Layout from '@/pages/Layout'
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
    },
    {
        path: '/',
        element: <Navigate to="/login" />
    },
    {
        // 当找不到路由时，重定向到首页，如果没有token，会跳到登录页
        path: '*',
        element: <Navigate to="/layout" />
    }
]

export default routers