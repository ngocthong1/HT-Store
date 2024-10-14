import { useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { axiosInstance } from '../../config/axios';
import { useAuth } from '../../provider/authProvider';
import EmptyOrders from '../../components/atoms/EmptyOrders';
import { jwtDecode } from 'jwt-decode';

const MyOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const userInfo = jwtDecode(token);
    if (token && userInfo) {
      const getOrders = async () => {
        await axiosInstance.get(`/orders/${userInfo.id}`).then((res) => {
          setOrders(res.data);
          setIsloading(false);
        });
      };
      getOrders();
    }
  }, []);

  return (
    <div className="mt-6 h-full px-6 items-center">
      {isLoading ? (
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#703BF7"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=" h-full flex justify-center items-center"
        />
      ) : !orders.length ? (
        <EmptyOrders />
      ) : (
        orders.map((order, key) => (
          <div
            key={key}
            className=" border border-grayshade-50 rounded-lg my-4 p-2 xl:p-8 bg-white"
          >
            <ul>
              {order.OrderItems.map((item, key) => (
                <li
                  key={key}
                  className="p-1 xl:p-2 text-sm lg:text-xl grid grid-cols-3 border-b border-b-grayshade-50 dark:border-b-grayshade-300"
                >
                  <span className="font-semibold text-black">
                    {item.Product.name}
                  </span>
                  <span className="font-semibold text-black place-self-center">
                    $ {item.Product.price}
                  </span>
                  <span className="font-semibold text-black place-self-center">
                    Quantity: {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-evenly mb-0">
              <p className="font-bold lable">
                Total Orders : {order.totalProducts}
              </p>
              <p className="font-bold lable">
                Total Price : $ {order.total_amount}
              </p>
              <p
                className={`font-bold  lable ${
                  order.status === 'In Progress'
                    ? 'bg-yellow-200 text-black'
                    : order.status === 'Delivered'
                    ? 'bg-green-400 text-black'
                    : 'bg-slate-400 text-black'
                }`}
              >
                Status: {order.status}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyOrders;
