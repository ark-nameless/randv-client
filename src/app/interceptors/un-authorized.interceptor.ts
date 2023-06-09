import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, finalize, mergeMap, of, switchMap, take, tap, throwError, windowWhen } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

@Injectable()
export class UnAuthorizedInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
  ) {

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 403) {
          console.log('Access token expired, refreshing token...');
          if (!this.isRefreshing) {
            this.isRefreshing = true;
    
            return this.sessionService.refreshAuthToken().pipe(
              mergeMap((response: any) => {
                // Retry the original request with the new access token
                this.sessionService.saveAccessToken(response.access_token);
                const newAccessToken = this.sessionService.getAccessToken();
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                });
                this.isRefreshing = false;
                return next.handle(request);
              }),
              catchError((err: any) => {
                console.log('Failed to refresh token');
                this.authService.signOut();
                window.location.reload();
                return throwError(err);
              })
            );
          } else {
            // Wait for the token refreshing process to complete and then retry the request
            return this.sessionService.tokenRefreshed.pipe(
              filter((refreshed) => refreshed === true),
              take(1),
              mergeMap(() => {
                const newAccessToken = this.sessionService.getAccessToken();
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                });
                return next.handle(request);
              })
            );
          }
        } else {
          // Forward the error if it's not related to token expiration
          return throwError(error);
        }
      })
    );
  }
}
