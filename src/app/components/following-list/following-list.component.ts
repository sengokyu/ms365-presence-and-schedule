import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { UserEntity } from '../../ms-graph-api';
import { DateService } from '../../services/date.service';
import { FollowingService } from '../../services/following.service';
import { PresenceComponent } from '../presence/presence.component';

@Component({
  selector: 'app-following-list',
  imports: [
    AsyncPipe,
    CdkDrag,
    CdkDropList,
    MatButtonModule,
    PresenceComponent,
  ],
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
    private dateService: DateService,
  ) {}

  remove(user: UserEntity): void {
    this.followingService.removeFollowing(user);
  }

  drop(event: CdkDragDrop<Array<UserEntity>>): void {
    this.followingService.organize(event.previousIndex, event.currentIndex);
  }
}
