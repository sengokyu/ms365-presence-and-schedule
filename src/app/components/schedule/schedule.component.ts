import { Component, Input, OnInit } from '@angular/core';
import { ScheduleItem } from 'microsoft-graph';
import { Observable, retry, timer } from 'rxjs';
import { A_HOUR_IN_MM } from 'src/app/utils/date-utils';
import {
  ScheduleItemEntity,
  UserEntity,
  UserService,
} from '../../ms-graph-api';
import { AsyncPipe, DatePipe } from '@angular/common';

// 1時間の表示幅（マージン込み）
const WIDTH_OF_HOUR = 32;
// 1スケジュールアイテム表示高さ（マージン込み）
const HEIGHT_OF_ITEM = 28;
//
const MARGIN_OF_ITEMS = 32;

@Component({
  selector: 'app-schedule',
  imports: [AsyncPipe, DatePipe],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  readonly hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];

  @Input()
  user!: UserEntity;

  @Input()
  targetDate!: Date;

  scheduleItems$?: Observable<ScheduleItem[] | null | undefined>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.scheduleItems$ = this.userService
      .getScheduleItems(this.user.mail, this.targetDate)
      .pipe(
        retry({
          delay: (_, count) => timer(count * 1000),
          resetOnSuccess: true,
        }),
      );
  }

  calcViewBox(count: number): string {
    const width = WIDTH_OF_HOUR * 24;
    const height = HEIGHT_OF_ITEM * count + 36;

    return `0 0 ${width} ${height}`;
  }

  calcTransform(scheduleItem: ScheduleItemEntity, index: number): string {
    const startPos = this.calcStartPos(scheduleItem);

    return `translate(${startPos * WIDTH_OF_HOUR} ${
      index * HEIGHT_OF_ITEM + MARGIN_OF_ITEMS
    })`;
  }

  calcWidth(scheduleItem: ScheduleItemEntity): string {
    const endPos =
      Math.min(
        (scheduleItem.endDateTime!.getTime() - this.targetDate.getTime()) /
          A_HOUR_IN_MM,
        24,
      ) - this.calcStartPos(scheduleItem);

    return `${endPos * WIDTH_OF_HOUR}px`;
  }

  calcStartPos(scheduleItem: ScheduleItemEntity): number {
    return Math.max(
      0,
      (scheduleItem.startDateTime!.getTime() - this.targetDate.getTime()) /
        A_HOUR_IN_MM,
    );
  }
}
