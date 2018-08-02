import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './user.model';

@Injectable()
export class UserService {
  API_URL = 'http://localhost:3000';
  userSelected = new EventEmitter<User>();

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errMsg: string;
    const err = error.message || JSON.stringify(error.error);
    errMsg = `${error.status} - ${error.statusText || ''} Details: ${err}`;
    return throwError(error);
  };


  getUsers() {
    return this.http.get(`${this.API_URL}/users`).pipe(
      catchError(this.handleError)
    );
  }
}
