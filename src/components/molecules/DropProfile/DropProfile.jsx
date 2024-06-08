import {
  UserOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ProfileOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { Badge, Dropdown, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './DropProfile.scss';
import { useAuth } from '../../../provider/authProvider';

const DropProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useAuth();

  const handleUser = async (key) => {
    if (key == 'profile') {
      navigate('/profile');
    }
    if (key == 'login') {
      navigate('/login');
    }
    if (key == 'logout') {
      localStorage.clear();
      window.location.reload();
    }
  };

  const items = [
    token && {
      key: 'profile',
      label: (
        <Typography className="text-[#121212] hover:text-[#5646ff] font-semibold">
          {t('DROPDOWN_PROFILE.PROFILE')}
        </Typography>
      ),
      icon: <ProfileOutlined />,
    },
    !token && {
      key: 'login',
      label: (
        <Typography className="text-[#121212] hover:text-[#5646ff] font-semibold">
          {t('DROPDOWN_PROFILE.SIGN_IN')}
        </Typography>
      ),
      icon: <LoginOutlined />,
    },
    token && {
      key: 'logout',
      label: (
        <Typography className="text-[#121212] hover:text-[#FB303E] font-semibold">
          {t('DROPDOWN_PROFILE.SIGN_OUT')}
        </Typography>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Space direction="horizontal" size={'large'}>
      <Badge count={5} size="small">
        <ShoppingOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
      </Badge>
      <Dropdown
        menu={{
          items,
          onClick: (item) => {
            handleUser(item.key);
          },
        }}
        trigger={['hover']}
        className="profile-dropdown"
        overlayClassName="profile-menu"
        placement="bottom"
        // onOpenChange={() => setActiveItem(!activeItem)}
      >
        <Typography.Text className="drop-name font-bold hover:text-[#5646ff]">
          <UserOutlined style={{ fontSize: '16px' }} />
        </Typography.Text>
      </Dropdown>
    </Space>
  );
};
export default DropProfile;
