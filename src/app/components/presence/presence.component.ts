import { AsyncPipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, timer } from 'rxjs';
import { retry, switchMap } from 'rxjs/operators';
import { PresenceEntity, UserEntity, UsersService } from '../../ms-graph-api';
import { SettingsService } from '../../services/settings.service';
import { AvailabilityComponent } from '../availability/availability.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { ScheduleComponent } from '../schedule/schedule.component';

@Component({
  selector: 'app-presence',
  imports: [
    AsyncPipe,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    AvailabilityComponent,
    AvatarComponent,
    ScheduleComponent,
  ],
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss'],
})
export class PresenceComponent implements OnInit {
  @Input()
  editMode!: boolean;

  @Input()
  user!: UserEntity;

  @Input()
  targetDate!: Date;

  @Output()
  remove = new EventEmitter<void>();

  presence$?: Observable<PresenceEntity | null>;

  constructor(
    private settingsService: SettingsService,
    private usersService: UsersService,
  ) {}

  ngOnInit(): void {
    this.presence$ = this.settingsService.settings$
      .pipe(
        switchMap((x) =>
          timer(0, x.updateInterval * 60000 + Math.random() * 30000),
        ),
      )
      .pipe(
        switchMap(() => this.usersService.getPresence(this.user.id)),
        retry({
          delay: (_, count) => timer(count * 1000),
          resetOnSuccess: true,
        }),
      );
  }
}
