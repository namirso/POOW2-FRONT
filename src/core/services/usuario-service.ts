import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario'; // ajuste o caminho
import { env } from '../../environment/environment'; // ajuste o caminho

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // A URL base é apenas /usuario, sem barras no final
  private readonly API_URL = `${env.apiUrl}/usuario`;

  constructor(private http: HttpClient) {}

  // @GetMapping()
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API_URL);
  }

  // @PostMapping() -> Retorna void
  create(usuario: Usuario): Observable<void> {
    return this.http.post<void>(this.API_URL, usuario);
  }

  // @PutMapping() -> Retorna void e espera o objeto com ID no corpo
  update(usuario: Usuario): Observable<void> {
    return this.http.put<void>(this.API_URL, usuario);
  }

  // @DeleteMapping("/{id}")
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
