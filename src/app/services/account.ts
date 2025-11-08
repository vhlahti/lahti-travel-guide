import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subject, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class Account {
  private apiUrl = 'http://localhost:3000/api/users'; // temp URL for local development
  private tokenKey = 'auth_token';
  private jwtHelper = new JwtHelperService();

  private loggedIn$ = new BehaviorSubject<boolean>(this.isAuthenticated()); // Tracks whether user is logged in
  private user$ = new BehaviorSubject<any | null>(null); // Store and share current user info
  private logoutEvent$ = new Subject<void>(); // Emits when the user logs out
  private loginEvent$ = new Subject<void>();

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
        this.loginEvent$.next();

        // After login, fetch profile data automatically
        this.fetchProfile().subscribe();
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.loggedIn$.next(false);
    this.user$.next(null); // Clear user info
    this.logoutEvent$.next(); // Emit logout event
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn$.asObservable();
  }

  getLogout$() {
    return this.logoutEvent$.asObservable();
  }

  getLogin$() {
    return this.loginEvent$.asObservable();
  }

  fetchProfile(): Observable<any> {
  const token = this.getToken();
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      console.warn('Token missing or expired — skipping profile fetch.');
      return of(null); // prevents unnecessary backend call
    }

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

  isTokenExpired(): boolean {
    const token = this.getToken();
    return !token || this.jwtHelper.isTokenExpired(token);
  }

}