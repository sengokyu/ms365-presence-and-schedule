import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, first, of, retry } from 'rxjs';
import { catchError } from 'rxjs/operators';

export type UpdateIntervalType = 1 | 3 | 10;

export interface SettingsEntity {
  updateInterval: UpdateIntervalType;
}

const defaultSettings: SettingsEntity = {
  updateInterval: 1,
};

const apiUrl = STORAGE_API_URL + '/settings';
const apiOptions = { params: { code: FUNCTION_CODE } };

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private readonly _settings = new BehaviorSubject<SettingsEntity>(
    defaultSettings,
  );

  public readonly settings$ = this._settings.asObservable();

  public saveUpdateInterval(value: UpdateIntervalType) {
    const body = this._settings.value;
    body.updateInterval = value;
    this.save(body);
  }

  constructor(private http: HttpClient) {
    this.load();
  }

  private load(): void {
    this.http
      .get<SettingsEntity>(apiUrl, apiOptions)
      .pipe(
        first(),
        retry(2),
        catchError(() => of(defaultSettings)),
      )
      .subscribe((x) => {
        this._settings.next(x);
      });
  }

  private save(body: SettingsEntity) {
    this.http
      .post(apiUrl, body, apiOptions)
      .pipe(retry(3))
      .subscribe(() => {
        this._settings.next(body);
      });
  }
}
