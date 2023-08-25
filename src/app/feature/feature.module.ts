import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { UserComponent } from '../user/user.component';
import { ModuleComponent } from '../module/module.component';
import { ModuleDetailsComponent } from '../module/components/module-details/module-details.component';
import { EventComponent } from '../module/components/event/event.component';
import { ModuleItemComponent } from '../module/components/module-item/module-item.component';
import { NgbDatepickerModule, NgbPaginationModule, NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectModule } from 'primeng/multiselect';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog'
import { CamerounDatePipe } from '../shared/pipes/cameroun-date.pipe';
import { BannerComponent } from '../shared/components/banner/banner.component';
import { ModuleService } from '../module/services/module.service';
import { ToastrService } from 'ngx-toastr';
import { NgChartsModule } from 'ng2-charts';
import { TableComponent } from '../shared/components/svg/table/table.component';
import { RunningComponent } from '../shared/components/svg/running/running.component';
import { SleepComponent } from '../shared/components/svg/sleep/sleep.component';
import { TruncateTextPipe } from '../shared/pipes/truncate-text.pipe';
import { AuthService } from '../auth/services/auth.service';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { PasswordModule } from 'primeng/password';
import { UserService } from '../user/services/user.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button'
import {MenubarModule} from 'primeng/menubar';
import {MenuModule} from 'primeng/menu';
import { CitiesComponent } from './components/cities/cities.component';
import {DropdownModule} from 'primeng/dropdown'
import {TabViewModule} from 'primeng/tabview';
import {TableModule} from 'primeng/table';

const socket_config: SocketIoConfig= {url: environment.backend_socket_url}

@NgModule({
  declarations: [
    FeatureComponent,
    UserComponent,
    ModuleComponent,
    ModuleDetailsComponent,
    EventComponent,
    ModuleItemComponent,
    ResetPasswordComponent,
    CitiesComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    FeatureRoutingModule,
    MultiSelectModule,
    FormsModule,
    SharedModule,
    PasswordModule,
    DialogModule,
    NgbTooltipModule,
    NgChartsModule,
    NgbDatepickerModule,
    ButtonModule,
    InputTextModule,
    SocketIoModule.forRoot(socket_config),
    MenubarModule,
    MenuModule,
    DropdownModule,
    TabViewModule,
    TableModule
  ],
  providers: [
    ModuleService,
    ToastrService,
    AuthService,
    UserService,
    CamerounDatePipe
  ]
})
export class FeatureModule { }
