import { Injectable } from '@angular/core';
import {environment} from './../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module_info, Module_list } from 'src/app/shared/models/module.models';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  get_module(id: string | null): Observable<Module_info> {
    return this.http.get<Module_info>(`${environment.backend_url}/modules/${id}`)
  }
  get_all_modules(): Observable<Module_list> {
    return this.http.get<Module_list>(`${environment.backend_url}/modules`)
  }

  constructor(private http: HttpClient) { }
}
