import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './services/api.service';
import { EmployeeStoreService } from './services/employee-store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'seminarska';
  employeeStoreService = new EmployeeStoreService();
  isLoggedIn = this.employeeStoreService.isLoggedIn();
  constructor( private api: ApiService) {}
  logout(): void {
    this.api.logout();
  };
  
  
}
