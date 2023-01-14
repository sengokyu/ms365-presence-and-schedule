import { Injectable } from '@angular/core';
import { LocalStorageService } from '@practical-angular/local-storage';
import { BehaviorSubject } from 'rxjs';

export type UpdateIntervalType = 1 | 3 | 10;

const STORAGE_KEY = 'updateInterval';
const DEFAULT_UPDATE_INTERVAL: UpdateIntervalType = 1;

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly _updateInterval = new BehaviorSubject<UpdateIntervalType>(1);

  updateInterval$ = this._updateInterval.asObservable();

  public set updateInterval(value: UpdateIntervalType) {
    this.localStorageService.setItem(STORAGE_KEY, value);
    this._updateInterval.next(value);
  }

  constructor(private localStorageService: LocalStorageService) {
    this.load();
  }

  private load(): void {
    this._updateInterval.next(
      this.localStorageService.getItem(STORAGE_KEY, DEFAULT_UPDATE_INTERVAL) ??
        DEFAULT_UPDATE_INTERVAL
    );
  }
}
