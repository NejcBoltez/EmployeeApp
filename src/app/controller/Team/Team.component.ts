import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../model/Employee';
import { ApiService } from '../../services/api.service';
import { Team } from '../../model/Team';
import { Observable } from 'rxjs';

@Component({
  selector: 'team-add',
  templateUrl: './Team.show.component.html',
  styleUrls: ['../../view/employee.component.css']
})
export class TeamComponent implements OnInit {
    team: any[] = [];
    //public team$!:Observable<Team[]>;
    teams : any[] | null = null;
    employees : any[] = [];
    employeesID : any[] | null = null;
    selectedTeam: number | null =null;
    
    constructor(private route: ActivatedRoute,
        private api: ApiService ) { }

    showEmployees(): void {
       this.getTeams();
       console.log(this.teams);
    }

    async addTeam() {
        await this.api.addTeam(new Team(0,"Dev"));
        await this.api.addTeam(new Team(1,"Sales"));
        await this.api.addTeam(new Team(2,"QA"));
        await this.api.addTeam(new Team(3,"QC"));
        await this.api.addTeam(new Team(4,"HR"));
    }

    getTeams() {
        this.api.getTeams().subscribe(response => {this.teams = response.data; 
            console.log(this.teams)});
    }

    getEmployeesInTeam(id: number) {
            this.employees = [];
            this.api.getEmployeesInTeam(id).subscribe(response => {
                console.log(response.data);
                if(response.data!= null) {
                    this.employeesID = response.data;
                    for (let x in response.data) {
                        let i = response.data[x].EmployeeID;
                        this.api.getEmployeeByID(Number(i)).subscribe(resp => {
                            if(resp.data!= null) {
                                this.employees.push(resp.data[0]);
                            }});
                        console.log(this.employees)
                    }
                }});
            console.log(this.employeesID);
    }

    ngOnInit(): void {
        this.getTeams();
    }
}
