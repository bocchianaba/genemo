import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user!:User
  constructor(private store: Store<{user: User}>, private router: Router){
    this.store.select('user').subscribe(usr=>this.user=usr)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(!this.user) this.router.navigateByUrl('/login')
      return !!this.user;
  }
  
}
