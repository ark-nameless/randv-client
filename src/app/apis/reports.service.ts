import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
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
  


  getAddressSales(start: any, end: any): Observable<any> {
    return this.http.get<any>(this.apiURL + `/reports/address/${start}/${end}`, this.httpOptions);
  }

  getReservationSales(start: any, end: any): Observable<any> {
    return this.http.get<any>(this.apiURL + `/reports/reservations/${start}/${end}`, this.httpOptions);
  }

  getYearlySales(year: any) {
    return this.http.get<any>(this.apiURL + `/reports/sales/${year}`, this.httpOptions);
  }
}
