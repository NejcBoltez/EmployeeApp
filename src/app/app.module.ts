import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EmployeeComponent } from './controller/EmployeesShow/Employee.component';
import { EmployeeEditComponent } from './controller/EmployeeEdit/Employee.edit.component';
import { LoginComponent } from './controller/Login/Login.component';
import { TeamComponent } from './controller/Team/Team.component';
import { UserPropertiesComponent } from './controller/UserProperties/User.properties.component';
import { EmployeeNewComponent } from './controller/EmployeeNew/Employee.new.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//Firebase Authentication
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTable, MatTableModule} from '@angular/material/table';
import { TeamAddComponent } from './controller/NewTeam/Team.Add.component';
@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeEditComponent,
    LoginComponent,
    TeamComponent,
    TeamAddComponent,
    UserPropertiesComponent,
    EmployeeNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatExpansionModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
