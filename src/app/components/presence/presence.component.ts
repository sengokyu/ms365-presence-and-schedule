import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { Availability, UserService } from '../../ms-graph-api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss'],
})
export class PresenceComponent implements OnInit {
  @Input()
  user!: UserModel;

  availability$?: Observable<Availability>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.availability$ = this.userService.getAvailability(this.user.id);
  }
}
