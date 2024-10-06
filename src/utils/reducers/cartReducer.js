/* eslint-disable no-case-declarations */
import { PriceSum, manageQuantity, orderSum } from '../helpers/manageQuantity';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      if (
        !state.addedProducts.find((product) => product.id === action.payload.id)
      ) {
        state.addedProducts.push({ ...action.payload, quantity: 1 });
      }
      return {
        addedProducts: [...state.addedProducts],
        ordersCount: orderSum(state.addedProducts),
        totalPrice: PriceSum(state.addedProducts),
        checkout: false,
        action: {
          type: 'ADD_PRODUCT',
          cartItem: action.payload,
        },
      };
    case 'INCREASE': {
      manageQuantity(state.addedProducts, action.payload.id, action.type);
      return {
        ...state,
        addedProducts: [...state.addedProducts],
        ordersCount: orderSum(state.addedProducts),
        totalPrice: PriceSum(state.addedProducts),
        checkout: false,
        action: {
          type: 'INCREASE',
          cartItem: action.payload,
        },
      };
    }
    case 'DECREASE':
      manageQuantity(state.addedProducts, action.payload.id, action.type);
      return {
        ...state,
        ...state.addedProducts,
        ordersCount: orderSum(state.addedProducts),
        totalPrice: PriceSum(state.addedProducts),
        checkout: false,
        action: {
          type: 'DECREASE',
          cartItem: action.payload,
        },
      };
    case 'DELETE':
      const newAddedProducts = state.addedProducts.filter(
        (product) => product.id !== action.payload.id,
      );
      return {
        ...state,
        addedProducts: [...newAddedProducts],
        ordersCount: orderSum(newAddedProducts),
        totalPrice: PriceSum(newAddedProducts),
        checkout: false,
        action: {
          type: 'DELETE',
          cartItem: action.payload,
        },
      };
    case 'CHECKOUT':
      return {
        ...state,
        checkout: true,
      };
    case 'CLEAR':
      return {
        ...state,
        checkout: false,
        ordersCount: 0,
        totalPrice: 0,
        addedProducts: [],
      };
    case 'GETFROMDB':
      return {
        ...state,
        checkout: action.payload.checkout,
        ordersCount: action.payload.ordersCount,
        totalPrice: action.payload.totalPrice,
        addedProducts: action.payload.addedProducts,
      };
    default:
      return state;
  }
};
export default cartReducer;
