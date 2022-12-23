import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AvailabilityEntity,
  UserEntity,
  UserService,
} from '../../ms-graph-api';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss'],
})
export class PresenceComponent implements OnInit {
  @Input()
  user!: UserEntity;

  availability$?: Observable<AvailabilityEntity>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.availability$ = this.userService.getAvailability(this.user.id);
  }
}
