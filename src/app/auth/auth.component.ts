import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../shared/models/user.models';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { load, logout } from '../store/user/user.action';
import { AutoUnsubscribe } from '../shared/decorators/auto-unsubscribe.decorator';
import { Socket } from 'ngx-socket-io';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@AutoUnsubscribe
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  username = '';
  password = '';
  show = false;
  user!: User;

  loginForm: FormGroup;

  constructor(
    private socket: Socket,
    private toast: ToastrService,
    private router: Router,
    private store: Store<{ user: User }>,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(logout())
  }
  ngOnDestroy(): void {}

  login() {
    console.log({ username: this.username, password: this.password });
    this.store.dispatch(
      load({
        username: this.loginForm.get('username')?.value,
        password: this.loginForm.get('password')?.value,
      })
    );
    console.log({ user: this.user });
    this.store.select('user').subscribe((user: User) => {
      if (!!user) {
        console.log({user})
        this.socket.emit('join', { idUser: user.id });
        this.toast.success('Heureux de vous revoir ' + user.username + ' !');
        if (user.roles.map((role) => role.name).includes('admin'))
          this.router.navigateByUrl('/feature/users');
        else if (user.roles.map((role) => role.name).includes('user'))
          this.router.navigateByUrl('/feature/cities');
        else this.router.navigateByUrl('/feature/cities');
      }else{
        this.loginForm.reset()
      }
    });
  }
}
