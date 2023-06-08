import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeComponent } from './controller/EmployeesShow/Employee.component';
import { LoginComponent } from './controller/Login/Login.component';
import { TeamComponent } from './controller/Team/Team.component';
import { UserPropertiesComponent } from './controller/UserProperties/User.properties.component';
import { EmployeeNewComponent } from './controller/EmployeeNew/Employee.new.component';
import { TeamAddComponent } from './controller/NewTeam/Team.Add.component';
import { EmployeeGuard } from './guard/employee.guard';

const routes: Routes = [
  { path: 'employees', component: EmployeeComponent,canActivate: [EmployeeGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'teams', component: TeamComponent,canActivate: [EmployeeGuard]},
  { path: 'userProp', component: UserPropertiesComponent,canActivate: [EmployeeGuard]},
  { path: 'newEmployee', component: EmployeeNewComponent,canActivate: [EmployeeGuard]},
  { path: 'addTeam', component: TeamAddComponent,canActivate: [EmployeeGuard]}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
