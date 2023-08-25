import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    console.log({username, password})
    return this.http.post(`${environment.backend_url}/auth/signin`, {username, password})
  }
}
