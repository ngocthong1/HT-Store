import { useEffect, useState } from 'react';
import Product from '../../components/atoms/Product';
import { ThreeCircles } from 'react-loader-spinner';
import NoProductFound from '../../components/atoms/NoProductFound';
import { axiosInstance } from '../../config/axios';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useSearchParams } from 'react-router-dom';

const Products = () => {
  const [listProduct, setListProduct] = useState([]);
  const [pagination, setPagination] = useState({
    limit: 9,
    page: 1,
  });
  const [totalPages, setTotalPages] = useState(0);
  const [notFound, setNotFound] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State cho giá trị tìm kiếm
  const [loading, setLoading] = useState(false); // State cho loading
  const [selectedCategory, setSelectedCategory] = useState(''); // State cho category
  const [categories, setCategories] = useState([]); // State cho danh sách category
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Fetch categories (giả sử API có endpoint để lấy danh sách category)
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get('/products/categories');
        setCategories(response.data.categories); // Giả sử response.data là danh sách category
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const dataFetcher = async () => {
      setLoading(true); // Bắt đầu loading
      try {
        const response = await axiosInstance.get('/products', {
          params: {
            ...pagination,
            search: searchTerm,
            category: selectedCategory, // Gửi category cùng với pagination và searchTerm
            type: searchParams.get('type') || '',
          },
        });
        setListProduct(response.data.products.filter((item) => item));
        setTotalPages(response.data.totalPages);
        setNotFound(response.data.products.length === 0);
      } catch (err) {
        console.error('Something went wrong while fetching data', err);
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };
    dataFetcher();
  }, [pagination, searchTerm, selectedCategory, searchParams.get('type')]); // Gọi lại API khi pagination, searchTerm hoặc selectedCategory thay đổi

  const handlePageChange = (event, value) => {
    setPagination((prev) => ({ ...prev, page: value }));
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Cập nhật giá trị tìm kiếm
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset về trang 1 khi tìm kiếm
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Cập nhật category đã chọn
    setPagination((prev) => ({ ...prev, page: 1 })); // Reset về trang 1 khi thay đổi category
  };

  return (
    <>
      <div className="wrapper bg-white">
        <div className="w-full flex lg:flex-row flex-col-reverse">
          <div className="lg:w-10/12 md:w-10/12 m-auto">
            {/* Sử dụng Flexbox để sắp xếp ô tìm kiếm và ô chọn category */}
            <div className="flex flex-wrap gap-2 mb-4">
              <TextField
                label="Search Products"
                variant="outlined"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                margin="normal"
                sx={{ flex: '1 1 200px' }} // Đảm bảo chiều rộng tối thiểu cho ô tìm kiếm
              />
              <FormControl sx={{ flex: '1 1 200px' }} margin="normal" fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  label="Category"
                >
                  <MenuItem value="">All</MenuItem>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <MenuItem key={category.id} value={category.name}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 lg:gap-7 gap-4">
              {loading ? (
                <ThreeCircles
                  visible
                  height="100"
                  width="100"
                  color="#121212"
                  ariaLabel="triangle-loading"
                  wrapperStyle={{ fontSize: '150px' }}
                  wrapperClass="w-full col-span-3 flex justify-center m-auto"
                />
              ) : notFound ? (
                <NoProductFound />
              ) : (
                listProduct.map((product) => (
                  <Product key={product.id} productData={product} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 0 && (
          <Stack spacing={2} alignItems="center" marginTop={4}>
            <Pagination
              count={totalPages}
              page={pagination.page}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        )}
      </div>
    </>
  );
};

export default Products;
