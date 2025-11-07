import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class Favorites {
  private apiUrl = 'http://localhost:3000/api/users'; // temp for local development

  constructor(private http: HttpClient, private auth: Account) {}

  addFavorite(itemId: string): Observable<any> {
  const token = this.auth.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.post(`${this.apiUrl}/favorites/${itemId}`, {}, { headers });
  }

  removeFavorite(itemId: string): Observable<any> {
    const token = this.auth.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete(`${this.apiUrl}/favorites/${itemId}`, { headers });
  }

  getFavorites(): Observable<string[]> {
  const token = this.auth.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http
    .get<{ favorites: string[] }>(`${this.apiUrl}/favorites`, { headers })
    .pipe(map(res => res.favorites));
  }
}