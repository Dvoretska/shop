import * as actionTypes from './shop.actions';

const initialState = {
  products: [],
  categories: [{name: 'Shoes', id: 0}, {name: 'Tops', id: 1}, {name: 'Dresses', id: 2}]
};


export function shopReducer(state=initialState, action: actionTypes.shopActions) {
  switch(action.type) {
    case actionTypes.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    default:
      return state;
  }
}
