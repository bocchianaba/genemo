import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cities, Role, Roles, Town, User, UserPaginate } from 'src/app/shared/models/user.models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  change_user_password(password: string, newPassword: string, id: string): Observable<User> {
    const body={
      credentials: {password, newPassword}
    }
    return this.http.patch<User>(`${environment.backend_url}/users/${id}/credentials`, body)
  }
  get_user_detail(id: string): Observable<User> {
    return this.http.get<User>(`${environment.backend_url}/users/${id}`)
  }
  create_user(username: string, email: string, password: string) {
    const body={username, password, email}
    return this.http.post(`${environment.backend_url}/auth/signup`, body)
  }
  change_user_details(email: string, username: string, id: string): Observable<User> {
    const body={
      details: {
        username,
        email
      }
    }
    return this.http.patch<User>(`${environment.backend_url}/users/${id}/details`, body)
  }

  constructor(private http: HttpClient) { }

  get_users_list(page=1,limit=5): Observable<UserPaginate>{
    return this.http.get<UserPaginate>(`${environment.backend_url}/users?page=${page}&limit=${limit}`)
  }
  get_roles_list():Observable<Roles>{
    return this.http.get<Roles>(`${environment.backend_url}/roles`)
  }
  get_cities_list():Observable<Cities>{
    return this.http.get<Cities>(`${environment.backend_url}/regions`)
  }
  
  assign_roles(id: string | undefined, roles_modified: Role[]) {
    const body={
      assignRole:{
        roles: roles_modified.map(role=>role._id)
      }
    }
    return this.http.patch(`${environment.backend_url}/users/${id}/assignRole`, body)
  }

  
  unassign_roles(id: string | undefined, roles_to_unassign: Role[]) {
    const body={
      unassignRole:{
        roles: roles_to_unassign.map(role=>role._id)
      }
    }
    return this.http.patch(`${environment.backend_url}/users/${id}/unassignRole`, body)
  }
  
  assign_cities(id: string | undefined, cities_modified: string[]) {
    const body={
      assignTown:{
        towns: cities_modified
      }
    }
    return this.http.patch(`${environment.backend_url}/users/${id}/assignTown`, body)
  }
  update_user(id:string, username:string, email:string){
    console.log({id, username, email})
    const body={
      details: {
        username,
        email
      }
    }
    return this.http.patch(`${environment.backend_url}/users/${id}/details`,body)
  }
  
  get_unassigned_roles_list(id:string): Observable<Roles> {
    return this.http.get<Roles>(`${environment.backend_url}/roles/roleToAssign?idUser=${id}&page=1&limit=100`)
  }
  get_assigned_roles_list(): Observable<Roles> {
    throw new Error('Method not implemented.');
  }
}
