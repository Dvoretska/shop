import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  API_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public getToken(): string {
    return localStorage.getItem('token');
  }

  private handleError(error: HttpErrorResponse) {
    let errMsg: string;
    const err = error.message || JSON.stringify(error.error);
    errMsg = `${error.status} - ${error.statusText || ''} Details: ${err}`;
    return throwError(error);
  };

  signupUser(email: string, password: string) {
    return this.http.post(`${this.API_URL}/register`,
      {email: email, password: password}).pipe(
        catchError(this.handleError)
    )
  }
  loginUser(email: string, password: string) {
    return this.http.post(`${this.API_URL}/login`,
      {email: email, password: password}).pipe(
        catchError(this.handleError)
    )
  }
}
