import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from './supabase.connect';
import { Employee } from '../model/Employee';
import { Team } from '../model/Team';
import { Observable, from } from 'rxjs';
import { Router } from '@angular/router';
import { EmployeeStoreService } from './employee-store.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  supabase: SupabaseClient = createClient(
    environment.supabaseUrl, 
    environment.supabaseKey)
  employeeStoreService = new EmployeeStoreService();
  constructor(
    private router: Router) {   }

  register(email: string, password: string) {
    return from(this.supabase.auth.signUp({
      email: email,
      password: password
    }).then(response=> {console.log(response.data.session);
      if(response.data.user?.id != null) {
        localStorage.setItem("newUserID",response.data.user?.id)
      } }));
  }

  login(email: string, password: string) {
    console.log("EMAIL: " + email + ' ' + password);
    return from(this.supabase.auth.signInWithPassword({
      email: email,
      password: password
    }).then(response=> {console.log(response.data.session);
      if(response.data.session?.user.id != null) {
        this.employeeStoreService.setToken(response.data.session.user?.id)
        localStorage.setItem("UserID",response.data.session?.user.id)
      } }));
  }
  logout() {
     return from(this.supabase.auth.signOut().then(response => {
        if (response.error === null) {
          this.router.navigate(["login"])
          localStorage.clear()
        }
      }))
    }

  loginNoPassword(email: string) {
    return from(this.supabase.auth.signInWithOtp({ email: email}).then(res => {
      alert("OTP code has been sent. Please check your email");
    }));
  }

  checkLoggedin() {
    return new Observable<boolean>(sub => {
      this.supabase.auth.getUser().then(res => {
        if (res.data.user === null) {
          sub.next(false)
        }
        else {
          sub.next(true)
        }
      })
    })
  }

  getUser(){
    var userID = "";
    from(this.supabase.auth.getUser().then(res => {if(res.data.user = null){
      userID = res.data.user.id;
    }})).subscribe();
    return userID;
  }

  getEmployeeUser(userID: string | null){
    console.log("getEmployeeUser");
    if( userID != null) {
      return from(this.supabase.from('Employees')
        .select('*')
        .eq("UserID", userID)
        .limit(1));
    } else{
      return from(this.supabase.from('Employees')
        .select('*')
        .limit(1));
    }
  }

  addTeam(team: Team) {
    return from(this.supabase
      .from('Teams')
      .insert([{"Name":team.name}]))
  }

  addEmployee(employee: Employee) {
    console.log(employee);
    return from(this.supabase
      .from('Employees')
      .insert({"firstName":employee.firstName, 
                "lastName":employee.lastName,
                "yearOfBirth":employee.yearOfBirth,
                "vacationDays":employee.vacationDays,
                "employeeImg":employee.employeeImg,
                "isOnVacation":employee.isOnVacation,
                "isWorking":employee.isWorking,
                "UserID":employee.UserID
    }).then(response=> console.log(response)))
  }

  getTeams() {
    return from(this.supabase.from('Teams').select('*'))
  }

  getEmployees() {
    return from(this.supabase.from('Employees').select('*'));
  }

  getPositions() {
    return from(this.supabase.from('Positions').select('*'));
  }

  addEmployeePositions(EmployeeID: number, PositionID: number) {
    return from(this.supabase
      .from('EmployeePosition')
      .insert({
        "EmployeeID": EmployeeID,
        "PositionID": PositionID
      }).then(response=> alert("Looki in your email" + EmployeeID + PositionID)))
  }

  getEmployeesInTeam(TeamID: number){
    console.log("TEAM: "+TeamID);
    return from(this.supabase.from('EmployeeTeam').select('EmployeeID').eq(
        "TeamID", TeamID
    ));
  }

  setEmployeeVacation(employeeID: number, vacationStart: Date, vacationEnd: Date) {
    from(this.supabase.from('EmployeeVacation').insert({
      "EmployeeID": employeeID,
      "startDate": vacationStart,
      "endDate": vacationEnd
    })).subscribe();
  }

  getEmployeeTeam(employeeID: number) {
    return from(this.supabase.from('EmployeeTeam').select('TeamID').eq(
      "EmployeeID", employeeID
    ));
  }

  setEmployeeTeam(employeeID: number) {
    return from(this.supabase.from('EmployeeTeam').insert({
      "EmployeeID": employeeID
    }));
  }

  setEmployeePosition(employeeID: number) {
    from(this.supabase.from('EmployeePosition').insert({
      "EmployeeID": employeeID
    })).subscribe();
  }
  getEmployeePosition(employeeID: number) {
    return from(this.supabase.from('EmployeePosition').select('PositionID').eq(
      "EmployeeID", employeeID
    ));
  }
  getCurrentUser() {
    return from(this.supabase.auth.getUser());
  }

  getEmployeeByID(employeeID: number) {
    console.log(employeeID)
    return from(this.supabase.from('Employees').select('*').eq(
      "id", employeeID
    ));
  }
}
