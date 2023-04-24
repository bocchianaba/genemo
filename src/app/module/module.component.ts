import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModuleService } from './services/module.service';
import { Module_list } from '../shared/models/module.models';
import { Observable } from 'rxjs';

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

  constructor(private module_service: ModuleService) { }

  ngOnInit(): void {
    this.modules$=this.module_service.get_all_modules()
    this.subscription=this.modules$.subscribe(
      (module_list)=>{
        console.log({module_list})
      }
    )
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()
  }

}
