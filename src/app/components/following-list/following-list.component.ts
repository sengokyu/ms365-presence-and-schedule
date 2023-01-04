import { Component, Input } from '@angular/core';
import { DateService } from '../../services/date.service';
import { FollowingService } from '../../services/following.service';

@Component({
  selector: 'app-following-list',
  templateUrl: './following-list.component.html',
  styleUrls: ['./following-list.component.scss'],
})
export class FollowingListComponent {
  @Input()
  editMode!: boolean;

  readonly followings$ = this.followingService.followings$;

  readonly targetDate = this.dateService.today;

  constructor(
    private followingService: FollowingService,
    private dateService: DateService
  ) {}
}
