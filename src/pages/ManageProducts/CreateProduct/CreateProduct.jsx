import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Select,
  Typography,
  Spin,
} from 'antd';
import axios from 'axios';
import { axiosInstance } from '../../../config/axios';

const { Option } = Select;

const CreateProduct = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false); // Thêm state loading

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Thay đổi với preset của bạn

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dtqd0utw0/image/upload',
        formData,
      );
      return response.data.secure_url; // Trả về URL của ảnh
    } catch (error) {
      message.error('Upload image failed.');
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const onFinish = async (values) => {
    const { name, description, price, type, category, stock } = values;

    // Kiểm tra xem có hình ảnh nào không
    if (fileList.length === 0) {
      message.error('Please upload at least one image!');
      return;
    }

    setLoading(true); // Bắt đầu loading

    try {
      const uploadedImageUrls = await Promise.all(
        fileList.map((file) => handleImageUpload(file.originFileObj)),
      );
      const validImageUrls = uploadedImageUrls.filter((url) => url);

      const productData = {
        name,
        description,
        price,
        type,
        category,
        stock,
        images: validImageUrls,
      };

      const response = await axiosInstance.post('/products', productData); // Gọi API tạo sản phẩm

      message.success('Product created successfully!');
      console.log(response.data);
      form.resetFields(); // Reset form sau khi tạo thành công
      setFileList([]); // Reset danh sách ảnh
    } catch (error) {
      message.error('Failed to create product.');
      console.error('Error creating product:', error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const url = await handleImageUpload(file);
      if (url) {
        onSuccess(url);
      } else {
        onError(new Error('Upload failed'));
      }
    } catch (error) {
      onError(error);
    }
  };

  return (
    <>
      <Typography.Title level={3}>Create Product</Typography.Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please input the product name!' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: 'Please input the price!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[
            { required: true, message: 'Please select the product type!' },
          ]}
        >
          <Select placeholder="Select a type">
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Children">Children</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: 'Please input the category!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, message: 'Please input the stock!' }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          label="Images"
          rules={[
            { required: true, message: 'Please upload at least one image!' },
          ]} // Thêm quy tắc bắt buộc
        >
          <Upload
            customRequest={customRequest}
            listType="picture"
            fileList={fileList}
            onChange={handleUploadChange}
            showUploadList={{
              showPreview: true,
              showRemoveIcon: true,
            }}
            onRemove={(file) => {
              setFileList((prev) =>
                prev.filter((item) => item.uid !== file.uid),
              );
            }}
          >
            <Button>Upload Images</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit" loading={loading}>
              {loading ? 'Creating...' : 'Create'} {/* Hiển thị loading */}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateProduct;
