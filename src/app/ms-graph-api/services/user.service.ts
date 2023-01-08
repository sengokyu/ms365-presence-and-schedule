import { Injectable } from '@angular/core';
import { ODataClient } from 'angular-odata';
import { ScheduleInformation, ScheduleItem } from 'microsoft-graph';
import { map, Observable } from 'rxjs';
import { newDateTime } from '../../utils/date-utils';
import { PresenceEntity } from '../entities/presence.entity';
import { ScheduleItemEntity } from '../entities/schedule-item.entity';
import { StatusMessageEntity } from '../entities/status-message.entity';
import { PREFERRED_TIME_ZONE } from '../ms-graph-api.config';

@Injectable()
export class UserService {
  constructor(private client: ODataClient) {}

  // プレゼンス&ステータスメッセージを取得
  public getPresence(): Observable<PresenceEntity | null> {
    const path = `me/presence`;

    return this.client.singleton<PresenceEntity>(path, 'beta').fetchEntity();
  }

  public setStatusMessage(statusMessage: StatusMessageEntity): Observable<any> {
    const path = 'me/presence/setStatusMessage';
    const body = this.transformStatusMessage(statusMessage);

    return this.client.action(path, 'beta').call(body);
  }

  // スケジュールを取得
  public getScheduleItems(
    mail: string,
    startDate: Date
  ): Observable<ScheduleItemEntity[] | null | undefined> {
    const path = 'me/calendar/getSchedule';
    const param = this.createScheduleInfoParam(mail, startDate);

    return (
      this.client
        .action<any, ScheduleInformation>(path)
        // .query((q) => q.select(['scheduleItems'])) // 使えないらしい
        .callEntities(param, {
          headers: { Prefer: `outlook.timezone="${PREFERRED_TIME_ZONE}"` },
        })
        .pipe(
          map((x) =>
            x ? x[0].scheduleItems?.map(this.transformScheduleItem) : null
          )
        )
    );
  }

  private transformStatusMessage(src: StatusMessageEntity): any {
    const content =
      src.message + (src.pinned ? '<pinnednote></pinnednote>' : '');
    const expiryDateTime = src.expiryDate
      ? { dateTime: src.expiryDate.toISOString(), timeZone: 'UTC' }
      : null;

    return {
      statusMessage: {
        message: { content, contentType: 'text' },
        expiryDateTime,
      },
    };
  }

  private createScheduleInfoParam(mail: string, startDate: Date): any {
    return {
      schedules: [mail],
      startTime: {
        dateTime: startDate.toISOString(),
        timeZone: 'UTC',
      },
      endTime: {
        dateTime: newDateTime(startDate, 23, 59, 59).toISOString(),
        timeZone: 'UTC',
      },
    };
  }

  private transformScheduleItem(src: ScheduleItem): ScheduleItemEntity {
    return {
      ...src,
      startDateTime: src.start?.dateTime
        ? new Date(src.start?.dateTime)
        : undefined,
      endDateTime: src.end?.dateTime ? new Date(src.end?.dateTime) : undefined,
    };
  }
}
