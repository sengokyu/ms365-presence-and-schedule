import { Injectable } from '@angular/core';
import { Presence } from '@microsoft/microsoft-graph-types-beta';
import { ODataClient } from 'angular-odata';
import { ScheduleInformation } from 'microsoft-graph';
import { map, Observable } from 'rxjs';
import { newDateTime } from '../../utils/date-utils';
import { PresenceEntity } from '../entities/presence.entity';
import { ScheduleItemEntity } from '../entities/schedule-item.entity';
import { StatusMessageEntity } from '../entities/status-message.entity';
import { PREFERRED_TIME_ZONE } from '../ms-graph-api.config';
import { presence2presenceEntity } from '../transforms/presence-transform';
import { scheduleItem2ScheduleItemEntity } from '../transforms/schedule-item-transform';
import { statusMessageEntity2Presence } from '../transforms/status-message-transform';

@Injectable()
export class UserService {
  constructor(private client: ODataClient) {}

  // プレゼンス&ステータスメッセージを取得
  public getPresence(): Observable<PresenceEntity | null> {
    const path = `me/presence`;

    return this.client
      .singleton<Presence>(path, 'beta')
      .fetchEntity()
      .pipe(map(presence2presenceEntity));
  }

  public setStatusMessage(statusMessage: StatusMessageEntity): Observable<any> {
    const path = 'me/presence/setStatusMessage';
    const body = statusMessageEntity2Presence(statusMessage);

    return this.client.action(path, 'beta').call(body);
  }

  // スケジュールを取得
  public getScheduleItems(
    mail: string,
    startDate: Date,
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
            x ? x[0].scheduleItems?.map(scheduleItem2ScheduleItemEntity) : null,
          ),
        )
    );
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
}
