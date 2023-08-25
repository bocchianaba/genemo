import { AuthService } from './../../auth/services/auth.service';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as user_action from './user.action';
import { EMPTY, catchError, exhaustMap, map, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEffect {
  constructor(@Inject(Actions) private actions$: Actions, private auth_service: AuthService) {}

  load_user$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(user_action.load),
      exhaustMap((action)=> {
        console.log({action})
        return this.auth_service.login(action?.username??'', action?.password??'').pipe(
            map(
                (user: any)=> user_action.load_success({user})
            ),
            catchError((error)=> {
                console.error(error)
                return EMPTY
            })
            )
        })
    )
  )
}
