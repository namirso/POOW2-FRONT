import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { env } from '../../environment/environment';
import { TokenResponse } from '../models/usuario'; // Importe a interface nova
import { tap } from 'rxjs'; // Importante para side-effects

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly API_URL = `${env.apiUrl}/login`;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {}

  login(login: string, senha: string) {
    return this.httpClient.post<TokenResponse>(this.API_URL, { login, senha })
      .pipe(
        tap((response) => {
          this.setToken(response.token);
        })
      );
  }

  setToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}
