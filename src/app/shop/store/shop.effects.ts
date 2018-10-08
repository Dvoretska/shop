import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as ShopActions from './shop.actions'
import { map } from 'rxjs/operators';

@Injectable()
export class ShopEffects {
  @Effect()
  addProduct = this.actions$
    .pipe(ofType(ShopActions.ADD_PRODUCT), map((action: ShopActions.addProduct) => {
      return action.payload
    }))

  constructor(private actions$: Actions) {

  }
}
