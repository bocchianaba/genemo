import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user.models';

export const load = createAction(
  '[LOAD User] start load user',
  props<Partial<{username: string, password: string}>>()
);


export const load_google = createAction(
  '[LOAD User] start load user with Google',
  props<{user: any}>()
);

export const load_success = createAction(
  '[LOAD User] user loaded with Success',
  props<{user: User| null}>()
);

export const load_failure = createAction(
  '[LOAD User] user loaded with Failure',
  props<{error: string}>()
);

export const logout = createAction('[LOGOUT User] Logout user');
