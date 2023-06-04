import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions = { 
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient, private tokenStorage: SessionService) {
  }

  login(username: string, password: string): Observable<any>{
      return this.http.post(environment.API_URL + '/auth/login', {
          username, 
          password 
      }, this.httpOptions)
  }

  signOut(): void {
    this.tokenStorage.clearSession();
  }

  public isLoggedIn(): boolean {
    const user = this.tokenStorage.getUser();
    if (Object.keys(user).length !== 0) {
      return true;
    }
    return false;
  }

  checkVerifyToken(token: string) {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }) 
    }
    return this.http.get(environment.API_URL + '/auth/verify-token/' + token, httpOptions)
  }
}
