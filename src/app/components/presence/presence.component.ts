import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PresenceEntity, UserEntity, UserService } from '../../ms-graph-api';
import { FollowingService } from '../../services/following.service';

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

  presence$?: Observable<PresenceEntity>;

  constructor(
    private userService: UserService,
    private followingService: FollowingService
  ) {}

  ngOnInit(): void {
    this.presence$ = this.userService.getPresence(this.user.id);
  }

  remove(): void {
    this.followingService.removeFollowing(this.user);
  }
}
