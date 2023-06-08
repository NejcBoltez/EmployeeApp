import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamAddComponent } from './Team.Add.component';

describe('TeamNewComponent', () => {
  let component: TeamAddComponent;
  let fixture: ComponentFixture<TeamAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
