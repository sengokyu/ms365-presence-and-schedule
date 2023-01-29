import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, first, map, Observable, of } from 'rxjs';
import { UserEntity } from '../ms-graph-api';

interface TableValue {
  followings: string; // JSON serialized string
}

// フォロー中のユーザ
@Injectable({
  providedIn: 'root',
})
export class FollowingService {
  private readonly _followings = new BehaviorSubject<Array<UserEntity>>([]);

  public readonly followings$ = this._followings.asObservable();

  constructor(private http: HttpClient) {
    this.loadFollowings();
  }

  public addFollowing(user: UserEntity): void {
    if (this.isFollowingExists(user)) {
      return;
    }

    const followings = this._followings.value;
    followings.push(user);
    this.setFollowings(followings);
  }

  public removeFollowing(user: UserEntity): void {
    const index = this.findFollowing(user);

    if (0 <= index) {
      const followings = this._followings.getValue();
      followings.splice(index, 1);
      this.setFollowings(followings);
    }
  }

  private loadFollowings(): void {
    this.getFromTable().subscribe((x) => this._followings.next(x));
  }

  private isFollowingExists(user: UserEntity): boolean {
    return 0 <= this.findFollowing(user);
  }

  private findFollowing(user: UserEntity): number {
    return this._followings.value.findIndex((x) => x.id === user.id);
  }

  private setFollowings(value: Array<UserEntity>): void {
    this.setToTable(value).subscribe(() => {
      this._followings.next(value);
    });
  }

  private getFromTable(): Observable<Array<UserEntity>> {
    return this.http.get<TableValue>(FOLLOWINGS_API_URL).pipe(
      first(),
      map((x) => JSON.parse(x.followings) as Array<UserEntity>),
      catchError((_) => of([]))
    );
  }

  private setToTable(value: Array<UserEntity>): Observable<unknown> {
    const body: TableValue = { followings: JSON.stringify(value) };

    return this.http.post(FOLLOWINGS_API_URL, body, { responseType: 'text' });
  }
}
