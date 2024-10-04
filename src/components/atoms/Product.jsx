/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';

import AddToCart from './AddToCart';
import { textShrink } from '../../utils/helpers/textShrink';

function Product({
  productData: {
    id,
    name,
    price,
    // images: [image],s
    category,
    description,
  },
}) {
  return (
    <div className="md:p-4 lg:p-7 p-3 border border-grayshade-50 rounded-xl w-full justify-center justify-items-center justify-self-center">
      <Link to={`${id}`}>
        <img
          className="w-full rounded-lg self-stretch h-72 min-h-52 mb-7 object-cover"
          src={'https://iili.io/dR1Eyiv.jpg'}
          alt=""
        />
      </Link>
      <div>
        <p className="font-semibold text-xl mb-2 h-auto text-black">{name}</p>
        <p className="text-grayshade-100 text-xs">
          {textShrink(description)}
          <Link
            className="font-semibold text-black  text-xs ml-1"
            to={`${id}`}
            state={{ some: 'value' }}
          >
            Read More
          </Link>
        </p>
        <span className="lable">{category}</span>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-grayshade-100 text-xs">Price</p>
          <p className="font-semibold text-grayshade-300  text-lg">
            $ {price.toLocaleString()}
          </p>
        </div>
        {/* <AddToCart cartData={{ id, name, price }} /> */}
      </div>
    </div>
  );
}

export default Product;
