import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, catchError, throwError, filter, switchMap, take, concatMap, finalize } from 'rxjs';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private refreshingToken: boolean = false;
  private tokenRefreshedSubject: BehaviorSubject<boolean | void> = new BehaviorSubject<boolean | void>(false);
  public tokenRefreshed: Observable<boolean | void> = this.tokenRefreshedSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient
    ) { }

  clearSession(): void {
    window.sessionStorage.clear();
  }

  public saveAccessToken(token: string): void {
    window.sessionStorage.removeItem(ACCESS_TOKEN);
    window.sessionStorage.setItem(ACCESS_TOKEN, token);

    const user = this.getUser();

    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public getAccessToken(): string | null {
    return window.sessionStorage.getItem(ACCESS_TOKEN);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN);
    window.sessionStorage.setItem(REFRESH_TOKEN, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }

  refreshToken(): Observable<void> {
    let config = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer ' + this.getRefreshToken(),
      })
    };
  
    console.log('will try to refresh token');
  
    if (this.refreshingToken) {
      // If already refreshing, return the existing tokenRefreshed observable
      return this.tokenRefreshed.pipe(
        filter((refreshed) => refreshed === true),
        take(1),
        switchMap(() => new Observable<void>(() => {}))
      );
    }
  
    // Set refreshingToken flag to true
    this.refreshingToken = true;
  
    console.log('trying to refresh token');
  
    // Make an API request to refresh the access token using the refresh token
    return this.http.get<any>(environment.API_URL + '/token/refresh', config).pipe(
      tap((response) => {
        // Update the access token and notify the interceptor
        console.log(response);
        this.saveAccessToken(response.access_token);
        this.tokenRefreshedSubject.next(true);
      }),
      finalize(() => {
        // Set refreshingToken flag to false after token is refreshed or in case of an error
        this.refreshingToken = false;
      }),
      switchMap(() =>
        this.tokenRefreshedSubject.pipe(
          filter((value) => value === true),
          take(1),
          switchMap(() => new Observable<void>(() => {}))
        )
      ),
      catchError((error) => {
        // Handle refresh token error and propagate it
        // You might want to redirect to the login page or perform some other action
        // based on the specific error scenario
        
        // Set refreshingToken flag to false in case of error
        this.refreshingToken = false;
        
        return throwError(error);
      })
    );
  }

  public refreshAuthToken() {
    let config = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer ' + this.getRefreshToken(),
      })
    }
    return this.http.get(environment.API_URL + '/token/refresh', config);
  }
  
}
