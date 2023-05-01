import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModuleService } from './services/module.service';
import { Module_list } from '../shared/models/module.models';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit, OnDestroy {

  title = 'generator-manager';
  display: string='card'
  modules$!: Observable<Module_list>
  subscription: any;
  loading: boolean=false;
  module_list!: Module_list;
  limit=6
  search_name=""

  constructor(
    private module_service: ModuleService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.loading=true
    this.loader.startBackground()
    this.modules$=this.module_service.get_all_modules(1,this.limit)
    this.subscription=this.modules$.subscribe({
        next:(module_list)=>{
          console.log({module_list})
          this.module_list=module_list
          this.loading=false
        },
        error:(err)=>{
          console.log({err})
          this.toast.error(err.error.message)
        },
        complete: ()=>{
          this.loader.stopBackground()
        }
      }
    )
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()
  }
  page_change(page:number){
    this.loading=true
    this.loader.startBackground()
    this.subscription.unsubscribe()
    this.subscription=this.module_service.get_all_modules(page,this.limit,this.search_name).subscribe({
      next:(module_list)=>{
        this.module_list=module_list
      },
      error:(err)=>{
        console.log({err})
        this.toast.error(err.error.message)
      },
      complete: ()=>{
        this.loader.stopBackground()
        this.loading=false
      }
    })
  }
  search_module(){
    this.loading=true
    this.loader.startBackground()
    this.subscription=this.module_service.search_by_name(this.search_name).subscribe({
      next:(module_list)=>{
        this.module_list=module_list
      },
      error:(err)=>{
        console.log({err})
        this.toast.error(err.error.message)
      },
      complete: ()=>{
        this.loader.stopBackground()
        this.loading=false
      }
    })
  }
}
