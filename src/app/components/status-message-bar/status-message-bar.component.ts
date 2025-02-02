import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurrentUserStatusMessageService } from '../../services/current-user-status-message.service';
import { StatusMessageFormComponent } from '../status-message-form/status-message-form.component';

@Component({
  selector: 'app-status-message-bar',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatToolbarModule,
  ],
  templateUrl: './status-message-bar.component.html',
  styleUrls: ['./status-message-bar.component.scss'],
})
export class StatusMessageBarComponent implements OnInit {
  statusMessage$? = this.currentUserStatusMessageService.statusMessage$;

  constructor(
    private currentUserStatusMessageService: CurrentUserStatusMessageService,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    this.currentUserStatusMessageService.load();
  }

  onEdit(): void {
    this.bottomSheet.open(StatusMessageFormComponent);
  }
}
