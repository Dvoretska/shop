import * as shopActions from './shop.actions';

const initialState = {
  products: [],
  loading: false,
  categories: [{name: 'Shoes', id: 1}, {name: 'Tops', id: 2}, {name: 'Dresses', id: 3}]
};


export function shopReducer(state=initialState, action: shopActions.shopActions) {
  switch(action.type) {
    case shopActions.ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case shopActions.TRY_TEST:
      return {
        ...state,
        loading: true;
      };
    default:
      return state;
  }
}
