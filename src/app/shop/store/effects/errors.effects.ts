import {Actions, Effect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import * as ErrorsActions from '../actions/errors.actions';
import { map, switchMap} from 'rxjs/operators';
import { of } from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";


@Injectable()
export class ErrorsEffects {

  constructor(private actions$: Actions, private http: HttpClient, private toastr: ToastrService) {}

  @Effect()
  onLoadError = this.actions$
    .pipe(
      ofType(ErrorsActions.EFFECT_ERROR),
      map((action: ErrorsActions.LoadError) => action.payload),
      switchMap((payload) => {
        let error = payload;
        if (error instanceof HttpErrorResponse) {
          // Server or connection error happened
          if (!navigator.onLine) {
            // Handle offline error
            this.toastr.error('No Internet Connection.');
          } else if(error.status == 500 && !error.error.message) {
             this.toastr.error(`Something went wrong. Try again later.`);
          } else if(error.status == 0) {
            this.toastr.error(`Something went wrong. Try again later.`);
          } else if(error.status == 404 && !error.error.message) {
             this.toastr.error(`${error.status} - Not found.`);
          } else if(error.error.message) {
             this.toastr.error(`${error.error.message}`);
          } else {
            this.toastr.error(`${error.status} - ${error.statusText}`);
          }
        }
        return of();
      })
    )

}
