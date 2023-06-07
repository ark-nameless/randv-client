import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
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

  createNewIndividualReservation(data: any): Observable<any> {
    return this.http.post<any>(this.apiURL + "/reservation/individual", JSON.stringify(data), this.httpOptions);
  }

  getAllReservations(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/reservation", this.httpOptions);
  }
}