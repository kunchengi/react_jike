import { Navigate } from 'react-router-dom'
import Login from "@/pages/Login"
import Layout from '@/pages/Layout'

// 定义路由表
const routers = [
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/layout',
        element: <Layout />,
    },
    {
        path: '/',
        element: <Navigate to="/login" />
    },
    {
        // 当找不到路由时，重定向到登录页
        path: '*',
        element: <Navigate to="/login" />
    }
]

export default routers