import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as ShopActions from './shop.actions'
import { mergeMap, map } from 'rxjs/operators';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable()
export class ShopEffects {
  @Effect()
  addProduct = this.actions$
    .pipe(ofType(ShopActions.ADD_PRODUCT), map((action: ShopActions.AddProduct) => action.payload), mergeMap((payload) => {
      return this.http.post(`${environment.API_URL}/create-product`, payload)
    }), map((action)=>{
      return new ShopActions.TryTest
    }))

  constructor(private actions$: Actions, private http: HttpClient) {

  }
}
