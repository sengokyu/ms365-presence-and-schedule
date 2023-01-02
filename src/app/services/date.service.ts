import { Injectable } from '@angular/core';
import { BUSINESS_END_TIME, BUSINESS_START_TIME } from '../app-const';
import { BusinessTimeEntity } from '../entities/business-time.entity';
import { newDateTime } from '../utils/date-utils';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  get businessTime(): BusinessTimeEntity {
    const now = new Date();

    return {
      midNight: newDateTime(now),
      // businessStart: newDateTime(
      //   now,
      //   BUSINESS_START_TIME.hour,
      //   BUSINESS_START_TIME.minute
      // ),
      // businessEnd: newDateTime(
      //   now,
      //   BUSINESS_END_TIME.hour,
      //   BUSINESS_END_TIME.minute
      // ),
    };
  }

  get now(): number {
    return Date.now();
  }
}
