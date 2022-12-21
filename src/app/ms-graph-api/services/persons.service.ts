import { Injectable } from '@angular/core';
import { ODataClient, ODataEntitySetService } from 'angular-odata';
import { Person } from 'microsoft-graph';
import { Observable, map } from 'rxjs';

// 取得項目
const SELECT_FIELDS = [
  'id',
  'displayName',
  'department',
  'userPrincipalName',
  'personType',
];

// ひと/リソース一覧読み込み
@Injectable()
export class PersonsService extends ODataEntitySetService<Person> {
  private persons?: Observable<Array<Person>>;

  get persons$(): Observable<Array<Person>> {
    if (this.persons === undefined) {
      this.load();
    }

    return this.persons!;
  }

  constructor(client: ODataClient) {
    super(client, 'me/people', 'microsoft.graph.people');
  }

  private load(): void {
    this.persons = this.entities()
      .query((q) => q.select(SELECT_FIELDS))
      .fetchAll()
      .pipe(map(({ entities }) => entities));
  }
}
