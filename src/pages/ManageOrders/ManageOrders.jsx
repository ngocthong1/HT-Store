import './ManageOrders.scss';
import { useLayout } from '../../provider/layoutProvider';
import React, { useEffect, useState } from 'react';
import { Table, Button, Pagination, Progress, Typography, message } from 'antd';
import { axiosInstance } from '../../config/axios';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ManageOrders = () => {
  const navigate = useNavigate();
  const { setBreadcumb } = useLayout();

  useEffect(() => {
    document.title = 'HTS | Manage Orders';
    setBreadcumb([{ key: 'orders' }]);
  }, []);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchOrders = async (page) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/orders`, {
        params: {
          page,
          limit,
        },
      });
      setOrders(response.data.orders);
      setTotalItems(response.data.totalItems);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const getStatusProgress = (status) => {
    switch (status) {
      case 'In Progress':
        return { percent: 50, color: 'blue' };
      case 'Delivered':
        return { percent: 100, color: 'green' };
      case 'Canceled':
        return { percent: 100, color: 'red' };
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(`/orders/${orderId}`, { status: newStatus });
      message.success(`Order status updated to ${newStatus}`);
      fetchOrders(currentPage); // Refresh the orders list
    } catch (error) {
      message.error('Failed to update order status');
      console.error('Error updating order status:', error);
    }
  };

  const cancelOrder = async (orderId) => {
    try {
      await axiosInstance.put(`/orders/${orderId}`, { status: 'Canceled' });
      message.success('Order has been canceled');
      fetchOrders(currentPage); // Refresh the orders list
    } catch (error) {
      message.error('Failed to cancel order');
      console.error('Error canceling order:', error);
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Total Amount',
      dataIndex: 'total_amount',
      key: 'total_amount',
      render: (text) => `$${text}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const { percent, color } = getStatusProgress(status);
        return (
          <div className="flex items-center">
            <Progress
              type="circle"
              percent={percent}
              strokeColor={color}
              width={50}
              status={status === 'Canceled' ? 'exception' : ''}
              className="mr-2"
            />
            <span>{status}</span>
          </div>
        );
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Button type="link" onClick={() => handleViewOrder(record.id)}>
            View
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => updateOrderStatus(record.id, 'Delivered')}
            disabled={
              record.status === 'Delivered' || record.status === 'Canceled'
            } // Ngăn không cho cập nhật nếu đã giao hoặc đã hủy
          >
            Mark as Delivered
          </Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => cancelOrder(record.id)}
            disabled={record.status === 'Canceled'} // Ngăn không cho hủy nếu đã hủy
            style={{ color: 'orange' }} // Thay đổi màu của nút hủy đơn hàng
          >
            Cancel Order
          </Button>
        </div>
      ),
    },
  ];

  const handleViewOrder = (id) => {
    navigate(`${id}`);
  };

  return (
    <div id="ManageOrder" className="p-2">
      <Typography.Title level={3} className="text-2xl font-bold mb-4">
        Order List
      </Typography.Title>
      <Table
        dataSource={orders}
        columns={columns}
        rowKey="id"
        loading={loading}
        pagination={false}
      />
      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          pageSize={limit}
          total={totalItems}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger
          onShowSizeChange={(current, size) => {
            setLimit(size);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default ManageOrders;
