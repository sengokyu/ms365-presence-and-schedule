import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ODataClient, ODataEntitySetService } from 'angular-odata';
import { User } from 'microsoft-graph';
import { map, Observable } from 'rxjs';

const SELECT_FIELDS = ['id', 'displayName', 'department', 'email']; // 取得項目

@Injectable()
export class UsersService extends ODataEntitySetService<User> {
  private users?: Observable<Array<User>>;

  constructor(client: ODataClient) {
    super(client, 'users', 'microsoft.graph.user');
  }

  get users$(): Observable<Array<User>> {
    if (this.users === undefined) {
      this.load();
    }

    return this.users!;
  }

  private load(): void {
    const headers = new HttpHeaders({ ConsistencyLevel: 'eventual' });

    this.users = this.entities()
      .query((q) => q.filter("userType ne 'Guest'"))
      .query((q) => q.select(SELECT_FIELDS))
      .fetchAll({ headers, withCount: true })
      .pipe(map(({ entities }) => entities));
  }
}
