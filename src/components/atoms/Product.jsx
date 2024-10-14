import { Link } from 'react-router-dom';

import AddToCart from './AddToCart';
import { textShrink } from '../../utils/helpers/textShrink';

const Product = ({ productData }) => {
  return (
    <>
      {productData && (
        <div className="p-3 md:p-4 lg:p-7 border border-grayshade-50 rounded-xl w-full">
          {productData.images?.length ? (
            <Link to={`${productData.id}`}>
              <img
                className="w-full rounded-lg h-48 sm:h-56 md:h-72 mb-4 md:mb-7 object-cover"
                src={productData.images[0].url}
                alt={productData.images[0].url}
              />
            </Link>
          ) : (
            <div className="w-full rounded-lg h-48 sm:h-56 md:h-72 mb-4 md:mb-7 bg-grayshade-50 flex items-center justify-center">
              <span className="text-grayshade-100">No image available</span>
            </div>
          )}
          <div className="space-y-2 md:space-y-3">
            <p className="font-semibold text-lg md:text-xl text-black">
              {productData.name}
            </p>
            <p className="text-grayshade-100 text-xs">
              {productData.description && textShrink(productData.description)}
              <Link
                className="font-semibold text-black text-xs ml-1 inline-block"
                to={`${productData.id}`}
                state={{ some: 'value' }}
              >
                Read More
              </Link>
            </p>
            <span className="lable text-sm">{productData.category}</span>
          </div>
          <div className="flex justify-between items-center mt-4 md:mt-6">
            <div>
              <p className="text-grayshade-100 text-xs">Price</p>
              <p className="font-semibold text-grayshade-300  text-lg">
                $ {productData.price.toLocaleString()}
              </p>
            </div>
            <AddToCart
              cartData={{
                id: productData.id,
                name: productData.name,
                price: productData.price,
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Product;
