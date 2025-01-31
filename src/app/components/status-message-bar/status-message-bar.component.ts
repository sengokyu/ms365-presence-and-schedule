import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { CurrentUserStatusMessageService } from '../../services/current-user-status-message.service';
import { StatusMessageFormComponent } from '../status-message-form/status-message-form.component';

@Component({
    selector: 'app-status-message-bar',
    templateUrl: './status-message-bar.component.html',
    styleUrls: ['./status-message-bar.component.scss'],
    standalone: false
})
export class StatusMessageBarComponent implements OnInit {
  statusMessage$? = this.currentUserStatusMessageService.statusMessage$;

  constructor(
    private currentUserStatusMessageService: CurrentUserStatusMessageService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit(): void {
    this.currentUserStatusMessageService.load();
  }

  onEdit(): void {
    this.bottomSheet.open(StatusMessageFormComponent);
  }
}
