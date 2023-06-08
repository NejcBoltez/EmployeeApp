export class Employee {
    constructor(
        public id: number,
        public firstName: string, 
        public lastName: string,
        public yearOfBirth: number, 
        public vacationDays: number, 
        public employeeImg: string,
        public isOnVacation: boolean,
        public isWorking: boolean,
        public UserID: string
        ) 
    {

    }
    setOnVacation(){
      console.log(this.isWorking);
      if (this.isWorking) {
        this.isWorking = false;
      }
      if (!this.isOnVacation) {
        this.isOnVacation = true;

      }
    }
    setWorking(){
      if (!this.isWorking) {
        this.isWorking = true;
      }
      if (this.isOnVacation) {
        this.isOnVacation = false;

      }
    }
    
    /*getEmployeeFromJSON():Array<Employee> {
      var employees = new Array<Employee>();
      employees.push(new Employee("Janez","Novak",1,1,"../../assets/images/Janez.jpg", false, false));
      employees.push(new Employee("Nejc","fds",1,1,"../../assets/images/default.png", true, false));
      employees.push(new Employee("Žiga","gertr",1,1,"../../assets/images/default.png", false, true));
      employees.push(new Employee("Peter","xcvyv",1,1,"../../assets/images/default.png", false, false));
      employees.push(new Employee("Peter","xcvyv",1,1,"../../assets/images/default.png", false, false));
      employees.push(new Employee("Peter","xcvyv",1,1,"../../assets/images/default.png", false, false));
      employees.push(new Employee("Peter","xcvyv",1,1,"../../assets/images/default.png", false, false));
      
      return employees;
    }*/
    saveEmployeesToJson(employees: Array<Employee>) {
      var employeesJSON = JSON.stringify(employees);
      console.log(employeesJSON);
    }
}