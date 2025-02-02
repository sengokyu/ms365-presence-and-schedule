import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { debounceTime, Subscription } from 'rxjs';
import { UsersService } from '../../ms-graph-api';
import { UserEntity } from '../../ms-graph-api/entities/user.entity';
import { FollowingService } from '../../services/following.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatToolbarModule,
  ],
})
export class UserListComponent implements OnInit, OnDestroy, AfterViewInit {
  private readonly subscription = new Subscription();

  readonly needle = new FormControl('');
  readonly displayColumns = ['_dummy', 'displayName', 'department', 'mail']; // 表示対象列

  dataSource?: MatTableDataSource<UserEntity>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usersService: UsersService,
    private followingService: FollowingService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.usersService.getUsers().subscribe((x) => {
        this.dataSource = new MatTableDataSource(x);
      }),
    );

    //  フィルタセット
    this.subscription.add(
      this.needle.valueChanges.pipe(debounceTime(100)).subscribe((needle) => {
        this.setFilter(needle);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.sort = this.sort;
    }
  }

  onRowClick(row: UserEntity): void {
    this.followingService.addFollowing(row);
  }

  private setFilter(needle: string | null): void {
    if (this.dataSource) {
      this.dataSource.filter = needle?.trim() ?? '';
    }
  }
}
