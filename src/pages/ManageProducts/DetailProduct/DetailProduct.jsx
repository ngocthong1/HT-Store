import { Card, Spin, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../../../config/axios';

const { Title, Paragraph } = Typography;

const DetailProduct = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      setProduct(response.data);
      if (response.data.images && response.data.images.length > 0) {
        setSelectedImage(response.data.images[0].url);
      }
    } catch (error) {
      message.error('Failed to fetch product details.');
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Spin size="large" />; // Hiện spinner khi đang tải

  return (
    <div className="container mx-auto p-4">
      <Typography.Title level={3}>Detail Product</Typography.Title>
      <Card className="shadow-lg rounded-lg p-6">
        <Title level={3} className="text-xl font-semibold mb-4">
          {product.name}
        </Title>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={product.name}
            className="w-full max-h-[500px] object-contain rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-[300px] md:h-[400px] bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
            <Typography.Text type="secondary" className="text-lg">
              No image available
            </Typography.Text>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Paragraph className="text-base">{product.description}</Paragraph>
          <div>
            <Paragraph>
              <strong>Price:</strong> ${product.price}
            </Paragraph>
            <Paragraph>
              <strong>Type:</strong> {product.type}
            </Paragraph>
            <Paragraph>
              <strong>Category:</strong> {product.category}
            </Paragraph>
            <Paragraph>
              <strong>Stock:</strong> {product.stock}
            </Paragraph>
          </div>
        </div>
        {product.images && product.images.length > 0 && (
          <div>
            <strong className="block mb-2">Images:</strong>
            <div className="flex flex-wrap gap-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  onClick={() => setSelectedImage(image.url)}
                  className="w-24 h-24 object-cover rounded-md shadow-md cursor-pointer transition-transform transform hover:scale-105"
                />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default DetailProduct;
