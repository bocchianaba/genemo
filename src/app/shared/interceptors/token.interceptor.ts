import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '../models/user.models';
import { load, load_success } from 'src/app/store/user/user.action';
import { UserService } from 'src/app/user/services/user.service';
import { AutoUnsubscribe } from '../decorators/auto-unsubscribe.decorator';

@AutoUnsubscribe
@Injectable()
export class TokenInterceptor implements HttpInterceptor, OnDestroy {

  user?: User;
  constructor(private store: Store<{user: User}>, private user_service: UserService) {}

  ngOnDestroy(): void {
      
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.store.select('user').subscribe((user)=> {
      this.user=user
      if(!this.user){
        const id=localStorage.getItem("id")
        if(!!id){
          this.user_service.get_user_detail(id).subscribe(user=>{
            this.store.dispatch(load_success({user}))
          })
        }
      }
    })
    const headers= new HttpHeaders().append('Authorization', `Bearer ${this.user?.accessToken??''}`)
    const modified_request=request.clone({ headers })
    return next.handle(modified_request);
  }
}
