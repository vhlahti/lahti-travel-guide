import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class Account {
  private apiUrl = 'http://localhost:3000/api/users'; // temp URL for local development
  private tokenKey = 'auth_token';

  // Tracks whether user is logged in
  private loggedIn$ = new BehaviorSubject<boolean>(this.isAuthenticated());

  // Store and share current user info
  private user$ = new BehaviorSubject<any | null>(null);

  constructor(private http: HttpClient) { }

  register(username: string, password: string, confirmPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { username, password, confirmPassword });
  }

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((res) => {
        // Save JWT
        localStorage.setItem(this.tokenKey, res.token);
        this.loggedIn$.next(true);

        // After login, fetch profile data automatically
        this.fetchProfile().subscribe();
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn$.next(false);
    this.user$.next(null); // Clear user info
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  fetchProfile(): Observable<any> {
  const token = this.getToken();
  if (!token) return new Observable();

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
  });

  return this.http.get(`${this.apiUrl}/profile`, { headers }).pipe(
    tap((user) => this.user$.next(user))
  );
  }

  // Expose user observable for components to subscribe to
  getUser(): Observable<any | null> {
    return this.user$.asObservable();
  }

}