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

  createNewPackageReservation(data: any): Observable<any> {
    return this.http.post<any>(this.apiURL + "/reservation/package", JSON.stringify(data), this.httpOptions);
  }

  checkReservationAvailability(data: any): Observable<any> {
    return this.http.post<any>(this.apiURL + "/reservation/check", JSON.stringify(data), this.httpOptions);
  }

  getAllReservations(): Observable<any> {
    return this.http.get<any>(this.apiURL + "/reservation", this.httpOptions);
  }

  getReservation(id: any): Observable<any> {
    return this.http.get<any>(this.apiURL + "/reservation/" + id, this.httpOptions);
  }

  checkIn(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.apiURL + '/reservation/checkin/' + id, JSON.stringify(data), this.httpOptions)
  }

  checkOut(id: any): Observable<any> {
    return this.http.put<any>(this.apiURL + '/reservation/checkout/' + id, '', this.httpOptions)
  }

  togglePaid(id: any): Observable<any> {
    return this.http.put<any>(this.apiURL + '/reservation/paid/toggle' + id, '', this.httpOptions)
  }

  cancelReservation(id: any, data: any): Observable<any> {
    return this.http.put<any>(this.apiURL + '/cancel/status/' + id, JSON.stringify(data), this.httpOptions)
  }

  checkIfValidReservationId(id: any): Observable<any> {
    return this.http.get<any>(this.apiURL + '/reservation/valid/' + id, this.httpOptions);
  }

  sendCancellationRequest(data: any): Observable<any> {
    return this.http.post<any>(this.apiURL + '/cancel', JSON.stringify(data), this.httpOptions)
  }

  getAllCancellationRequest(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/cancel', this.httpOptions);
  }

  getActionableCancelRequest(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/cancel/actionable', this.httpOptions);
  }

  setPayment(data: any, id: any): Observable<any> {
    return this.http.put<any>(this.apiURL + '/reservation/payment/' + id, JSON.stringify(data), this.httpOptions);
  }

}
