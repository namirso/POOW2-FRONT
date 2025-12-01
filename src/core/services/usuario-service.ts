import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { env } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly API_URL = `${env.apiUrl}/usuario`;

  constructor(private http: HttpClient) {}


  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL);
  }


  create(usuario: Usuario): Observable<void> {
    return this.http.post<void>(this.API_URL, usuario);
  }


  update(usuario: Usuario): Observable<void> {
    return this.http.put<void>(this.API_URL, usuario);
  }


  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
