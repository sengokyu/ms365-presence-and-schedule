import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentUserStatusMessageService } from 'src/app/services/current-user-status-message.service';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StatusMessageBarComponent } from './status-message-bar.component';

describe('StatusMessageBarComponent', () => {
  let component: StatusMessageBarComponent;
  let fixture: ComponentFixture<StatusMessageBarComponent>;
  let currentUserStatusMessageService: jasmine.SpyObj<CurrentUserStatusMessageService>;

  beforeEach(async () => {
    currentUserStatusMessageService =
      jasmine.createSpyObj<CurrentUserStatusMessageService>(['load']);

    await TestBed.configureTestingModule({
      declarations: [StatusMessageBarComponent],
      imports: [MatBottomSheetModule, MatToolbarModule],
      providers: [
        {
          provide: CurrentUserStatusMessageService,
          useValue: currentUserStatusMessageService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StatusMessageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
