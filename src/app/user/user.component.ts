import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cities, Role, Roles, Town, User, UserPaginate } from '../shared/models/user.models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalContent } from './action.component';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { UserService } from './services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AutoUnsubscribe } from '../shared/decorators/auto-unsubscribe.decorator';

@AutoUnsubscribe
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  display='list'

  page=1

  users_paginate$!: Observable<UserPaginate>

  
	action!: string;
  user?: User;
  roles$!: Observable<Roles>
  towns$!: Observable<Cities>
  roles_modified=[]
  cities_modified=[]
  display_action=false
  email!: string
  username!: string
  roles_to_assign: Role[]=[]
  cities_to_assign: Town[]=[]
  roles_to_unassign: Role[]=[]
  cities_to_unassign: Town[]=[];
  first=0
  selected_user: any;
  id_changed=false
  password!: string;
  assign_dialog!: boolean;
  assign_city_dialog: boolean= false;
  users_selected= []
  search_name=""
  multiple!: boolean;

  constructor(private store: Store<{user: User}>, private modalService: NgbModal, private user_service: UserService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.store.select('user').subscribe(user=> {
      this.user=user
    })
    this.users_paginate$=this.user_service.get_users_list(1,100)
    this.roles$=this.user_service.get_roles_list()
    this.towns$=this.user_service.get_cities_list()
  }
  ngOnDestroy(): void {
      
  }
  filterData(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    // Utilisez inputValue pour effectuer votre filtrage avec la méthode filterGlobal()
  }
  unassign(event:any){
    console.log("roles to unassign ",this.roles_to_unassign); 
    this.user_service.unassign_roles(this.selected_user?.id, this.roles_to_unassign).subscribe({
      next: (user:any)=> {
        console.log({user});           
        this.selected_user.roles=user.roles        
        this.toast.success(" Vous avez retirer des rôles à "+this.selected_user?.username)
        this.roles_to_unassign=[]
      },
      error: (err:any)=> {
        console.error(err.error.message)
        this.toast.error('Une erreur est survenue !', 'Erreur')},
      complete: ()=> {
        this.toast.info("Opération terminé !")
        this.user_service.get_unassigned_roles_list(this.selected_user.id).subscribe(roles=> this.selected_user.unassign_roles=roles.data)
        // this.user_service.get_unassigned_cities_list(this.selected_user.id).subscribe(cities=> this.selected_user.unassign_cities=cities.data)
        this.assign_dialog=false
      }
    }
    )
  }
  
  unassign_cities(event:any){
    console.log("cities to unassign ",this.cities_to_unassign); 
    this.user_service.unassign_cities(this.selected_user?.id, this.cities_to_unassign).subscribe({
      next: (user:any)=> {
        console.log({user, selected: this.selected_user});           
        this.selected_user.idTownAuthorise=user.idTownAuthorise        
        this.toast.success(" Vous avez retirer des villes à "+this.selected_user?.username)
        this.cities_to_unassign=[]
      },
      error: (err:any)=> {
        console.error(err.error.message)
        this.toast.error('Une erreur est survenue !', 'Erreur')},
      complete: ()=> {
        this.toast.info("Opération terminé !")
        this.user_service.get_unassigned_cities_list(this.selected_user.id).subscribe(cities=> this.selected_user.unassign_cities=cities.data)
        this.assign_city_dialog=false
      }
    }
    )
  }

  assign(event: any){
    this.assign_dialog=true
    console.log("roles to assign ",this.roles_to_assign);    
  }

  assign_city(event: any){
    this.assign_city_dialog=true
    console.log("cities to assign ",this.cities_to_assign);    
  }

	operate_action(multiple=false){
		if(this.action=='delete'){
      this.display_action=false
      this.toast.success("Votre suppression a bien été pris en compte !")
      if(multiple) this.user_service.delete_users(this.users_selected).subscribe({
        next: (user)=>{
          this.toast.success("Vous avez supprimé vos utilisateurs", "Succès")
        },
        error: ()=> this.toast.error("Une erreur est survenue !"),
        complete: ()=> {
          this.users_paginate$=this.user_service.get_users_list(1, 100)
          this.toast.info("Opération terminée !")
        }
      })
      else this.user_service.delete_users([this.selected_user]).subscribe({
        next: (user)=>{
          this.toast.success("Vous avez supprimé l'utilisateur "+this.selected_user.username, "Succès")
        },
        error: ()=> this.toast.error("Une erreur est survenue !"),
        complete: ()=> {
          this.users_paginate$=this.user_service.get_users_list(1, 100)
          this.toast.info("Opération terminée !")
        }
      })
		}
		if(this.action=='update'){
      console.log({username: this.username, email: this.email})
      this.user_service.update_user(this.selected_user.id, (this.username=='')? this.selected_user.username: this.username, (this.email=='')? this.selected_user.email: this.email).subscribe({
        next: (user: User)=> {
          this.toast.success("Vous avez mis à jour les identifiants de votre utilisateur !", "Succès")
        },
        error: (err)=> this.toast.error("Une erreur est survenue !"),
        complete: ()=> {
          this.users_paginate$=this.user_service.get_users_list(1, 100)
          this.toast.info("Opération terminée !")
        }
      })
      this.display_action=false
		}
		if(this.action=='create'){
      this.user_service.create_user(this.username, this.email, this.password).subscribe({
        next: user=> this.toast.success("Vous avez créé un utilisateur avec succès !", "Succès"),
        error: (err)=> this.toast.error("Une erreur est survenue !"),
        complete: ()=> {
          this.users_paginate$=this.user_service.get_users_list(1, 100)
          this.toast.info("Opération terminée !")
        }
      })
      this.display_action=false
		}
	}

  update_username(event: any){
    this.id_changed=true
    this.username=event.target.value
    this.email=(this.email && this.email!='')? this.email: this.selected_user.email
    console.log({email: this.email, username: this.username})
  }
  
  update_email(event: any){
    this.id_changed=true
    this.email=event.target.value
    this.username=(this.username && this.username!='')? this.username: this.selected_user.username
    console.log({email: this.email, username: this.username})
  }
  
  update_password(event: any){
    this.id_changed=true
    this.password=event.target.value
  }

  reset_dialog(){
    this.display_action=false
    this.roles_modified=[]
    this.cities_modified=[]
    this.username=''
    this.email=''
    this.password=''
    this.selected_user={}
    this.roles_to_assign=[]
    this.roles_to_unassign=[]
    this.cities_to_assign=[]
    this.cities_to_unassign=[]
    this.id_changed=false
    this.multiple=false
  }

  change_username(event:any){
    this.username=event.target.value
  }
  
  change_email(event:any){
    this.email=event.target.value
  }

  open(action: string, data:any, multiple=false){
    if(action=='view'){
      this.action='view'
    }
    if(action=='create'){
      this.action='create'
    }
    if(action=='update'){
      this.action='update'
    }
    if(action=='delete'){
      this.action='delete'
      this.multiple=multiple
    }
    this.selected_user=data
    this.display_action=true
    this.user_service.get_unassigned_roles_list(this.selected_user.id).subscribe(roles=> this.selected_user.unassign_roles=roles.data)
    this.user_service.get_unassigned_cities_list(this.selected_user.id).subscribe(cities=> this.selected_user.unassign_cities=cities.data)
  }

  assign_roles(){
    console.log("roles to assign ",this.roles_to_assign); 
    this.user_service.assign_roles(this.selected_user?.id, this.roles_to_assign).subscribe({
      next: (user:any)=> {
        console.log({user});    
        this.selected_user.roles=user.roles    
        this.toast.success(" Vous avez ajouter des rôles à "+this.selected_user?.username, "Succès")
      },
      error: (err:any)=> {
        console.error(err.error.message)
        this.toast.error('Une erreur est survenue !', 'Erreur')
      },
      complete: ()=> {
        this.toast.info("Opération terminé !")
        this.user_service.get_unassigned_roles_list(this.selected_user.id).subscribe(roles=> this.selected_user.unassign_roles=roles.data)
        this.assign_dialog=false
      }
    }
    )
  }

  
  assign_cities(){
    console.log("roles to assign ",this.roles_to_assign); 
    this.user_service.assign_cities(this.selected_user?.id, this.cities_to_assign).subscribe({
      next: (user:any)=> {
        console.log({user, cities : this.cities_to_assign});    
        this.selected_user.idTownAuthorise=user.idTownAuthorise    
        this.toast.success(" Vous avez ajouter des rôles à "+this.selected_user?.username, "Succès")
      },
      error: (err:any)=> {
        console.error(err.error.message)
        this.toast.error('Une erreur est survenue !', 'Erreur')
      },
      complete: ()=> {
        this.toast.info("Opération terminé !")
        this.user_service.get_unassigned_cities_list(this.selected_user.id).subscribe(cities=> this.selected_user.unassign_cities=cities.data)
        this.assign_city_dialog=false
      }
    }
    )
  }

}
