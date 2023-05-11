import { Injectable } from '@angular/core';
import {environment} from './../../../environments/environment'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataRequired, Module, Module_info, Modules_Paginate } from 'src/app/shared/models/module.models';
import { Data } from 'src/app/shared/models/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  get_module_trames(id: string | null, from?: Date, at?: Date): Observable<DataRequired[]>{
    if(from && at)
    return this.http.get<DataRequired[]>(`${environment.backend_url}/modules/${id}/trames?from=${from}&at=${at}`)
    else if(from)
    return this.http.get<DataRequired[]>(`${environment.backend_url}/modules/${id}/trames?from=${from}`)
    else if(at)
    return this.http.get<DataRequired[]>(`${environment.backend_url}/modules/${id}/trames?at=${from}`)
    else
    return this.http.get<DataRequired[]>(`${environment.backend_url}/modules/${id}/trames`)
  }
  get_simple_module(id: string | null): Observable<Module_info> {
    return this.http.get<Module_info>(`${environment.backend_url}/modules/${id}`)
  }
  search_by_name(search_name: string):Observable<Modules_Paginate> {
    return this.http.get<Modules_Paginate>(`${environment.backend_url}/modules?name=${search_name}`)
  }
  get_module(id: string | null): Observable<Modules_Paginate> {
    return this.http.get<Modules_Paginate>(`${environment.backend_url}/modules/${id}/data`)
  }
  get_all_modules(page=1,limit=10, search_name=''): Observable<Modules_Paginate> {
    return this.http.get<Modules_Paginate>(`${environment.backend_url}/modules?page=${page}&limit=${limit}&name=${search_name}`)
  }

  constructor(private http: HttpClient) { }
}
