import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ODataClient, ODataEntitySetService } from 'angular-odata';
import { User } from 'microsoft-graph';
import { map, Observable } from 'rxjs';
import { UserEntity } from '../entities/user.entity';

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
      .fetchAll({ headers, withCount: true })
      .pipe(map(({ entities }) => entities.map(transform)));
  }
}
