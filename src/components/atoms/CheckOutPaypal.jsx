import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { axiosInstance } from '../../config/axios';
import { useCartConsumer } from '../../provider/CartProvider';
import { Toast } from '../toast/Toast';

const Checkout = () => {
  const [{ isPending }] = usePayPalScriptReducer();
  const { cartState, dispatch } = useCartConsumer();

  const onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: cartState ? cartState?.totalPrice.toFixed(2) : '0',
          },
        },
      ],
    });
  };

  const onApproveOrder = (data, actions) => {
    return actions.order.capture().then(async () => {
      if (cartState) {
        await axiosInstance
          .post('/orders', {
            total_amount: cartState.totalPrice.toFixed(2), // Tổng số tiền
            status: 'In Progress', // Trạng thái đơn hàng
            items: cartState?.addedProducts,
          })
          .then(() => {
            Toast('success', 'Order Successfully');
            dispatch({ type: 'CHECKOUT' });
          });
      }
    });
  };

  return (
    <div className="checkout">
      {isPending ? (
        <p>LOADING...</p>
      ) : (
        <PayPalButtons
          style={{ layout: 'vertical' }}
          createOrder={(data, actions) => onCreateOrder(data, actions)}
          onApprove={(data, actions) => onApproveOrder(data, actions)}
        />
      )}
    </div>
  );
};

export default Checkout;
