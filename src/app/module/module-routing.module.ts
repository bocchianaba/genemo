import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModuleComponent } from './module.component';
import { ModuleDetailsComponent } from './components/module-details/module-details.component';

const routes: Routes = [
  { path: '', component: ModuleComponent },
  { path: ':id', component: ModuleDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }
