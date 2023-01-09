import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserService } from '../../ms-graph-api/services/user.service';
import { ScheduleComponent } from './schedule.component';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;
  let userService;

  beforeEach(async () => {
    userService = jasmine.createSpyObj<UserService>(['getScheduleItems']);

    await TestBed.configureTestingModule({
      declarations: [ScheduleComponent],
      providers: [{ provide: UserService, useValue: userService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
