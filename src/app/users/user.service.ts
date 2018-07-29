import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';

// export interface User {
//   id: number;
//   email: string;
//   password_digest: string;
//   image: any;
//   role_id: {
//     id: number,
//     role: string
//   }
// }

@Injectable()
export class UserService {
  API_URL = 'http://localhost:3000';

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
