import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeStoreService } from '../services/employee-store.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard{
  employeeStoreService = new EmployeeStoreService();
  constructor(private router: Router){
  }

  canActivate(): boolean{
    console.log('AuthGuard#canActivate called');
    if(this.employeeStoreService.isLoggedIn()){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }
  }
  
}
