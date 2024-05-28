import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../provider/authProvider';
import {
  Col,
  Divider,
  Row,
  Space,
  Typography,
  Checkbox,
  Form,
  Input,
  notification,
} from 'antd';
import './Login.scss';
import { useTranslation } from 'react-i18next';
import Button from '../../components/atoms/Button/Button';
import iconGoogle from '../../assets/img/google-icon.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { auth, provider } from '../../service/firebase';
import { signInWithPopup } from 'firebase/auth';
import { axiosInstance } from '../../config/axios';
import { useEffect } from 'react';
import { Toast } from '../../components/toast/Toast';

const Login = () => {
  const { setToken, token } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message,
    });
  };
  if (token) {
    return <Navigate to="/" />;
  }
  useEffect(() => {
    document.title = 'EMP | Login';
  }, []);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      if (data.user.email === import.meta.env.VITE_APP_EMAIL) {
        navigate('/');
        Toast('success', t('TOAST.LOGIN_SUCCESS'));
        return setToken(data.user.accessToken);
      } else {
        return openNotificationWithIcon('error', `${t('LOGIN.ERROR')}`);
      }
    });
  };

  const onFinish = async (values) => {
    await axiosInstance.post('login', values).then((response) => {
      if (response) {
        navigate('/');
        Toast('success', t('TOAST.LOGIN_SUCCESS'));
        return setToken(response.data);
      } else {
        return openNotificationWithIcon('error', `${t('LOGIN.ERROR')}`);
      }
    });
  };
  return (
    <div id="main-container">
      {contextHolder}
      <Row className="auth-sidebar">
        <Col xs={0} sm={8} md={10} className="auth-sidebar-content">
          <img
            className="auth-sidebar-img"
            src="https://cdn.dribbble.com/users/110372/screenshots/4834868/media/4bdf88d8fe39209bb3a22a1fa76edac6.gif"
            alt="img-login"
          />
        </Col>
        <Col xs={24} sm={16} md={14} className="form-login">
          <Space direction="vertical" className="form-content">
            <Typography className="logo-header">
              {t('SYSTEM.LOGO_NAME')}
            </Typography>
            <Typography className="title-login">{t('LOGIN.TEXT')}</Typography>

            <Form
              name="normal_login"
              className="login-form w-100"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: t('LOGIN.EMAIL_VALIDATION'),
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={t('LOGIN.EMAIL_PLACEHOLDER')}
                  type="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('LOGIN.PASSWORD_VALIDATION'),
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={t('LOGIN.PASSWORD_PLACEHOLDER')}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-login w-100"
                >
                  {t('LOGIN.LOGIN')}
                </Button>
              </Form.Item>
            </Form>
            <Divider>{t('LOGIN.OR')}</Divider>
            <Button
              className="btn-login"
              type="secondary"
              block
              onClick={handleClick}
            >
              <div className="d-flex align-items-center justify-content-center">
                <img
                  src={iconGoogle}
                  style={{ width: '30px', marginRight: '10px' }}
                />
                {t('LOGIN.WITH_GOOGLE')}
              </div>
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
