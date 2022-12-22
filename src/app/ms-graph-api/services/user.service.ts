import { Injectable } from '@angular/core';
import { ODataClient } from 'angular-odata';
import { NullableOption, Presence } from 'microsoft-graph';
import { catchError, map, Observable, of } from 'rxjs';

const PHOTO_SIZE = '48x48'; // image size

export type Availability = NullableOption<
  | 'Available'
  | 'AvailableIdle'
  | 'Away'
  | 'BeRightBack'
  | 'Busy'
  | 'BusyIdle'
  | 'DoNotDisturb'
  | 'Offline'
  | 'PresenceUnknown'
>;

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

  public getAvailability(userId: string): Observable<Availability> {
    const path = `users/${userId}/presence`;

    return this.client
      .singleton<Presence>(path)
      .fetchEntity()
      .pipe(map((x) => x?.availability as Availability));
  }
}
