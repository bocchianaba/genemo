import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/user.models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { load, logout } from '../store/user/user.action';
import { AutoUnsubscribe } from '../shared/decorators/auto-unsubscribe.decorator';
import { Socket } from 'ngx-socket-io';

@AutoUnsubscribe
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  username=''
  password=''
  show=false
  user!: User

  constructor(private socket: Socket, private auth_service: AuthService, private toast: ToastrService, private router: Router, private store: Store<{user: User}>) { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
      
  }

  login(){
    console.log({username: this.username, password: this.password})
    this.store.dispatch(load({username: this.username, password: this.password}))
    console.log({user: this.user})
    this.store.select('user').subscribe(
      (user: User)=>{
        if(!!user){
          this.socket.emit('join', {idUser: user.id})
          this.toast.success("Heureux de vous revoir "+user.username+' !')
          if(user.roles.map(role=>role.name).includes('admin'))
            this.router.navigateByUrl("/feature/users")
          else if (user.roles.map(role=>role.name).includes('user'))
            this.router.navigateByUrl("/feature/cities")
          else 
            this.router.navigateByUrl("/feature/cities")
        }
      }
    )
  }

}
