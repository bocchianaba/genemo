import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/shared/models/user.models';
import { load_success } from 'src/app/store/user/user.action';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  password!: string;
  email!: string;
  username!: string;
  last_password!: string;
  new_password!: string;
  confirmed_new_password!: string;
  id_changed=false
  credentials_changed=false
  id!: string;

  constructor(private toast: ToastrService,private store: Store<{user: User}>, private user_service: UserService) { 

  }

  ngOnInit(): void {
    this.store.select('user').subscribe(user=>{
      this.email=user.email
      this.username=user.username
      this.id=user.id
    })
  }

  ngOnDestroy(): void {
      
  }

  change_user_details(){
    this.user_service.change_user_details(this.email, this.username, this.id).subscribe((user:User)=>{
      this.store.dispatch(load_success({user}))
      this.toast.success("Vous venez de bien changer vos identifiants !", "Succès")
    })
  }

}
