import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private sessionService: SessionService,
    private authService: AuthService,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const role = route.parent!.data['expectedRole'];
    let user = this.sessionService.getUser();

    console.log(role);
    console.log(user);

    if (Object.keys(user).length == 0) {
      this.router.navigate(['login']);
    }

    var hasRole = false;
    user.access.forEach((r: any) => {
      hasRole = hasRole || role.includes(r);
      // console.log(role.indexOf(r) == -1);
      // console.log(`${role} == ${r}`);
    });

    // console.log(Object.keys(user).length == 0)
    // console.log(hasRole)

    if (hasRole == false) {
      this.router.navigate(['login']);
    }
    return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }

}
