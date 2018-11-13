import * as fromCart from './cart.reducer';
import * as fromProducts from './products.reducer';
import * as fromWishlist from './wishlist.reducer';
import * as fromOrder from './order.reducer';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
  cart: fromCart.CartState;
  products: fromProducts.ProductsState;
  wishlist: fromWishlist.WishlistState;
  order: fromOrder.OrderState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: fromCart.cartReducer,
  products: fromProducts.productsReducer,
  wishlist: fromWishlist.wishlistReducer,
  order: fromOrder.orderReducer
};

export const getCart = (state: AppState) => state.cart;
export const getProducts = (state: AppState) => state.products;
export const getWishlist = (state: AppState) => state.wishlist;
export const getOrder = (state: AppState) => state.order;
