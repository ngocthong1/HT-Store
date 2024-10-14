import { HomeOutlined } from '@ant-design/icons';
import { Layout, Space, Tooltip, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { createSearchParams, Outlet, useNavigate } from 'react-router-dom';
import DropProfile from '../../components/molecules/DropProfile/DropProfile';
import './Homepage.scss';

import FooterComponent from '../../components/layout/Footer/Footer.jsx';
import { useEffect } from 'react';

const { Header, Content } = Layout;

export const Homepage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    document.title = 'HTS | Homepage';
  }, []);
  const IMenu = [
    {
      key: 'Male',
      icon: <HomeOutlined />,
      label: t('BREADCRUMB.MAN'),
    },
    {
      key: 'Female',
      icon: <HomeOutlined />,
      label: t('BREADCRUMB.WOMEN'),
    },
    {
      key: 'Children',
      icon: <HomeOutlined />,
      label: t('BREADCRUMB.KIDS'),
    },
  ];
  return (
    <Layout id="layout-container">
      <Header className="w-full layout-header !bg-grayshade-500">
        <Typography className="logo-header" onClick={() => navigate('/')}>
          {t('SYSTEM.LOGO_NAME')}
        </Typography>
        <Space className="menu-list" direction="horizontal" size={36}>
          {IMenu.map((item, index) => {
            return (
              <Tooltip title={item.label} key={index} trigger="hover">
                <Space
                  key={index}
                  direction="horizontal"
                  onClick={() => {
                    navigate({
                      pathname: 'products',
                      search: createSearchParams({
                        type: item.key,
                      }).toString(),
                    });
                  }}
                >
                  <Typography className="title-menu">
                    {item.label.toUpperCase()}
                  </Typography>
                </Space>
              </Tooltip>
            );
          })}
        </Space>
        <DropProfile />
      </Header>
      <Content className="w-full">
        <Outlet />
        <FooterComponent />
      </Content>
    </Layout>
  );
};
