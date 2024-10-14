import { Layout, Menu, Typography } from 'antd';
import {
  BarChartOutlined,
  AuditOutlined,
  SkinOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import './ProtectedRoute.scss';
import { useAuth } from '../../provider/authProvider';
import Breadcrumb from '../../components/molecules/Breadcrumb/Breadcrumb';

const { Content, Sider } = Layout;

export const IMenu = [
  {
    key: 'dashboard',
    icon: <BarChartOutlined />,
    label: 'Bảng Thống Kê',
  },
  {
    key: 'products',
    icon: <SkinOutlined />,
    label: 'Quản Lý Sản Phẩm',
  },
  {
    key: 'orders',
    icon: <AuditOutlined />,
    label: 'Quản Lý Đơn Hàng',
  },
  {
    key: 'customers',
    icon: <TeamOutlined />,
    label: 'Quản Lý Khách Hàng',
  },
];

export const ProtectedRoute = () => {
  const pathname = window.location.pathname.split('/admin/')[1];
  const { token } = useAuth();

  const [activeItem, setActiveItem] = useState(
    pathname ? pathname : 'dashboard',
  );

  useEffect(() => {
    if (pathname) {
      setActiveItem(pathname);
    }
  }, [pathname]);

  const navigate = useNavigate();
  const isAuth = token;

  const handleChangeTab = (item) => {
    setActiveItem(item.key);
    navigate(item.key);
  };

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  if (!pathname) {
    return <Navigate to="/admin/dashboard" />;
  }

  const breadcrumbItems = [{ key: 'dashboard' }];
  return (
    <Layout id="layout-container">
      <Sider
        breakpoint="xl"
        width={300}
        collapsedWidth="100"
        trigger={null}
        collapsible
        // collapsed={collapsed}
        className="xs:!hidden sm:!block p-4 my-3 ml-3 rounded-xl !bg-white !border-gray-300 !border-1 !border-solid"
      >
        <div className=" flex justify-center p-4">
          <Typography className="xs:!hidden mdM:!block font-bold text-center text-base">
            HT Store
          </Typography>
        </div>
        <Menu
          id="menu-container"
          className="!border-0 pt-6"
          theme="light"
          mode="vertical"
          defaultSelectedKeys={[activeItem]}
          items={IMenu}
          onClick={handleChangeTab}
        />
      </Sider>
      <Layout className="mx-6 mb-8">
        <Breadcrumb items={breadcrumbItems} />
        <Content className=" !bg-white rounded-xl">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
