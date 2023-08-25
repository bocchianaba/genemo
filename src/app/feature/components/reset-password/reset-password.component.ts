import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { AutoUnsubscribe } from 'src/app/shared/decorators/auto-unsubscribe.decorator';
import { User } from 'src/app/shared/models/user.models';
import { load_info, load_success } from 'src/app/store/user/user.action';
import { UserService } from 'src/app/user/services/user.service';

@AutoUnsubscribe
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
  idForm!: FormGroup
  passwordForm!: FormGroup

  constructor(private toast: ToastrService,private store: Store<{user: User}>, private user_service: UserService, private fb: FormBuilder) { 
    this.store.select("user").subscribe((user:User)=>{
      this.idForm=this.fb.group({
        username: [user.username, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
      });
      this.passwordForm=this.fb.group({
        last_password: ['', Validators.required],
        new_password: ['', [Validators.required, Validators.minLength(8)]],
        confirmed_new_password: ['', [Validators.required, Validators.minLength(8)]],
      }, { validator: this.passwordMatchValidator });
    })
  }

  get passwordsDoNotMatch(): boolean {
    return this.passwordForm.hasError('passwordMismatch');
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('new_password');
    const confirmPassword = control.get('confirmed_new_password');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'passwordMismatch': true };
    }
    
    return null;
  }

  ngOnInit(): void {
    this.idForm=this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.store.select('user').subscribe(user=>{
      this.email=user.email
      this.username=user.username
      this.id=user.id
      this.idForm=this.fb.group({
        username: [user.username, Validators.required],
        email: [user.email, [Validators.required, Validators.email]],
      });
    })
  }

  ngOnDestroy(): void {
      
  }

  change_user_details(){
    if(this.id_changed)
    this.user_service.change_user_details(this.idForm.get('email')?.value, this.idForm.get('username')?.value, this.id).subscribe((user:User)=>{
      this.store.dispatch(load_info({user}))
      this.toast.success("Vous avez bien changer vos identifiants !", "Succès")
    })
  }

  change_user_password(){
    this.user_service.change_user_password(this.passwordForm.get('last_password')?.value, this.passwordForm.get('new_password')?.value, this.id).subscribe((user:User)=>{
      this.toast.success("Vous avez bien changer votre mot de passe !", "Succès")
    })
  }

}
