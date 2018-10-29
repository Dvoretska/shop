import * as fromCart from './cart.reducer';
import * as fromProducts from './products.reducer';
import * as fromWishlist from './wishlist.reducer';
import { ActionReducerMap } from '@ngrx/store';


export interface AppState {
  cart: fromCart.CartState;
  products: fromProducts.ProductsState;
  wishlist: fromWishlist.WishlistState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: fromCart.cartReducer,
  products: fromProducts.productsReducer,
  wishlist: fromWishlist.wishlistReducer
};

export const getCart = (state: AppState) => state.cart;
export const getProducts = (state: AppState) => state.products;
export const getWishlist = (state: AppState) => state.wishlist;
