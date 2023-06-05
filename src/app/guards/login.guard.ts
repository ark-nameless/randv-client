import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private authService: AuthService,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let user = this.sessionService.getUser();

    if (this.authService.isLoggedIn()) {
      if (user.access.includes('admin')) this.router.navigate(['/admin']);
      else if (user.access.includes('staff')) this.router.navigate(['/staff']);

      return false;
    }

    return true;
  }

}
