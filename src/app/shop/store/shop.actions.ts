import { Action } from '@ngrx/store';
import { Product } from '../product.model';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const TRY_TEST = 'TRY_TEST';


export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: Product) {}
}

export class TryTest implements Action {
  readonly type = TRY_TEST;

  constructor(public payload: Product) {}
}

export type shopActions = AddProduct | TryTest;
