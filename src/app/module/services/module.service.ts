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
  get_module(id: string | null): Observable<Data<Module>> {
    return this.http.get<Data<Module>>(`${environment.backend_url}/modules/${id}/data`)
  }
  get_all_modules(page=1,limit=10): Observable<Module_list> {
    return this.http.get<Module_list>(`${environment.backend_url}/modules?page=${page}&limit=${limit}`)
  }

  constructor(private http: HttpClient) { }
}
