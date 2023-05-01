import { Injectable } from '@angular/core';
import {environment} from './../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Module, Module_info, Module_list } from 'src/app/shared/models/module.models';
import { Data } from 'src/app/shared/models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  get_simple_module(id: string | null): Observable<Module_info> {
    return this.http.get<Module_info>(`${environment.backend_url}/modules/${id}`)
  }
  search_by_name(search_name: string) {
    return this.http.get<Module_list>(`${environment.backend_url}/modules?name=${search_name}`)
  }
  get_module(id: string | null): Observable<Data<Module>> {
    return this.http.get<Data<Module>>(`${environment.backend_url}/modules/${id}/data`)
  }
  get_all_modules(page=1,limit=10, search_name=''): Observable<Module_list> {
    return this.http.get<Module_list>(`${environment.backend_url}/modules?page=${page}&limit=${limit}&name=${search_name}`)
  }

  constructor(private http: HttpClient) { }
}
