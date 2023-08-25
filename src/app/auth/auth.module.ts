import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

import {InputTextModule} from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {PasswordModule} from 'primeng/password';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Socket, SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { CardModule } from 'primeng/card'
import { ButtonModule } from 'primeng/button'

const socket_config: SocketIoConfig={url: environment.backend_socket_url}

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    SocketIoModule.forRoot(socket_config),
    CardModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  providers: [
    HttpClientModule,
    AuthService
  ]
})
export class AuthModule { }
