import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, finalize, of, switchMap, take, tap, throwError } from 'rxjs';
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

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Add the access token to the request headers
    const accessToken = this.sessionService.getAccessToken();
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 && error.error.detail.search('validate credentials') != -1) {
          // Access token expired, try to refresh the token
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            return this.sessionService.refreshAuthToken().pipe(
              switchMap(() => {
                // Retry the original request with the new access token
                const newAccessToken = this.sessionService.getAccessToken();
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                });
                this.isRefreshing = false;
                return next.handle(request);
              }),
              catchError((refreshError) => {
                // Refresh token failed or invalid, redirect to login page or handle accordingly
                this.authService.signOut();
                this.isRefreshing = false;
                return throwError(refreshError);
              })
            );
          } else {
            // Wait for the token refreshing process to complete and then retry the request
            return this.sessionService.tokenRefreshed.pipe(
              switchMap(() => {
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
