import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tipo } from '../models/tipo';
import { env } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class TipoService {
  private readonly API_URL = `${env.apiUrl}/tipo`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(`${this.API_URL}/listar`);
  }

  getById(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.API_URL}/${id}`);
  }

  salvar(tipo: Tipo): Observable<void> {
    return this.http.post<void>(this.API_URL, tipo);
  }

  atualizar(tipo: Tipo): Observable<void> {
    return this.http.put<void>(this.API_URL, tipo);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
