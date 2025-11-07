import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class Favorites {
  private apiUrl = 'http://localhost:3000/api/users'; // temp for local development
  private favorites$ = new BehaviorSubject<string[]>([]);

  constructor(private http: HttpClient, private auth: Account) {}

  // Helper: Build auth headers
  private getAuthHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  // Load favorites from backend and update subject
  loadFavorites(): void {
    this.http
      .get<{ favorites: string[] }>(`${this.apiUrl}/favorites`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        catchError((err) => {
          console.error('Error loading favorites:', err);
          this.favorites$.next([]); // Prevent stale state
          return of({ favorites: [] });
        })
      )
      .subscribe((res) => {
        this.favorites$.next(res.favorites || []);
        console.log('Favorites loaded from backend:', res.favorites);
      });
  }

  // Reactive stream for all components
  getFavorites$(): Observable<string[]> {
    return this.favorites$.asObservable();
  }

  // Add favorite (updates both backend and local BehaviorSubject)
  addFavorite(itemId: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/favorites/${itemId}`, {}, { headers: this.getAuthHeaders() })
      .pipe(
        tap(() => {
          const current = this.favorites$.value;
          if (!current.includes(itemId)) {
            const updated = [...current, itemId];
            this.favorites$.next(updated);
            console.log('Added favorite:', itemId);
          }
        }),
        catchError((err) => {
          console.error('Error adding favorite:', err);
          return of(err);
        })
      );
  }

  // Remove favorite (updates both backend and local BehaviorSubject)
  removeFavorite(itemId: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/favorites/${itemId}`, { headers: this.getAuthHeaders() })
      .pipe(
        tap(() => {
          const updated = this.favorites$.value.filter(id => id !== itemId);
          this.favorites$.next(updated);
          console.log('Removed favorite:', itemId);
        }),
        catchError((err) => {
          console.error('Error removing favorite:', err);
          return of(err);
        })
      );
  }

  // Optional one-time fetch helper (not reactive)
  getFavorites(): Observable<string[]> {
    return this.http
      .get<{ favorites: string[] }>(`${this.apiUrl}/favorites`, {
        headers: this.getAuthHeaders(),
      })
      .pipe(
        map(res => res.favorites || []),
        catchError(() => of([]))
      );
  }
  
}