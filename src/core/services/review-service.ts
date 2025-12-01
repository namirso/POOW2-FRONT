import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { env } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly API_URL = `${env.apiUrl}/review`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.API_URL}/listar`);
  }

  salvar(review: Review): Observable<void> {
    return this.http.post<void>(this.API_URL, review);
  }

  atualizar(review: Review): Observable<void> {
    return this.http.put<void>(this.API_URL, review);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
