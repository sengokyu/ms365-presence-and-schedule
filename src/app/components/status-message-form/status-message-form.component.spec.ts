import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CurrentUserStatusMessageService } from '../../services/current-user-status-message.service';
import { DateService } from '../../services/date.service';
import { StatusMessageFormComponent } from './status-message-form.component';

describe('StatusMessageFormComponent', () => {
  let component: StatusMessageFormComponent;
  let fixture: ComponentFixture<StatusMessageFormComponent>;
  let matBottomSheetRef;
  let currentUserStatusMessageService;
  let dateService;

  beforeEach(async () => {
    matBottomSheetRef = jasmine.createSpyObj<
      MatBottomSheetRef<StatusMessageFormComponent>
    >(['dismiss']);
    currentUserStatusMessageService =
      jasmine.createSpyObj<CurrentUserStatusMessageService>(['save']);
    dateService = { nowDate: null };

    await TestBed.configureTestingModule({
      declarations: [StatusMessageFormComponent],
      imports: [],
      providers: [
        {
          provide: MatBottomSheetRef<StatusMessageFormComponent>,
          useValue: matBottomSheetRef,
        },
        {
          provide: CurrentUserStatusMessageService,
          useValue: currentUserStatusMessageService,
        },
        { provide: DateService, useValue: dateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusMessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
