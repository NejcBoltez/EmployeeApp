import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/Employee';
import { ApiService } from '../../services/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'employee-app',
  templateUrl: './User.properties.component.html',
  styleUrls: ['../../view/employee.component.css']
})
export class UserPropertiesComponent implements OnInit {

  //company = new Company("TEST", new Array<Employee>());
  currentUser:string | undefined
  employee = new Employee(0,"Janez","Novak",1,1,"../../assets/images/default.png", false, false,"");//Company.getEmployeeFromJSON()[this.route.queryParams]
  constructor(private route: ActivatedRoute,private api:ApiService) { }
  addVacation=false;
  teams : any[] | null = null;
  positions : any[] | null = null;

  /*email = new FormControl('');
  password = new FormControl('');
  id = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  yearOfBirth = new FormControl('');
  vacationDays = new FormControl('');*/
  VacationStart = new FormControl('');
  VacationEnd = new FormControl('');
  position  = '';
  team = '';
  /*editForm = new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    yearOfBirth: new FormControl(''),
    vacationDays: new FormControl(''),
    VacationStart: new FormControl(''),
    VacationEnd: new FormControl(''),
  });*/

  onSubmit(): void {
    // Process checkout data here
    console.log('Your order has been submitted');
    console.log(this.employee);
  }

  userAddVacation(): void {
    this.addVacation = true;
  }

  getTeam() {
    this.api.getTeams().subscribe(response => {
      this.teams = response.data; 
      this.api.getEmployeeTeam(this.employee.id).subscribe(resp => {
        if (resp.data != null) {
          for (let i in this.teams){
            let t = this.teams[Number(i)].id;
            if (t == resp.data[0].TeamID) {
              this.team = this.teams[Number(i)].Name;
              console.log(this.team)
            }
          }
        }});
      });
  }

  getPosition() {
    this.api.getPositions().subscribe(response => {
      this.positions = response.data; 
      this.api.getEmployeePosition(this.employee.id).subscribe(resp => {
        if (resp.data != null) {
          for (let i in this.positions){
            let t = this.positions[Number(i)].id;
            console.log(resp.data[0].PositionID)
            if (t == resp.data[0].PositionID) {
              this.position = this.positions[Number(i)].Name;
              console.log(this.position)
            }
          }
        }});
      });
  }

  setVacation() {
    if(this.VacationEnd.value != null && this.VacationStart.value != null && this.VacationEnd.value != "" && this.VacationStart.value != "") {
      console.log(new Date(this.VacationStart.value))
      console.log(new Date(this.VacationEnd.value))
      var sDate = new Date(this.VacationStart.value)
      var eDate = new Date(this.VacationEnd.value)
      var startDate = new Date(sDate);
      var endDate = new Date(eDate);
    
      var Time = (endDate.getTime() - startDate.getTime())/ (1000 * 3600 * 24);
      console.log(Time)
      this.api.setEmployeeVacation(1, sDate, eDate)
    }
  }

  ngOnInit(): void {
    this.api.getCurrentUser().subscribe(resp => {
      if(resp.data.user != null) {
        this.currentUser = resp.data.user.email
      }});
    var currentEmployee = localStorage.getItem("currentEmployee");
    if (currentEmployee != null && currentEmployee != "") {
      var JSONparse = JSON.parse(currentEmployee);
      this.employee = new Employee(JSONparse["id"],JSONparse["firstName"],JSONparse["lastName"],JSONparse["yearOfBirth"],
      JSONparse["vacationDays"],JSONparse["employeeImg"],JSONparse["isOnVacation"],JSONparse["isWorking"],JSONparse["UserID"]); 
    }
    console.log(this.employee);
    this.getTeam();
    this.getPosition();
  }
}
