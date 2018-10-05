import * as actionTypes from './shop.actions';

const initialState = {
  products: []
};


const productsReducer = (state=initialState, action: actionTypes) => {
  switch(action.type) {
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    default:
      return state;
  }
};

export default productsReducer;
