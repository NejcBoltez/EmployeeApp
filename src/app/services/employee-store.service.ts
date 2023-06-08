import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeStoreService {

  private userId: string = "";
  constructor() { }

  setToken(token: string) {
    this.userId = token;
  }

  getToken() {
    return this.userId;
  }

  isLoggedIn() {
    console.log('localStorage.getItem("UserID")!=null')
    return localStorage.getItem("UserID")!=null;
  }

  logout(){
    this.userId = "";
  }

}
