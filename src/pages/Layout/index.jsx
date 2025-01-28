import { request } from "@/utils"
import { useEffect } from "react"
export default function Layout() {

  useEffect(() => {
    // 请求用户信息
    request.get('/user/profile').then(res => {
      console.log(res);
    })
  }, [])

  return (
    <div>首页</div>
  )
}
