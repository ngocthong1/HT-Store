import { MdOutlineDelete } from 'react-icons/md';
import findItem from '../../utils/helpers/FindCartProduct';
import { useAuth } from '../../provider/authProvider';
import { useCartConsumer } from '../../provider/CartProvider';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import React from 'react';

function AddToCart({ cartData }) {
  const { token } = useAuth();
  const { cartState, dispatch } = useCartConsumer();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (!token) return setAnchorEl(event.currentTarget);
    addHandler();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const cartInfo = { ...cartData, quantity: 1 };

  const item = findItem(cartState.addedProducts, cartInfo.id);

  const addHandler = async () => {
    dispatch({ type: 'ADD_PRODUCT', payload: cartInfo });
  };
  const increaseHandler = async () => {
    dispatch({ type: 'INCREASE', payload: cartInfo });
  };
  const decreaseHandler = async () => {
    dispatch({ type: 'DECREASE', payload: cartInfo });
  };
  const removeHandler = () => {
    dispatch({ type: 'DELETE', payload: cartInfo });
  };

  return (
    <div className="flex text-white justify-between items-center">
      {cartState.addedProducts.find(
        (cartProduct) => cartProduct.id === cartData.id,
      ) ? (
        <>
          <button className={'h-8 w-8 button !px-0'} onClick={increaseHandler}>
            +
          </button>
          <span className=" bg-zinc-200 text-grayshade-500 inline-block text-center border border-grayshade-50 dark:border-grayshade-100 min-w-10 py-1 px-1 text-md rounded-lg mx-1">
            {item.quantity}
          </span>
          {item.quantity > 1 ? (
            <button
              className={'h-8 w-8 button !px-0'}
              onClick={decreaseHandler}
            >
              -
            </button>
          ) : (
            <button
              className={'h-8 w-8 button !px-0 !bg-red-500'}
              onClick={removeHandler}
            >
              <MdOutlineDelete className="m-auto" />
            </button>
          )}
        </>
      ) : (
        <>
          <button
            className="h-8 px-4 button"
            aria-describedby={id}
            onClick={handleClick}
          >
            Add To Cart
          </button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }}>
              Please login to add products to cart.
              <a className="text-blue-600 hover:text-blue-800" href="/login">
                {' '}
                Login now
              </a>
            </Typography>
          </Popover>
        </>
      )}
    </div>
  );
}

export default AddToCart;
