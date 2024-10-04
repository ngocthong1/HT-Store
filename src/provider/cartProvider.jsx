/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from 'react';
import cartReducer from '../utils/reducers/cartReducer';
import { useAuth } from '../provider/authProvider';
import { axiosInstance } from '../config/axios';
const CartContext = createContext();

const initialValue = {
  checkout: false,
  ordersCount: 0,
  totalPrice: 0,
  addedProducts: [],
};

function CartProvider({ children }) {
  const [cartState, dispatch] = useReducer(cartReducer, initialValue);
  const { token } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (token) {
      const getUserCart = async () => {
        await axiosInstance
          .get('/users/cart', { signal: signal })
          .then(({ data }) => {
            dispatch({ type: 'GETFROMDB', payload: data });
          })
          .catch((err) => {
            if (err.response.status === 404) {
              return;
            }
          });
      };
      getUserCart();
      return () => {
        controller.abort();
      };
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const postCart = async () => {
      await axiosInstance
        .post('/user/updatecart', { cartState }, { signal: signal })
        .catch((err) => {
          if (err.code === 'ERR_CANCELED') return;
          console.log(err);
        });
    };
    postCart();

    return () => {
      controller.abort();
    };
  }, [cartState]);
  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}
export default CartProvider;

const useCartCunsumer = () => {
  const cartData = useContext(CartContext);
  return cartData;
};
export { useCartCunsumer };
