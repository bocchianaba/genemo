import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../shared/models/user.models';
import { logout } from '../store/user/user.action';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from '../shared/decorators/auto-unsubscribe.decorator';

@AutoUnsubscribe
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit, OnDestroy {

  items:any=[]

  items_account=[{
    label: 'Mon compte',
    icon: 'pi pi-key',
    routerLink: ['/feature/account']
  },{
    label: 'Déconnexion',
    icon: 'pi pi-sign-out',
    routerLink: ['/login']
  }]
  user!: User;

  constructor(private store: Store<{user: User}>, private router: Router) { }

  ngOnInit(): void {
    this.store.select('user').subscribe(user=>{
      this.user=user
      if(user.roles.map(role=>role.name).includes('admin'))        
        this.items=[{
          label: 'Gestion d\'utilisateurs',
          icon: 'pi pi-users',
          routerLink: ['/feature/users']
        },{
          label: 'Gestion des modules',
          icon: 'pi pi-cog',
          routerLink: ['/feature/cities']
        }]
        else if(user.roles.map(role=>role.name).includes('user'))        
          this.items=[{
            label: 'Gestion des modules',
            icon: 'pi pi-cog',
            routerLink: ['/feature/cities']
          }]
    })
  }

  ngOnDestroy(): void {
      
  }

}
