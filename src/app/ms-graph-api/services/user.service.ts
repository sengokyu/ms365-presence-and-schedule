import { Injectable } from '@angular/core';
import { ODataClient } from 'angular-odata';
import { Presence, ScheduleInformation, ScheduleItem } from 'microsoft-graph';
import { catchError, map, Observable, of } from 'rxjs';
import { PresenceEntity } from '../entities/presence.entity';
import { PHOTO_SIZE, PREFERRED_TIME_ZONE } from '../ms-graph-api.config';
import { ScheduleItemEntity } from '../entities/schedule-item.entity';

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

  // プレゼンス&ステータスメッセージを取得
  public getPresence(userId: string): Observable<PresenceEntity> {
    const path = `users/${userId}/presence`;

    return this.client
      .singleton<Presence>(path, 'beta')
      .fetchEntity() as Observable<PresenceEntity>;
  }

  // スケジュールを取得
  public getScheduleItems(
    mail: string,
    startDate: Date
  ): Observable<ScheduleItemEntity[] | null | undefined> {
    const path = 'me/calendar/getSchedule';
    const param = {
      schedules: [mail],
      startTime: {
        dateTime: startDate.toISOString(),
        timeZone: PREFERRED_TIME_ZONE,
      },
      endTime: {
        dateTime: this.endDateTime(startDate).toISOString(),
        timeZone: PREFERRED_TIME_ZONE,
      },
    };

    return this.client
      .action<any, ScheduleInformation>(path)
      .callEntities(param, {
        headers: { Prefer: `outlook.timezone="${PREFERRED_TIME_ZONE}"` },
      })
      .pipe(
        map((x) =>
          x ? x[0].scheduleItems?.map(this.transformScheduleItem) : null
        )
      );
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

  private transformScheduleItem(src: ScheduleItem): ScheduleItemEntity {
    const dst = src as ScheduleItemEntity;
    dst.startDateTime = src.start?.dateTime
      ? new Date(src.start?.dateTime)
      : undefined;
    dst.endDateTime = src.end?.dateTime
      ? new Date(src.end?.dateTime)
      : undefined;
    return dst;
  }
}
