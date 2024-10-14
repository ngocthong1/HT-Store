import AddToCart from '../../components/atoms/AddToCart';
import EmptyCart from '../../components/atoms/EmptyCart';
import { useCartConsumer } from '../../provider/CartProvider';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import Checkout from '../../components/atoms/CheckOutPaypal';

const initialOptions = {
  'client-id':
    'AeQsSsHSPAeHmwIGz-aX48zD8dFcHgME2JpBpI2TlXicHR_KLkem41VIaixToWgDYZ3B5L39kwDL7C_x',
  currency: 'USD',
  intent: 'capture',
};

export default function CheckoutPage() {
  const { cartState } = useCartConsumer();

  return (
    <>
      {cartState.checkout || !cartState.addedProducts.length ? (
        <EmptyCart />
      ) : (
        <div className=" wrapper flex flex-col-reverse xl:grid gap-8 lg:grid-cols-3 text-xl py-14">
          <div className="h-min block border-collapse text-center p-0 sm:p-5 col-start-1 col-end-3">
            <div className="hidden sm:grid grid-cols-4 w-full">
              <div className="text-left border-purpleshade-400 border-l-4 p-4 text-black">
                PRODUCT
              </div>
              <div className=" justify-self-center p-4 text-black ">PRICE</div>
              <div className=" justify-self-center p-4 text-black">
                QUANTITY
              </div>
              <div className=" justify-self-center p-4 text-black">
                SUBTOTAL
              </div>
            </div>
            <div className=" h-max p-1 from-purpleshade-400 from-0% to-30% bg-gradient-to-br to-grayshade-50 ">
              <div className="text-lg bg-white ">
                {cartState.addedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-1 sm:grid-cols-4 py-4 xl:text-base text-sm text-black"
                  >
                    <div className=" text-center sm:text-left p-4 h-14 text-black">
                      {product.name}
                    </div>
                    <div className=" justify-self-center p-4 h-14 text-black">
                      $ {product.price}
                    </div>
                    <div className=" justify-self-center p-4 h-14">
                      <AddToCart
                        cartData={{
                          id: product.id,
                          name: product.name,
                          price: product.price,
                        }}
                      />
                    </div>
                    <div className="w-max justify-self-center p-4 h-14">
                      $ {Number(product.quantity * product.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {!!cartState.addedProducts.length && (
            <div className="font-bold col-start-3 xl:mt-20 justify-self-end col-end-4 h-max w-full xl:w-max  border-2 border-grayshade-50  p-10 rounded-xl relative bg-cover bg-no-repeat outline outline-zinc-200 outline-8 ">
              <div className="flex xl:justify-start justify-center items-center my-5 text-black">
                <p>Order Total : </p>
                <p className="ml-2">
                  $ {Number(cartState.totalPrice).toFixed(2)}
                </p>
              </div>
              <div className="flex xl:justify-start justify-center items-center my-5 text-black">
                <p>Sales volume : </p>
                <p className="ml-2">{cartState.ordersCount}</p>
              </div>
              {cartState && (
                <div className="justify-center text-center">
                  <PayPalScriptProvider options={initialOptions}>
                    <Checkout />
                  </PayPalScriptProvider>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
