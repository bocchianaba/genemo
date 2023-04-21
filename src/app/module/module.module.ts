import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleComponent } from './module.component';
import { SharedModule } from '../shared/shared.module';
import { ModuleDetailsComponent } from './components/module-details/module-details.component';


@NgModule({
  declarations: [
    ModuleComponent,
    ModuleDetailsComponent
  ],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    SharedModule
  ]
})
export class ModuleModule { }
