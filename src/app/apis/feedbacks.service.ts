import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbacksService {
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
  
  getAllReviews(): Observable<any> {
    return this.http.get(this.apiURL + '/reviews', this.httpOptions);
  }
  createNewReview(data: any): Observable<any> {
    return this.http.post(this.apiURL + '/reviews', JSON.stringify(data), this.httpOptions);
  }
  reviewReviewed(id: any): Observable<any> {
    return this.http.put(this.apiURL + '/reviews/' + id, '', this.httpOptions);
  }

  getAllComments(): Observable<any> {
    return this.http.get(this.apiURL + '/comments', this.httpOptions);
  }
  createNewComment(data: any): Observable<any> {
    return this.http.post(this.apiURL + '/comments', JSON.stringify(data), this.httpOptions);
  }
  commentReviewed(id: any): Observable<any> {
    return this.http.put(this.apiURL + '/comments/' + id, '', this.httpOptions);
  }
}
