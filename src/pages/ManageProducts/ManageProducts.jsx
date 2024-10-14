import { useEffect } from 'react';
import './ManageProducts.scss';
import { useLayout } from '../../provider/layoutProvider';
import ProductTable from '../../components/atoms/Table';

const ManageProducts = () => {
  const { setBreadcumb } = useLayout();

  useEffect(() => {
    document.title = 'HTS | Manage Products';
    setBreadcumb([{ key: 'products' }]);
  }, []);
  const productData = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      price: 29.99,
      type: 'Male',
      category: 'Clothing',
      stock: 100,
    },
    // Thêm các sản phẩm khác tại đây
  ];
  return (
    <div id="ManageProduct">
      <ProductTable data={productData} />
    </div>
  );
};

export default ManageProducts;
