import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureComponent } from './feature.component';
import { ModuleComponent } from '../module/module.component';
import { UserComponent } from '../user/user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { CitiesComponent } from './components/cities/cities.component';
import { ModuleDetailsComponent } from '../module/components/module-details/module-details.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: FeatureComponent, children: [
    { path: '', redirectTo: 'cities', pathMatch: 'full' },
    { path: 'cities', component: CitiesComponent, canActivate: [AuthGuard] },
    { path: 'city/:region_name/modules', component: ModuleComponent, canActivate: [AuthGuard] },
    { path: 'users', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'account', component: ResetPasswordComponent, canActivate: [AuthGuard]},
    { path: 'city/:region_name/modules/:id', component: ModuleDetailsComponent, canActivate: [AuthGuard]}
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
