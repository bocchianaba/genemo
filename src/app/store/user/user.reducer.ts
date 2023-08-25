import { load_success, load_failure, load, logout, load_info } from './user.action';
import { createReducer, on } from "@ngrx/store";

const initialState=JSON.parse(localStorage.getItem('currentUser')??'null')||null

export const user_reducer = createReducer(
  initialState,
  on(load_success, (state, payload) => {
    console.log({payload})
    localStorage.setItem("currentUser", JSON.stringify(payload.user))
    localStorage.setItem("id", payload!.user!.id),
    localStorage.setItem("token", state?.user?.accessToken??payload!.user!.accessToken)
    return { ...payload.user }
  }),
  on(load_info, (state, payload) => {
    console.log({payload})
    localStorage.setItem("currentUser", JSON.stringify(payload.user))
    return { ...state,email:payload?.user?.email,username:payload?.user?.username }
  }),
  on(load_failure, (state, payload)=> {
    console.error({error: payload.error})
    return null
  }),
  on(logout, (state)=> {
    localStorage.clear()
    return null
  })
);
