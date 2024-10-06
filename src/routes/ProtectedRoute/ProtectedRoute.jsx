import { Card, Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import './ProtectedRoute.scss';

const { Content } = Layout;

export const ProtectedRoute = () => {
  return (
    <Content className="layout-content">
      <Card className="ant-card-layout">
        <Outlet />
      </Card>
    </Content>
  );
};
