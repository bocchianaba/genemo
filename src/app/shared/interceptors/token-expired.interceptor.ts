import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenExpiredInterceptor implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router, private toast: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const route = this.injector.get(ActivatedRoute);
    console.log('Current route:', route.snapshot);
    // const url = route.snapshot['_routerState'].url
    return next.handle(request).pipe(
      tap(
        event => {},
        err => {
          if (err.status === 401) {
            // token expired, redirect to login page
            this.router.navigate(['/auth/login',{}]);
            this.toast.info('Votre connexion a expiré',"Expiration")
          }
          if (err.status === 403) {
            // token expired, redirect to login page
            this.router.navigate(['/feature/cities']);
            this.toast.info("Votre rôle ne vous permet pas de faire ce procédé","Accès limité")
          }
        }
      )
    );
  }
}
