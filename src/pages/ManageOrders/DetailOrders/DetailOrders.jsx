import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Spin, Table, Button, message } from 'antd';
import { axiosInstance } from '../../../config/axios';

const OrderDetail = () => {
  const { id } = useParams(); // Lấy ID đơn hàng từ URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    try {
      const response = await axiosInstance.get(`/orders/detail/${id}`);
      setOrder(response.data);
    } catch (error) {
      message.error('Failed to fetch order details.');
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Spin size="large" />; // Hiện spinner khi đang tải

  if (!order) return <Typography.Text>No order found.</Typography.Text>; // Nếu không tìm thấy đơn hàng

  const columns = [
    {
      title: 'Product Image',
      dataIndex: ['Product', 'images'],
      key: 'image',
      render: (images) => (
        <img
          src={images?.[0]?.url}
          alt="Product"
          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
        />
      ),
    },
    {
      title: 'Product ID',
      dataIndex: 'ProductId',
      key: 'ProductId',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text}`,
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <Typography.Title level={3}>Order Details</Typography.Title>
      <Typography.Paragraph>
        <strong>Order ID:</strong> {order.id}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Total Amount:</strong> ${order.total_amount}
      </Typography.Paragraph>
      <Typography.Paragraph>
        <strong>Status:</strong> {order.status}
      </Typography.Paragraph>

      <Typography.Title level={4}>Order Items</Typography.Title>
      <Table
        dataSource={order.OrderItems}
        columns={columns}
        rowKey="ProductId"
        pagination={false}
      />

      <div style={{ marginTop: '20px' }}>
        <Button type="primary" onClick={() => window.history.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default OrderDetail;
