import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleComponent } from './module.component';
import { SharedModule } from '../shared/shared.module';
import { ModuleDetailsComponent } from './components/module-details/module-details.component';
import { EventComponent } from './components/event/event.component';
import { ModuleService } from './services/module.service';

import { ToastrService } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';
import { ModuleItemComponent } from './components/module-item/module-item.component';

@NgModule({
  declarations: [
    ModuleComponent,
    ModuleDetailsComponent,
    EventComponent,
    ModuleItemComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    SharedModule,
    NgChartsModule
  ],
  providers:[
    ModuleService,
    ToastrService
  ]
})
export class ModuleModule { }
