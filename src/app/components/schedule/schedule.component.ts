import { Component, Input, OnInit } from '@angular/core';
import { ScheduleItem } from 'microsoft-graph';
import { Observable } from 'rxjs';
import { A_HOUR_IN_MM } from 'src/app/utils/date-utils';
import {
  ScheduleItemEntity,
  UserEntity,
  UserService,
} from '../../ms-graph-api';

// 1時間の表示幅（マージン込み）
const WIDTH_OF_HOUR = 32;
// 1スケジュールアイテム表示高さ（マージン込み）
const HEIGHT_OF_ITEM = 28;
//
const MARGIN_OF_ITEMS = 32;

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent implements OnInit {
  @Input()
  user!: UserEntity;

  @Input()
  targetDate!: Date;

  // 背景の列
  hours = [
    '0',
    '',
    '',
    '3',
    '',
    '',
    '6',
    '',
    '',
    '9',
    '',
    '',
    '12',
    '',
    '',
    '15',
    '',
    '',
    '18',
    '',
    '',
    '21',
    '',
    '',
  ];

  scheduleItems$?: Observable<ScheduleItem[] | null | undefined>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.scheduleItems$ = this.userService.getScheduleItems(
      this.user.mail,
      this.targetDate
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
        24
      ) - this.calcStartPos(scheduleItem);

    return `${endPos * WIDTH_OF_HOUR}px`;
  }

  calcStartPos(scheduleItem: ScheduleItemEntity): number {
    return Math.max(
      0,
      (scheduleItem.startDateTime!.getTime() - this.targetDate.getTime()) /
        A_HOUR_IN_MM
    );
  }
}
