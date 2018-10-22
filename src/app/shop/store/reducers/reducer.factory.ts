import * as fromCart from './cart.reducer';
import * as fromProducts from './products.reducer';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
  cart: fromCart.CartState;
  products: fromProducts.ProductsState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: fromCart.cartReducer,
  products: fromProducts.productsReducer
};

export const getCart = (state: AppState) => state.cart;
export const getProducts = (state: AppState) => state.products;
