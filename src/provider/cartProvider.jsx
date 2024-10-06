/* eslint-disable react-refresh/only-export-components */
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
  action: {
    type: '',
    cartItem: null,
  },
};

const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialValue);
  const { token, userInfo } = useAuth();

  // Lấy giỏ hàng từ API khi người dùng đăng nhập
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (token && userInfo) {
      const getUserCart = async () => {
        try {
          const { data } = await axiosInstance.get(
            `/carts/${userInfo.id || userInfo.user_id}`,
            {
              signal,
            },
          );
          dispatch({ type: 'GETFROMDB', payload: data });
        } catch (err) {
          if (err.response && err.response.status === 404) {
            return;
          }
          console.error(err);
        }
      };

      getUserCart();
      return () => {
        controller.abort();
      };
    }
  }, [token, userInfo]);

  // Gọi API khi cartState thay đổi
  useEffect(() => {
    const updateCart = async () => {
      if (cartState?.action?.cartItem) {
        try {
          // Dispatch action để cập nhật giỏ hàng
          await axiosInstance.post('/carts', {
            productId: cartState.action.cartItem.id,
            quantity: cartState.action.cartItem.quantity,
            actionType: cartState.action.type,
          });
        } catch (error) {
          console.error('Error updating cart:', error);
        }
      }
    };

    updateCart();
  }, [cartState.action]);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

const useCartConsumer = () => {
  const cartData = useContext(CartContext);
  return cartData;
};

export { useCartConsumer };
