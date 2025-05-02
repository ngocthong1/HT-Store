import { message, Modal, Table, Tag } from 'antd';
import { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axios';
import { useLayout } from '../../provider/layoutProvider';
import './ManageCustomers.scss';

const ManageCustomers = () => {
  const { setBreadcumb } = useLayout();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newStatus, setNewStatus] = useState(false);

  useEffect(() => {
    document.title = 'HTS | Manage Customers';
    setBreadcumb([{ key: 'customers' }]);
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/users/all');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const showStatusModal = (newActiveStatus, record) => {
    setSelectedUser(record);
    setNewStatus(newActiveStatus);
    setModalVisible(true);
  };

  const handleModalConfirm = async () => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/users/${selectedUser.id}/status`, {
        isActive: newStatus,
      });
      message.success('Status updated successfully');
      fetchCustomers();
    } catch (error) {
      message.error('Failed to update status');
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive, record) => (
        <Tag
          color={isActive ? 'success' : 'error'}
          style={{ cursor: 'pointer' }}
          onClick={() => showStatusModal(!isActive, record)}
        >
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
  ];

  return (
    <div id="ManageCustomer">
      <Table
        columns={columns}
        dataSource={customers}
        loading={loading}
        rowKey="id"
      />
      <Modal
        title="Confirm Status Change"
        open={modalVisible}
        onOk={handleModalConfirm}
        onCancel={() => setModalVisible(false)}
        confirmLoading={loading}
      >
        <p>
          Are you sure you want to change {selectedUser?.name}'s status to{' '}
          {newStatus ? 'Active' : 'Inactive'}?
        </p>
      </Modal>
    </div>
  );
};

export default ManageCustomers;
