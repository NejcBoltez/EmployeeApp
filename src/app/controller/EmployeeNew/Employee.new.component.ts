import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../model/Employee';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'employee-new',
  templateUrl: './employee.new.component.html',
  styleUrls: ['../../view/employee.component.css']
})
export class EmployeeNewComponent implements OnInit {
  
    teams : any[] | null = null;
    positions : any[] | null = null;
    email : FormControl = new FormControl('');
    password : FormControl = new FormControl('');
    firstName : FormControl = new FormControl('');
    lastName : FormControl = new FormControl('');
    yearOfBirth : FormControl = new FormControl('');
    position : FormControl= new FormControl('');
    team  : FormControl = new FormControl('');
    employee = new Employee(1,"","",1,1,"../../assets/images/Janez.jpg", false, false,"");//Company.getEmployeeFromJSON()[this.route.queryParams]
    constructor(private route: ActivatedRoute,
        private api:ApiService) { }
        
    onSubmit(): void {
        this.api.register(this.email.value, this.password.value).subscribe(x => console.log(x));
        let userID= localStorage.getItem("newUserID");
        let employeesLength = 0;
        this.api.getEmployees().subscribe(response => {
            if(response.data != null) {
                employeesLength=response.data.length;
                console.log(employeesLength);
            }
        })
        console.log("USERID: " + userID);
        if (userID != null) {
            this.employee = new Employee(0,this.firstName.value,this.lastName.value,1,1,"../../assets/images/default.png",false,false,userID);
            this.api.addEmployee(this.employee);
            this.api.addEmployeePositions(employeesLength,this.team.value);
        }
    }

    ngOnInit(): void {
        this.email = new FormControl('');
        this.password = new FormControl('');
        this.firstName = new FormControl('');
        this.lastName = new FormControl('');
        this.yearOfBirth = new FormControl('');
        this.position = new FormControl('');
        this.team  = new FormControl('')
        this.getTeams();
        this.getPositions();
    }

    getTeams() {
        this.api.getTeams().subscribe(response => {this.teams = response.data; 
            console.log(this.teams)});
    }

    getPositions() {
        this.api.getPositions().subscribe(response => {this.positions = response.data; 
            console.log(this.positions)});
    }
}