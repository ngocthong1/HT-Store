/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router-dom';
import { Col, Row, Space, Typography, Form, Input, notification } from 'antd';
import './Register.scss';
import { useTranslation } from 'react-i18next';
import Button from '../../components/atoms/Button/Button';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Toast } from '../../components/toast/Toast';
import { registerApi } from '../../apis/user';
import { useAuth } from '../../provider/authProvider';

const Register = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [api, contextHolder] = notification.useNotification();

  const [isLoading, setIsLoading] = useState(false);
  const openNotificationWithIcon = (type, message) => {
    api[type]({
      message,
    });
  };

  useEffect(() => {
    document.title = 'HTS | Register';
  }, []);

  const onFinish = async (values) => {
    try {
      await registerApi(values).then((response) => {
        setIsLoading(false);
        navigate('/login');
        Toast('success', t('TOAST.REGISTER_SUCCESS'));
        return setToken(response.data.accessToken);
      });
    } catch (error) {
      console.log(error);
      if (error) {
        return openNotificationWithIcon('error', error.response.data.message);
      }
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
            alt="img-register"
          />
        </Col>
        <Col xs={24} sm={16} md={14} className="form-register">
          <Space direction="vertical" className="form-content">
            <Typography className="logo-header">
              {t('SYSTEM.LOGO_NAME')}
            </Typography>
            <Typography className="title-register">
              {t('REGISTER_FORM.TEXT').toUpperCase()}
            </Typography>

            <Form
              name="normal_register"
              className="register-form w-full"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: t('REGISTER_FORM.NAME_VALIDATION'),
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder={t('REGISTER_FORM.NAME_PLACEHOLDER')}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: t('REGISTER_FORM.EMAIL_VALIDATION'),
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder={t('REGISTER_FORM.EMAIL_PLACEHOLDER')}
                  type="email"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('REGISTER_FORM.PASSWORD_VALIDATION'),
                  },
                ]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={t('REGISTER_FORM.PASSWORD_PLACEHOLDER')}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="btn-register w-full mb-4"
                  loading={isLoading}
                >
                  {t('REGISTER_FORM.REGISTER')}
                </Button>
                <div className="w-full flex justify-center text-md">
                  Already have an account?
                  <p
                    className="underline underline-offset-2 ml-2 text-[#4478f1] cursor-pointer"
                    href="/login"
                    onClick={() => navigate('/login')}
                  >
                    Log in
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

export default Register;
