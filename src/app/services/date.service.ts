import { Injectable } from '@angular/core';
import { newDateTime } from '../utils/date-utils';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  get today(): Date {
    return newDateTime(new Date());
  }

  get now(): number {
    return Date.now();
  }
}
