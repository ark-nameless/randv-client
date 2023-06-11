import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiURL = environment.API_URL;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.sessionService.getAccessToken(),
    }),
  };

  constructor(
    private http: HttpClient, 
    private sessionService: SessionService,
    ) {
      
    }

  createNewUser(data: any): Observable<any> {
    return this.http.post<any>(this.apiURL + "/auth/signup", JSON.stringify(data), this.httpOptions);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/auth", this.httpOptions);
  }


  toggleActiveStatus(id: any): Observable<any> {
    return this.http.put<any>(this.apiURL + "/auth/active/" + id, '', this.httpOptions);
  }

  sentForgotPassword(data: any): Observable<any> {
    return this.http.put<any>(this.apiURL + "/auth/password/forgot", JSON.stringify(data), this.httpOptions);
  }

  passwordReset(data: any, token: any): Observable<any> {
    return this.http.put<any>(this.apiURL + "/auth/password/reset/" + token, JSON.stringify(data), this.httpOptions);
  }
}
