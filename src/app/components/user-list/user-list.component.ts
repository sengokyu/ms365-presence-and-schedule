import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Subscription } from 'rxjs';
import { UserService } from '../../ms-graph-api';
import { FollowingService } from '../../services/following.service';
import { transformUser } from '../../transforms/transform-user';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly subscription = new Subscription();

  readonly displayColumns = ['_dummy', 'displayName', 'department']; // 表示対象列
  readonly dataSource = new MatTableDataSource<UserModel>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private followingService: FollowingService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.userService.users$.pipe(map(transformUser)).subscribe((x) => {
        this.dataSource.data = x;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onRowClick(row: UserModel): void {
    this.followingService.addFollowing(row);
  }
}
