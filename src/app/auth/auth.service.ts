import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  };

  signupUser(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/register`,
      {email: email, password: password}).pipe(
        catchError(this.handleError)
    )
  }

  loginUser(email: string, password: string) {
    return this.http.post(`${environment.API_URL}/login`,
      {email: email, password: password}).pipe(
        catchError(this.handleError)
    )
  }

  tokenVerify() {
    return this.http.get(`${environment.API_URL}/token-verify`).pipe(
      catchError(this.handleError)
    )
  }

  isAuthenticated() {
    let token = JSON.parse(localStorage.getItem('token'));
    return !!token;
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getUserImage() {
    const user = JSON.parse(localStorage.getItem('user'));
    let imageUrl = 'src/assets/default-picture_0_0.png';
    if(user && user.image) {
      imageUrl = user.image;
    }
    return imageUrl;
  }

  getUsername() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.email) {
      return user.email.substring(0, user.email.lastIndexOf('@'));
    } else {
      return '';
    }
  }

  getUserRole() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.role) {
      return user.role;
    } else {
      return 'user'
    }
  }
}
