import * as shopActions from './shop.actions';

const initialState = {
  products: [],
  loading: false,
  error: null,
  categories: [{name: 'Shoes', id: 1}, {name: 'Tops', id: 2}, {name: 'Dresses', id: 3}]
};


export function shopReducer(state=initialState, action: shopActions.shopActions) {
  switch(action.type) {
    case shopActions.ADD_PRODUCT:
      return {
        ...state,
        loading: true
      };
    case shopActions.ADD_PRODUCT_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case shopActions.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: [...state.products, action.payload.product]
      };
    case shopActions.ADD_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
