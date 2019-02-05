import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if(!this.authService.isAuthenticated()) {
      this.router.navigate(['admin/login']);
      return false;
    } else {
      const token = localStorage.getItem('token');
      const tokenPayload = decode(token);
      if(tokenPayload.role !== 'admin') {
        this.router.navigate(['admin/login']);
        return false;
      }
    }
    return true;
  }

}