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
    return this.http.post<any>(this.apiURL + "/package", JSON.stringify(data), this.httpOptions);
  }

  getAllPackages(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/package", this.httpOptions);
  }

  getPackage(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + "/package/" + id, this.httpOptions);
  }
}
