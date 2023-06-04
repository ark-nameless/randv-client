import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private http: HttpClient) { }

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

  public refreshToken() {
    let config = {
      headers: new HttpHeaders({
        'accept': 'application/json',
        'Authorization': 'Bearer ' + this.getRefreshToken(),
      })
    }

    return this.http.post(environment.API_URL + '/auth/refresh', {}, config).subscribe((data) => {
      let json_data = JSON.parse(JSON.stringify(data));
      this.saveAccessToken(json_data.access_token)
    })
  }
}
