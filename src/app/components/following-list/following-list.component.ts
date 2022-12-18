import { Component, EventEmitter, Output } from '@angular/core';
import { FollowingService } from '../../services/following.service';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.scss'],
})
export class FollowingListComponent {
  @Output()
  readonly add = new EventEmitter();

  readonly followings$ = this.followingService.followings$;

  constructor(private followingService: FollowingService) {}
}
