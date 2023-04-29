import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Module_info } from 'src/app/shared/models/module.models';
import { ModuleService } from '../../services/module.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.scss']
})
export class ModuleDetailsComponent implements OnInit {

  events=[]
  module$!: Observable<Module_info>
  module!: Module_info
  id!: string|null
  module_subscription: any;

  constructor(private module_service: ModuleService, private route: ActivatedRoute, private toast: ToastrService) {
    this.id=this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.module$=this.module_service.get_module(this.id)
    this.module_subscription=this.module$.subscribe(
      {
        next:(mod)=>{
          this.module=mod
        },
        error:(err)=>{
          console.log({err})
          this.toast.error(err.error.message, "Error")
        }
      }
    )
  }

}
