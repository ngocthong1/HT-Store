/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../../provider/authProvider';
import {
  Col,
  Divider,
  Row,
  Space,
  Typography,
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
import { useEffect, useState } from 'react';
import { Toast } from '../../components/toast/Toast';
import { loginApi } from '../../apis/user';

const Login = () => {
  const { setToken, token } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();

  const [isLoading, setIsLoading] = useState(false);

  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message,
    });
  };

  if (token) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    document.title = 'HTS | Login';
  }, []);

  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      if (data) {
        navigate('/');
        Toast('success', t('TOAST.LOGIN_SUCCESS'));
        return setToken(JSON.stringify(data.user.accessToken));
      } else {
        return openNotificationWithIcon('error', `${t('LOGIN_FORM.ERROR')}`);
      }
    });
  };

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      await loginApi(values).then((response) => {
        if (response) {
          setIsLoading(false);
          navigate('/');
          Toast('success', t('TOAST.LOGIN_SUCCESS'));
          return setToken(response.data.token);
        }
      });
    } catch (error) {
      setIsLoading(false);
      return openNotificationWithIcon('error', error.response.data.message);
    }
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
            <Typography className="title-login">
              {t('LOGIN_FORM.TEXT')}
            </Typography>

            <Form
              name="normal_login"
              className="login-form w-full"
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
                    message: t('LOGIN_FORM.EMAIL_VALIDATION'),
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={t('LOGIN_FORM.EMAIL_PLACEHOLDER')}
                  type="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('LOGIN_FORM.PASSWORD_VALIDATION'),
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={t('LOGIN_FORM.PASSWORD_PLACEHOLDER')}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-login w-full mb-4"
                  loading={isLoading}
                >
                  {t('LOGIN_FORM.LOGIN')}
                </Button>
                <a
                  className="underline underline-offset-2 ml-2 text-[#4478f1] text-md flex justify-center"
                  href=""
                >
                  Forgot password?
                </a>
              </Form.Item>
              <Divider>or</Divider>
              <Form.Item>
                <Button
                  className="btn-login mb-4"
                  type="secondary"
                  block
                  onClick={handleClick}
                >
                  <div className="flex items-center justify-center">
                    <img src={iconGoogle} className="w-5 mr-2 text-lg" />
                    {t('LOGIN_FORM.WITH_GOOGLE')}
                  </div>
                </Button>
                <div className="w-full flex justify-center text-md">
                  Don't have an account?
                  <p
                    className="underline underline-offset-2 ml-2 text-[#4478f1] cursor-pointer"
                    onClick={() => navigate('/register')}
                  >
                    Register
                  </p>
                </div>
              </Form.Item>
            </Form>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
