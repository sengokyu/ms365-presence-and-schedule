import { Injectable } from '@angular/core';
import { ODataClient } from 'angular-odata';
import { Presence, ScheduleInformation } from 'microsoft-graph';
import { catchError, map, Observable, of } from 'rxjs';
import { AvailabilityEntity } from '../entities/availability.entity';

const PHOTO_SIZE = '48x48'; // image size
const TIME_ZONE = 'Tokyo Standard Time';

@Injectable()
export class UserService {
  constructor(private client: ODataClient) {}

  // プロファイル写真を取得
  // 404のときはnull
  public getProfilePhoto(userId: string): Observable<Blob | null> {
    const path = `users/${userId}/photos/${PHOTO_SIZE}/$value`;
    const resource = this.client.singleton(path);

    return this.client.get(resource, { responseType: 'blob' }).pipe(
      catchError((err) => {
        return of(null) as Observable<Blob | null>;
      })
    );
  }

  public getAvailability(userId: string): Observable<AvailabilityEntity> {
    const path = `users/${userId}/presence`;

    return this.client
      .singleton<Presence>(path)
      .fetchEntity()
      .pipe(map((x) => x?.availability as AvailabilityEntity));
  }

  // スケジュールを取得
  public getSchedule(
    schedules: Array<string>,
    startDate: Date
  ): Observable<Array<ScheduleInformation> | null> {
    const path = 'me/calendar/getSchedule';
    const param = {
      schedules,
      startTime: {
        dateTime: startDate.toISOString(),
        timeZone: TIME_ZONE,
      },
      endTime: {
        dateTime: this.endDateTime(startDate).toISOString(),
        timeZone: TIME_ZONE,
      },
    };

    return this.client
      .action<any, ScheduleInformation>(path)
      .callEntities(param);
  }

  private endDateTime(start: Date): Date {
    return new Date(
      start.getFullYear(),
      start.getMonth(),
      start.getDate(),
      23,
      59,
      59
    );
  }
}
