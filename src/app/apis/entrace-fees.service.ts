import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class EntraceFeesService {
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

  createNewEntraceFee(data: any): Observable<any> {
    return this.http.post<any>(this.apiURL + "/entrace-fee", JSON.stringify(data), this.httpOptions);
  }

  getAllEntraceFees(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/entrace-fee", this.httpOptions);
  }
}
