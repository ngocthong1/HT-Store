import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const EditProduct = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [fileList, setFileList] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axiosInstance.get(`/products/${id}`);
          setProduct(response.data);
          form.setFieldsValue(response.data);

          // Adjust the fileList structure to include all necessary properties
          setFileList(
            response.data.images.map((img, index) => ({
              uid: img.url, // Use a unique id
              name: `image_${index}.jpg`, // You can modify this according to your needs
              status: 'done', // Set the status to 'done' since these are already uploaded
              url: img.url, // This is the URL of the image
            })),
          );
        } catch (error) {
          message.error('Failed to fetch product details.');
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, form]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dlhcg0tcz/image/upload',
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
        fileList.map(async (file) => {
          if (file.url) return file.url; // Nếu đã có URL thì không cần upload lại
          return await handleImageUpload(file.originFileObj);
        }),
      );

      const productData = {
        name,
        description,
        price,
        type,
        category,
        stock,
        images: uploadedImageUrls.filter((url) => url), // Lọc URL hợp lệ
      };

      await axiosInstance.put(`/products/${id}`, productData); // Gọi API cập nhật sản phẩm

      message.success('Product updated successfully!');
    } catch (error) {
      message.error('Failed to update product.');
      console.error('Error updating product:', error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const handleUploadChange = ({ fileList }) => {
    const updatedFileList = fileList.map((file) => ({
      uid: file.uid,
      name: file.name,
      status: file.status,
      url: file.status === 'done' ? file.url : null,
      originFileObj: file.originFileObj,
    }));
    setFileList(updatedFileList);
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const url = await handleImageUpload(file);
      if (url) {
        onSuccess({ url }); // Ensure you pass an object with a url property
      } else {
        onError(new Error('Upload failed'));
      }
    } catch (error) {
      onError(error);
    }
  };

  if (loading) return <Spin size="large" />; // Hiện spinner khi đang tải

  return (
    <div className="container mx-auto p-4">
      <Typography.Title level={3}>Edit Product</Typography.Title>
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
              {loading ? 'Updating...' : 'Update'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProduct;
