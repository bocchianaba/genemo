import { AuthService } from './../../auth/services/auth.service';
import { Inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as user_action from './user.action';
import { EMPTY, catchError, exhaustMap, map, mergeMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserEffect {
  constructor(@Inject(Actions) private actions$: Actions, private auth_service: AuthService, private toast: ToastrService) {}

  load_user$ = createEffect(
    ()=>this.actions$.pipe(
      ofType(user_action.load),
      exhaustMap((action)=> {
        console.log({action})
        return this.auth_service.login(action?.username??'', action?.password??'').pipe(
            map(
                (user: any)=> {
                  console.log({user})
                  return user_action.load_success({user})
                }
            ),
            catchError((error)=> {
                console.error(error)
                this.toast.error("Vos identifiants sont incorrectes !", "Erreur")
                this.toast.error("Réessayer !")
                user_action.load_failure({error: error?.error?.message})
                return EMPTY
            })
            )
        })
    )
  )
}
