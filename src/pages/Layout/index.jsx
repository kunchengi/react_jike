import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Layout, Menu, Popconfirm } from "antd"
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons"
import './index.scss'

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

  return (
    <Layout>
      <Header className="hander">
        <div className='logo' />
        <div className="user-info">
          <span className="user-name">ccc</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
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
