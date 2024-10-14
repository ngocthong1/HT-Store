import React, { useEffect, useState } from 'react';
import { Table, Input, Button, Popconfirm, message, Typography } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../config/axios';
import { useNavigate } from 'react-router-dom';

const ProductTable = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async (page = 1) => {
    setLoading(true); // Bắt đầu loading
    try {
      const response = await axiosInstance.get('/products', {
        params: {
          page,
          limit,
          search: searchTerm,
        },
      });
      setData(response.data.products);
      setTotalItems(response.data.totalItems);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, limit, searchTerm]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
    fetchProducts(1);
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/products/${id}`);
      message.success('Product deleted successfully');
      fetchProducts(currentPage); // Refresh the product list
    } catch (error) {
      message.error('Failed to delete product');
      console.error('Error deleting product:', error);
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'images',
      key: 'images',
      render: (images) => (
        <div>
          {images && images.length > 0 ? (
            <img
              src={images[0].url}
              alt="Product"
              style={{ width: 50, height: 50, objectFit: 'cover' }}
            />
          ) : (
            <span>No Image</span>
          )}
        </div>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text) => `$${text}`,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button
            type="link"
            onClick={() => navigate(`${record.id}`)}
            icon={<EyeOutlined />}
            style={{ padding: 0 }}
          />
          <Button
            type="link"
            onClick={() => navigate(`edit/${record.id}`)}
            icon={<EditOutlined />}
            style={{ padding: 0 }}
          />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              style={{ padding: 0 }}
            />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Typography.Title level={3}>List Products</Typography.Title>
      <div className="flex justify-between items-center mb-4">
        <Input.Search
          placeholder="Search products..."
          onSearch={handleSearch}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-72"
        />
        <Button
          type="primary"
          className="ml-4"
          onClick={() => navigate('create')}
        >
          Thêm sản phẩm
        </Button>
      </div>

      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={loading} // Chỉ hiển thị loading trong bảng
        pagination={{
          current: currentPage,
          pageSize: limit,
          total: totalItems,
          onChange: (page) => setCurrentPage(page),
          showSizeChanger: true,
          onShowSizeChange: (current, size) => {
            setLimit(size);
            setCurrentPage(1); // Reset về trang đầu khi thay đổi kích thước
          },
        }}
      />
    </div>
  );
};

export default ProductTable;
