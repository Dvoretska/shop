import { Action } from '@ngrx/store';
import {HttpErrorResponse} from "@angular/common/http";


export const EFFECT_ERROR = 'EFFECT_ERROR';

export class LoadError implements Action {
  readonly type = EFFECT_ERROR;

  constructor(public payload: HttpErrorResponse) {}
}

export default LoadError;
