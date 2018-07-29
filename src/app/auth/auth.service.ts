import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, ReplaySubject, from, of, range } from 'rxjs';
import { map, filter, catchError } from 'rxjs/operators';

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
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(`${this.API_URL}/register`,
      {email: email, password: password}, httpOptions).pipe(
        catchError(this.handleError)
    )
  }
  loginUser(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post(`${this.API_URL}/login`,
      {email: email, password: password}, httpOptions).pipe(
        catchError(this.handleError)
    )
  }
}
