import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Observable } from 'rxjs';
import { StatusMessageEntity } from '../../ms-graph-api/entities/status-message.entity';
import { CurrentUserStatusMessageService } from '../../services/current-user-status-message.service';
import { DateService } from '../../services/date.service';
import { StatusMessageFormComponent } from './status-message-form.component';

describe('StatusMessageFormComponent', () => {
  let spectator: Spectator<StatusMessageFormComponent>;
  const createComponent = createComponentFactory({
    component: StatusMessageFormComponent,
    imports: [
      ReactiveFormsModule,
      MatButtonModule,
      MatCheckboxModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
    ],
  });
  let matBottomSheetRef;
  let currentUserStatusMessageService;
  let dateService;

  beforeEach(() => {
    matBottomSheetRef = jasmine.createSpyObj<
      MatBottomSheetRef<StatusMessageFormComponent>
    >(['dismiss']);
    const statusMessage$ = jasmine.createSpyObj<
      Observable<StatusMessageEntity | null>
    >(['pipe', 'subscribe']);

    statusMessage$.pipe.and.returnValue(statusMessage$);

    currentUserStatusMessageService =
      jasmine.createSpyObj<CurrentUserStatusMessageService>(['save'], {
        statusMessage$,
      });
    dateService = jasmine.createSpyObj<DateService>(
      {},
      { nowDate: new Date('2023-06-04T00:00:00') }
    );

    spectator = createComponent({
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
    });
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
