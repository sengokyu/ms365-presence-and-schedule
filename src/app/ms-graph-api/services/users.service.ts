import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Presence } from '@microsoft/microsoft-graph-types-beta';
import { ODataClient, ODataEntitySetService } from 'angular-odata';
import { User } from 'microsoft-graph';
import { catchError, map, Observable, of } from 'rxjs';
import { UserEntity } from '../entities/user.entity';
import { PHOTO_SIZE } from '../ms-graph-api.config';
import { PresenceEntity } from '../entities/presence.entity';
import { presence2presenceEntity } from '../transforms/presence-transform';

const SELECT_FIELDS = [
  'id',
  'displayName',
  'department',
  'mail',
  'userPrincipalName',
]; // 取得項目

const transform = (src: User): UserEntity => ({
  id: src.id!,
  displayName: src.displayName!,
  department: src.department!,
  mail: src.mail!,
  userPrincipalName: src.userPrincipalName!,
});

@Injectable()
export class UsersService extends ODataEntitySetService<User> {
  constructor(client: ODataClient) {
    super(client, 'users', 'microsoft.graph.user');
  }

  public getUsers(): Observable<Array<UserEntity>> {
    const headers = new HttpHeaders({ ConsistencyLevel: 'eventual' });

    return this.entities()
      .query((q) => q.filter("userType ne 'Guest'"))
      .query((q) => q.select(SELECT_FIELDS))
      .query((q) => q.orderBy('displayName'))
      .fetchAll({ headers, withCount: true })
      .pipe(map(({ entities }) => entities.map(transform)));
  }

  // プロファイル写真を取得
  // 404のときはnull
  public getProfilePhoto(userId: string): Observable<Blob | null> {
    const path = `users/${userId}/photos/${PHOTO_SIZE}/$value`;
    const resource = this.client.singleton(path);

    return this.client.get(resource, { responseType: 'blob' }).pipe(
      catchError((err) => {
        return of(null) as Observable<Blob | null>;
      }),
    );
  }

  // プレゼンス&ステータスメッセージを取得
  public getPresence(userId: string): Observable<PresenceEntity | null> {
    const path = `users/${userId}/presence`;

    return this.client
      .singleton<Presence>(path, 'beta')
      .fetchEntity()
      .pipe(map(presence2presenceEntity));
  }
}
