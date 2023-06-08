import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../model/Employee';

@Component({
  selector: 'employee-edit',
  templateUrl: './employee.edit.component.html',
  styleUrls: ['../../view/employee.component.css']
})
export class EmployeeEditComponent implements OnInit {
  
  title = 'Employee App';
  //employee = new Employee(1,"Janez","Novak",1,1,"../../assets/images/Janez.jpg", false, false,"");//Company.getEmployeeFromJSON()[this.route.queryParams]
  constructor(private route: ActivatedRoute,
    public employee : Employee) { }
  editForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    yearOfBirth: new FormControl(''),
    vacationDays: new FormControl('')
  });
  onSubmit(): void {
    // Process checkout data here
    console.log('Your order has been submitted');
    console.log(this.editForm.value);
  }
  ngOnInit(): void {
    /*this.route.queryParams
    .subscribe(params => {
      if (params['EmployeeID'] != null) {
        console.log(params['EmployeeID']);
        this.employee = this.company.getEmployeeFromJSON()[params['EmployeeID']]
      }
    });*/
  }
}