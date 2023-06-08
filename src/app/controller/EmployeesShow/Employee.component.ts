import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/Employee';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'employee-app',
  templateUrl: './employee.component.html',
  styleUrls: ['../../view/employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employee = new Employee(1,"Janez","Novak",1,1,"../../assets/images/Janez.jpg", false, false,"");
  employees : any[] | null = null
  user = this.api.getUser();

  constructor( private api: ApiService){}
  
  ngOnInit(): void {
    if(localStorage.getItem("UserID") != null) {
      this.api.getEmployeeUser(localStorage.getItem("UserID")).subscribe(response => {
        if(response.data != null) {
          localStorage.setItem("currentEmployee",JSON.stringify(response.data[0]))
        }}
        );
    }
    this.api.getEmployees().subscribe(response => console.log(response.data?.length))
    this.getEmployees();
    this.employee.setOnVacation()
    this.api.addEmployee(this.employee);
  }
  getEmployees() {
    this.api.getEmployees().subscribe(response => {this.employees = response.data});
  }
  setVacation(employee:Employee) {
    if (employee.isWorking) {
      employee.isWorking = false;
    }
    if (!employee.isOnVacation) {
      employee.isOnVacation = true;

    }
  }
  setWorking(employee:Employee) {
    if (!employee.isWorking) {
      employee.isWorking = true;
    }
    if (employee.isOnVacation) {
      employee.isOnVacation = false;
    }
  }
}