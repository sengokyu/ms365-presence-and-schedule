import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PresenceEntity, UserEntity, UsersService } from '../../ms-graph-api';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-presence',
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
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.presence$ = this.settingsService.updateInterval$
      .pipe(switchMap((x) => timer(0, x * 60000)))
      .pipe(switchMap(() => this.usersService.getPresence(this.user.id)));
  }
}
