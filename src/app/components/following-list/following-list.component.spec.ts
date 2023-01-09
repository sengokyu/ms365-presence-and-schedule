import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateService } from 'src/app/services/date.service';
import { FollowingService } from 'src/app/services/following.service';

import { FollowingListComponent } from './following-list.component';

describe('FollowingListComponent', () => {
  let component: FollowingListComponent;
  let fixture: ComponentFixture<FollowingListComponent>;
  let followingService;
  let dateService;

  beforeEach(async () => {
    followingService = { following$: null };
    dateService = { today: null };

    await TestBed.configureTestingModule({
      declarations: [FollowingListComponent],
      providers: [
        { provide: FollowingService, useValue: followingService },
        { provide: DateService, useValue: dateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FollowingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
