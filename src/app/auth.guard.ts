import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('angular18Token');
    if (token) {
      return true;  // accès autorisé si token présent
    } else {
      this.router.navigate(['/login']);  // sinon redirection vers login
      return false;
    }
  }
}

