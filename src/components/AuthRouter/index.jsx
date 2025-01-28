import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"

// 路由校验高阶组件
// 有token就渲染，没有就跳转登录页
export default function AuthRouter({ children }) {
  if (!getToken()) {
    // 跳转登录页
    return <Navigate to="/login" replace />
  }
  return children
}
