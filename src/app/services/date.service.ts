import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  get now(): number {
    return Date.now();
  }
}
