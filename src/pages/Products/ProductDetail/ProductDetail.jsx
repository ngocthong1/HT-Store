import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ImageSlider from '../../../components/atoms/ImageSlider';
import { IoIosArrowBack } from 'react-icons/io';
import { ThreeCircles } from 'react-loader-spinner';
import { axiosInstance } from '../../../config/axios';
import AddToCart from '../../../components/atoms/AddToCart';
const ProductDetail = () => {
  const [loading, setLoading] = useState(true);
  const [imgIndex, setImgIndex] = useState(0);
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    // Fetch categories (giả sử API có endpoint để lấy danh sách category)
    const fetchProductDetail = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data); // Giả sử response.data là danh sách category
        setLoading(false);
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };

    fetchProductDetail();
  }, []);
  useEffect(() => {
    document.title = 'HTS | Detail Products';
  }, []);
  return (
    <div className="flex items-center justify-center max-w-7xl m-auto wrapper">
      {loading ? (
        <ThreeCircles
          visible
          height="100"
          width="100"
          color="#121212"
          ariaLabel="ThreeCircles-loading"
          wrapperStyle={{ fontSize: '150px' }}
          wrapperClass="w-full col-span-3 flex justify-center m-auto"
        />
      ) : (
        <div className="relative flex lg:flex-row flex-col bg-zinc-100  border border-grayshade-300 rounded-xl max-md:p-4 lg:p-10 ">
          <Link
            className="absolute text-xs lg:text-base flex items-center  text-grayshade-300 bg-zinc-200  border border-grayshade-50 px-4 py-2 top-[1%] right-[2%] rounded-full"
            to={'/products'}
          >
            <IoIosArrowBack className="text-grayshade-400 mr-2" /> Back
          </Link>
          <ImageSlider
            imageList={product.images}
            setImgIndex={setImgIndex}
            imgIndex={imgIndex}
          />
          <div className="lg:p-8 max-md:p-0 flex lg:min-w-96 flex-col justify-center">
            <p className="text-4xl max-sm:text-2xl font-semibold text-black">
              {product.name}
            </p>
            <span className="lable w-max">{product.category}</span>
            <p className="text-xl max-sm:text-base font-medium text-grayshade-50 my-10">
              {product.description}
            </p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-grayshade-100  text-lg">Price</p>
                <p className="font-bold text-grayshade-300  text-2xl">
                  $ {product.price.toLocaleString()}
                </p>
              </div>
              <AddToCart
                cartData={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetail;
