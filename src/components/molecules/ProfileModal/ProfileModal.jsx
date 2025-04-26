import { useState, useEffect } from 'react';
import { Modal, Tabs, Form, Input, Button, message, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../../config/axios';
import { useAuth } from '../../../provider/authProvider';
import './ProfileModal.scss';

const { TabPane } = Tabs;

const ProfileModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const { token, setToken, setUserInfo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    if (visible && token) {
      fetchUserProfile();
    }
  }, [visible, token]);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/users/profile');

      setProfileData(response.data.user);
      form.setFieldsValue({
        name: response.data.user.name,
        email: response.data.user.email
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      message.error('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (values) => {
    setLoading(true);
    try {
      const response = await axiosInstance.put('/users/profile', values);

      message.success('Profile updated successfully');
      setProfileData(response.data.user);

      if (response.data.token) {
        localStorage.setItem('accessToken', response.data.token);
        setToken(response.data.token);
      }

      setUserInfo(response.data.user);

    } catch (error) {
      console.error('Error updating profile:', error);
      message.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (values) => {
    setLoading(true);
    try {
      await axiosInstance.put('/users/profile', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });

      message.success('Password updated successfully');
      passwordForm.resetFields();

    } catch (error) {
      console.error('Error updating password:', error);
      message.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="User Profile"
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
      className="profile-modal"
    >
      {loading && !profileData ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab="Profile Information" key="1">
            <div className="profile-info">
              <div className="profile-avatar">
                <div className="avatar-circle">
                  {profileData?.name?.charAt(0).toUpperCase() || <UserOutlined />}
                </div>
                <h2>{profileData?.name}</h2>
                <p>{profileData?.email}</p>
                <p className="user-type">Account Type: {profileData?.type}</p>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleUpdateProfile}
                initialValues={{
                  name: profileData?.name,
                  email: profileData?.email
                }}
              >
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Name" />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Update Profile
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </TabPane>

          <TabPane tab="Change Password" key="2">
            <Form
              form={passwordForm}
              layout="vertical"
              onFinish={handleUpdatePassword}
            >
              <Form.Item
                name="currentPassword"
                label="Current Password"
                rules={[{ required: true, message: 'Please enter your current password' }]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Current Password" />
              </Form.Item>

              <Form.Item
                name="newPassword"
                label="New Password"
                rules={[
                  { required: true, message: 'Please enter your new password' },
                  { min: 6, message: 'Password must be at least 6 characters' }
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="New Password" />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm New Password"
                dependencies={['newPassword']}
                rules={[
                  { required: true, message: 'Please confirm your new password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('The two passwords do not match'));
                    },
                  }),
                ]}
              >
                <Input.Password prefix={<LockOutlined />} placeholder="Confirm New Password" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Update Password
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      )}
    </Modal>
  );
};

export default ProfileModal;
