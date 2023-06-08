import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../../model/Employee';
import { ApiService } from '../../services/api.service';
import { Team } from '../../model/Team';
import { Observable } from 'rxjs';

@Component({
  selector: 'team-add',
  templateUrl: './Team.add.component.html',
  styleUrls: ['../../view/employee.component.css']
})
export class TeamAddComponent implements OnInit {
    team: any[] = [];
    //public team$!:Observable<Team[]>;
    teams : any[] | null = null;
    employees = new Array<Employee>

    id = new FormControl('')
    name = new FormControl('')

    constructor(private route: ActivatedRoute,
        private api: ApiService ) { }

    showEmployees(): void {
        this.employees.push(new Employee(1,"Janez","Novak",1,1,"../../assets/images/Janez.jpg", false, false,""));
    }
    
    getTeams() {
        this.api.getTeams().subscribe(response => {this.teams = response.data; 
            console.log(this.teams)});
    }
    ngOnInit(): void {
        this.getTeams();
    }
    onSubmit(): void {}
}
