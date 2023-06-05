import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionService } from '../services/session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
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
    ) { }
  


  createNewPackage(data: any): Observable<any> {
    console.log(this.sessionService.getAccessToken());
    return this.http.post<any>(this.apiURL + "/package", JSON.stringify(data), this.httpOptions);
  }
}
