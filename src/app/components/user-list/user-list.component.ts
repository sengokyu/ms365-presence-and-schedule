import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { UsersService } from '../../ms-graph-api';
import { UserEntity } from '../../ms-graph-api/entities/user.entity';
import { FollowingService } from '../../services/following.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly subscription = new Subscription();

  readonly displayColumns = ['_dummy', 'displayName', 'department']; // 表示対象列
  readonly dataSource = new MatTableDataSource<UserEntity>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usersService: UsersService,
    private followingService: FollowingService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.usersService.getUsers().subscribe((x) => {
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

  onRowClick(row: UserEntity): void {
    this.followingService.addFollowing(row);
  }
}
