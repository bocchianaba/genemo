import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModuleService } from './services/module.service';
import { Observable, distinctUntilChanged, map, shareReplay, take, takeLast } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Module, Module_info, Modules_Paginate } from '../shared/models/module.models';
import { Data } from '../shared/models/pagination.model';
import { Socket } from 'ngx-socket-io';
import { AutoUnsubscribe } from '../shared/decorators/auto-unsubscribe.decorator';
import { Data_socket } from '../shared/models/module-socket.models';

@AutoUnsubscribe
@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
  styles:[
    `
    .my-custom-class .tooltip-inner {
				background-color: darkgreen;
				font-size: 125%;
			}
			.my-custom-class.bs-tooltip-end .tooltip-arrow::before {
				border-right-color: darkgreen;
			}
			.my-custom-class.bs-tooltip-start .tooltip-arrow::before {
				border-left-color: darkgreen;
			}
			.my-custom-class.bs-tooltip-top .tooltip-arrow::before {
				border-top-color: darkgreen;
			}
			.my-custom-class.bs-tooltip-bottom .tooltip-arrow::before {
				border-bottom-color: darkgreen;
			}
    `
  ]
})
export class ModuleComponent implements OnInit, OnDestroy {

  title = 'generator-manager';
  display: string='list'
  modules$!: Observable<Modules_Paginate>
  subscription: any;
  loading: boolean=true;
  module_list!: Modules_Paginate;
  limit=6
  search_name=""

  constructor(
    private module_service: ModuleService,
    private loader: NgxUiLoaderService,
    private toast: ToastrService,
    private socket: Socket
  ) { }

  ngOnInit(): void {
    this.loader.startBackground()
    this.modules$=this.module_service.get_all_modules(1,this.limit)
    this.subscription=this.modules$.subscribe({
        error:(err)=>{
          this.toast.error(err.error.message)
        },
        complete: ()=>{
          this.loader.stopBackground()
          this.loading=false
        }
      }
    )
    this.socket.on("incomingTrame",(data: Data_socket)=>{
      console.log("trame event",{data})
      this.modules$=this.modules$.pipe(
        takeLast(1),
        map((module: Modules_Paginate)=>{
          const mod=module.modules.find((module)=>module.id==data.trame.idModule)
          console.log({mod})
          if(mod) {
            this.toast.info("Le module "+mod.stationName+" vient d'envoyer une trame")
            mod.lastInfoTrame={...data.trame, date:data.trame.date, id: data.trame._id, idModule:data.trame.idModule}
          }
          else if(module.pagination.page==1){
            module.modules.unshift({
              id: data.trame.idModule,
              stationName: data.module.stationName,
              position: { lat: '', long: '' },
              status: data.module.status,
              elapse: data.module.elapse,
              elapse_total: data.module.elapse_total,
              lastInfoTrame: { ...data.trame, id: data.trame._id }
            })
            module.modules.slice(0,10)
          }
          else{
            this.toast.info("Un nouveau module nommé "+data.module.stationName+" vient d'être ajouté !")
          }
          return module
        }),
        distinctUntilChanged(),
        shareReplay(1)
      )
    })
    this.socket.on("vidangeCreated", (data: Module)=>{
      // alert("vidange créer")
      console.log({data})
      this.modules$=this.modules$.pipe(
        map((module: Modules_Paginate)=>{
          let mod=module.modules.find((module)=>module.stationName==data.stationName)
          if(mod) {
            this.toast.info("Le module "+data.stationName+" est en pleine vidange !")
            mod=data
          }
          return module
        }),
        shareReplay(1)
      )
    })
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()
    this.socket.off("incomingTrame")
    this.socket.off("vidangeCreated")
  }
  page_change(page:number){
    this.loading=true
    this.loader.startBackground()
    this.subscription.unsubscribe()
    this.modules$=this.module_service.get_all_modules(page,this.limit,this.search_name)
    this.modules$.subscribe({
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
    this.modules$=this.module_service.search_by_name(this.search_name)
    this.modules$.subscribe({
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
