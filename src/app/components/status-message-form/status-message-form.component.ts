import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { filter, Subscription } from 'rxjs';
import { CurrentUserStatusMessageService } from 'src/app/services/current-user-status-message.service';
import { StatusMessageEntity } from '../../ms-graph-api';
import { DateService } from '../../services/date.service';
import { generateExpiryDateOptions } from './expiry-date-options';

@Component({
  selector: 'app-status-message-form',
  templateUrl: './status-message-form.component.html',
  styleUrls: ['./status-message-form.component.scss'],
})
export class StatusMessageFormComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

  form = new FormGroup({
    message: new FormControl<string>(''),
    pinned: new FormControl<boolean>(false),
    expiryDate: new FormControl<Date | null>(null),
  });

  expiryDateOptions = generateExpiryDateOptions(this.dateService.nowDate);

  // 保存中
  saving = false;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<StatusMessageFormComponent>,
    private currentUserStatusMessageService: CurrentUserStatusMessageService,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.currentUserStatusMessageService.statusMessage$
        .pipe(filter((x) => !!x))
        .subscribe((x) => {
          this.form.setValue({
            message: x?.message ?? null,
            pinned: x?.pinned ?? false,
            expiryDate: x?.expiryDate ?? null,
          });
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit(): void {
    this.saving = true;

    this.currentUserStatusMessageService
      .save(this.getStatusMessageEntity())
      .subscribe({
        next: () => {
          this.bottomSheetRef.dismiss();
        },
        error: () => {
          this.saving = false;
        },
      });
  }

  private getStatusMessageEntity(): StatusMessageEntity {
    return {
      message: this.form.value.message!,
      pinned: this.form.value.pinned!,
      expiryDate: this.form.value.expiryDate,
    };
  }
}
