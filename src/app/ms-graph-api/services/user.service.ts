import { Injectable } from '@angular/core';
import { ODataClient } from 'angular-odata';
import { catchError, Observable, of } from 'rxjs';

const PHOTO_SIZE = '48x48'; // image size

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
}
