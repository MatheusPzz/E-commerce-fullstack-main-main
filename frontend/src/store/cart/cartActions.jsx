import * as actionTypes from "./actionTypes";

export const addToCart = (item) => {
  return {
    type: actionTypes.ADD_TO_CART,
    item: item,
  };
};

export const removeFromCart = (id) => {
  return {
    type: actionTypes.REMOVE_ITEM,
    id: id,
  };
};

export const clearCart = () => {  // Action creator to clear the cart
  return {
    type: actionTypes.CLEAR_CART,
  };
};