import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Layout, Menu, Popconfirm } from "antd"
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import './index.scss'
import { asyncGetUserInfo, clearUserInfo } from '@/store/modules/userData';

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: 'home',
    icon: <HomeOutlined />
  },
  {
    label: '文章管理',
    key: 'article',
    icon: <DiffOutlined />
  },
  {
    label: '创建文章',
    key: 'publish',
    icon: <EditOutlined />
  }
]
export default function GeekLayout() {

  // 请求用户信息
  const dispatch =  useDispatch();
  useEffect(() => {
    dispatch(asyncGetUserInfo())
  }, [dispatch]);

  const navigate = useNavigate();

  // 左侧菜单点击事件
  const onMenuClick = (e) => {
    const path = e.key;
    console.log(path);
    navigate(path);
  };

  // 获取当前子路由key
  const location =  useLocation()
  const pathnames = location.pathname.split('/');
  const currentKey = pathnames[pathnames.length - 1];

  /**
   * 获取用户信息
   * 由于 setUserInfo 被调用并更新了 store 中的 userInfo，useSelector 会检测到这个变化并重新渲染组件，从而获取到最新的用户信息。
   * 所以即使asyncGetUserInfo是异步的，这边也能拿到最新的用户信息。
   */
  const userInfo = useSelector(state => state.userData?.userInfo) || {};

  // 退出登录
  const onLogout = () => {
    dispatch(clearUserInfo());
    navigate('/login');
  };

  return (
    <Layout>
      <Header className="hander">
        <div className='logo' />
        <div className="user-info">
          <span className="user-name">{userInfo.name || ''}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onLogout}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[currentKey]}
            onClick={onMenuClick}
            items={items}
            style={{ height: '100%', borderRight: 0 }}></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 渲染Layout的子路由 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}
