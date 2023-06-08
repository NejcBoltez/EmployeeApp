import { Component, OnInit } from '@angular/core';
import { Employee } from '../../model/Employee';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'employee-login',
  templateUrl: './Login.component.html',
  styleUrls: ['../../view/employee.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Employee App';
  public username : FormControl = new FormControl('');//"filip.strajnar@gmail.com";
  public usernameNoPassword : FormControl = new FormControl('')
  public password: FormControl = new FormControl('');//"test12344";
  public forgotPassword=false;
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api : ApiService){
  }
  onSubmit(): void {
    // Process checkout data here
    this.route.queryParams
    .subscribe(params => {
      console.log(params);
    });
  }
  login() {
    console.log("LOGIN TEST");
    if (this.username !== null && this.password !== null) {
    this.api.login(this.username.value,this.password.value).subscribe(res => {
        console.log(res)
        if (localStorage.getItem("UserID") != null) {
          this.router.navigate(["teams"])
          }
      });
    }
  }
  ForgotMyPassword() {
    this.forgotPassword=true;
    console.log("Forgot my password");
  }
  LoginWithoutPassword() {
    this.api.loginNoPassword(this.usernameNoPassword.value).subscribe()
  }
  ngOnInit(): void {

  }
}