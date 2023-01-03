import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PresenceEntity, UserEntity, UserService } from '../../ms-graph-api';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss'],
})
export class PresenceComponent implements OnInit {
  @Input()
  user!: UserEntity;

  @Input()
  targetDate!: Date;

  presence$?: Observable<PresenceEntity>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.presence$ = this.userService.getPresence(this.user.id);
  }
}
