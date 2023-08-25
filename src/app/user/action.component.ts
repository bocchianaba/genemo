import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Role, Town, User } from '../shared/models/user.models';
import { CommonModule } from '@angular/common';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';


@Component({
	selector: 'ngbd-modal-content',
	standalone: true,
    imports: [
        CommonModule, 
		FormsModule,
        MultiSelectModule,
		InputTextModule
    ],
	template: `
		<div class="modal-header">
			<h4 *ngIf="action=='create'" class="modal-title">Ajouter</h4>
			<h4 *ngIf="action=='delete'" class="modal-title">Supprimer <strong>{{user?.username}}</strong></h4>
			<h4 *ngIf="action=='update'" class="modal-title">Modifier <strong>{{user?.username}}</strong></h4>
			<h4 *ngIf="action=='view'" class="modal-title">Détails de <strong>{{user?.username}}</strong></h4>
			<button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('Cross click')"></button>
		</div>
		<div class="modal-body">
			<p *ngIf="action == 'delete'">Etes vous sûr de vouloir supprimer l'utilisateur <strong>{{user?.username}}</strong> !</p>
            <div *ngIf="action!='delete'">
				<span class="p-float-label my-2">
					<input id="float-input" [value]="user?.username" type="text" pInputText> 
					<label for="float-input">Nom d'utilisateur</label>
				</span>  
				<span class="my-2">
					<p-multiSelect [(ngModel)]="roles_modified" [options]="roles" dataKey="_id" optionLabel="_id" optionValue="name" defaultLabel="Sélectionner un role" optionLabel="role" display="chip"></p-multiSelect> 
				</span> 
				<span class="my-2">
					<p-multiSelect class="my-2" [(ngModel)]="cities_modified" [options]="towns" dataKey="_id" optionLabel="_id" optionValue="name" defaultLabel="Selectionner une ville" optionLabel="town" display="chip"></p-multiSelect> 
				</span>                          
            </div>            
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-outline-dark" (click)="operate_action()">Close</button>
		</div>
	`,
})
export class NgbdModalContent {
	@Input() action!: string;
    @Input() user?: User;
	roles!: Role[]
	towns!: Town[]
	roles_modified=[]
	cities_modified=[]

	constructor(public activeModal: NgbActiveModal) {}

	operate_action(){
		if(this.action=='delete'){
			this.activeModal.dismiss('Cross click')
		}
		if(this.action=='update'){
			this.activeModal.dismiss('Cross click')
		}
		if(this.action=='view'){
			this.activeModal.dismiss('Cross click')
		}
	}
}