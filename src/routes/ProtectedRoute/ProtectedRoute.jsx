import {
  AppstoreAddOutlined,
  DeploymentUnitOutlined,
  HomeOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { Card, Layout, Space, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import DropProfile from '../../components/molecules/DropProfile/DropProfile';
import { useAuth } from '../../provider/authProvider';
import './ProtectedRoute.scss';

const { Header, Content } = Layout;

export const ProtectedRoute = () => {
  // const { token } = useAuth();

  // if (!token) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <Content className="layout-content">
      <Card className="ant-card-layout">
        <Outlet />
      </Card>
    </Content>
  );
};
