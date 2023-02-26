import { moveItemInArray } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  first,
  map,
  Observable,
  of,
  retry,
} from 'rxjs';
import { UserEntity } from '../ms-graph-api';

interface TableValue {
  followings: string; // JSON serialized string
}

const apiUrl = STORAGE_API_URL + '/followings';

// フォロー中のユーザ
@Injectable({
  providedIn: 'root',
})
export class FollowingService {
  private readonly _followings = new BehaviorSubject<Array<UserEntity> | null>(
    null
  );

  public readonly followings$ = this._followings.asObservable();

  constructor(private http: HttpClient) {
    this.loadFollowings();
  }

  public addFollowing(user: UserEntity): void {
    if (this.isFollowingExists(user)) {
      return;
    }

    const followings = this._followings.value ?? [];
    followings.push(user);
    this.setFollowings(followings);
  }

  public removeFollowing(user: UserEntity): void {
    const index = this.findFollowing(user);

    if (0 <= index) {
      const followings = this._followings.getValue() ?? [];
      followings.splice(index, 1);
      this.setFollowings(followings);
    }
  }

  // 位置を入れ替えます
  public organize(fromIndex: number, toIndex: number): void {
    const followings = this._followings.getValue() ?? [];

    moveItemInArray(followings, fromIndex, toIndex);

    this.setFollowings(followings);
  }

  private loadFollowings(): void {
    this.getUserEntities()
      .pipe(retry(3))
      .subscribe((x) => this._followings.next(x));
  }

  private isFollowingExists(user: UserEntity): boolean {
    return 0 <= this.findFollowing(user);
  }

  private findFollowing(user: UserEntity): number {
    const followings = this._followings.getValue() ?? [];
    return followings.findIndex((x) => x.id === user.id);
  }

  private setFollowings(value: Array<UserEntity>): void {
    this.postUserEntities(value)
      .pipe(retry(3))
      .subscribe(() => {
        this._followings.next(value);
      });
  }

  private getUserEntities(): Observable<Array<UserEntity>> {
    const options = { params: { code: FUNCTION_CODE } };

    return this.http.get<TableValue>(apiUrl, options).pipe(
      first(),
      map((x) => JSON.parse(x.followings) as Array<UserEntity>),
      catchError((_) => of([]))
    );
  }

  private postUserEntities(value: Array<UserEntity>): Observable<string> {
    const body: TableValue = { followings: JSON.stringify(value) };

    return this.http.post(apiUrl, body, {
      params: { code: FUNCTION_CODE },
      responseType: 'text',
    });
  }
}
