import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleComponent } from './module.component';
import { SharedModule } from '../shared/shared.module';
import { ModuleDetailsComponent } from './components/module-details/module-details.component';
import { EventComponent } from './components/event/event.component';
import { ModuleService } from './services/module.service';

import { ToastrService } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';
import { ModuleItemComponent } from './components/module-item/module-item.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { CamerounDatePipe } from '../shared/pipes/cameroun-date.pipe';

const config: SocketIoConfig = { url: environment.backend_socket_url, options: {} };

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
    NgChartsModule,
    NgbDatepickerModule,
    SocketIoModule.forRoot(config)
  ],
  providers:[
    ModuleService,
    ToastrService,
    CamerounDatePipe
  ]
})
export class ModuleModule { }
