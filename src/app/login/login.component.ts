import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Constant } from '../constant';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  user: any = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  encriptData(data: string) {
    return CryptoJS.AES.encrypt(data, Constant.EN_KEY).toString();
  }

  onLogin() {
    console.log('Sending login data:', this.user);

    this.http.post('http://localhost:8084/api/v1/auth/authenticate', this.user)
      .subscribe({
        next: (res: any) => {
          console.log('Backend response:', res);

          if (res.access_token) {
            alert('Login Success');
            const enrUserName = this.encriptData(this.user.email);
            localStorage.setItem('uName', enrUserName);
            localStorage.setItem('angular18Token', res.access_token);
            this.router.navigateByUrl('event');
          } else {
            alert('Identifiants incorrects.');
          }
        },
        error: (err) => {
          console.error('Login error', err);
          alert('Erreur lors de la connexion au serveur.');
        }
      });
  }
}
