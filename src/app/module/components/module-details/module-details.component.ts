import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Module_info } from 'src/app/shared/models/module.models';
import { ModuleService } from '../../services/module.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-details',
  templateUrl: './module-details.component.html',
  styleUrls: ['./module-details.component.scss']
})
export class ModuleDetailsComponent implements OnInit {

  events=[]
  module$!: Observable<Module_info>
  id!: string|null

  constructor(private module_service: ModuleService, private route: ActivatedRoute) {
    this.id=this.route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.module$=this.module_service.get_module(this.id)
  }

}
