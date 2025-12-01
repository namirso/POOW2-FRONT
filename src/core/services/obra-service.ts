import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Obra } from '../models/obra';
import { env } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class ObraService {
  private readonly API_URL = `${env.apiUrl}/obra`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Obra[]> {
    return this.http.get<Obra[]>(`${this.API_URL}/listar`);
  }

  salvar(obra: Obra): Observable<void> {
    return this.http.post<void>(this.API_URL, obra);
  }

  atualizar(obra: Obra): Observable<void> {
    return this.http.put<void>(this.API_URL, obra);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
