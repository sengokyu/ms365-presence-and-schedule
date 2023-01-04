import { Injectable } from '@angular/core';
import { LocalStorageService } from '@practical-angular/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserEntity } from '../ms-graph-api';

const STORAGE_KEY = 'followings';

// フォロー中のユーザ
@Injectable({
  providedIn: 'root',
})
export class FollowingService {
  private readonly _followings = new BehaviorSubject<Array<UserEntity>>([]);

  public get followings$(): Observable<Array<UserEntity>> {
    return this._followings.asObservable();
  }

  constructor(private localStorageService: LocalStorageService) {
    this.loadFollowings();
  }

  public addFollowing(user: UserEntity): void {
    if (!this.isFollowingExists(user)) {
      const followings = this._followings.value;
      followings.push(user);
      this.setFollowings(followings);
    }
  }

  public removeFollowing(user: UserEntity): void {
    const index = this.findFollowing(user);

    if (0 <= index) {
      const followings = this._followings.getValue();
      console.log(followings);
      followings.splice(index, 1);
      this.setFollowings(followings);
    }
  }

  private loadFollowings(): void {
    this._followings.next(
      this.localStorageService.getItem(STORAGE_KEY, []) ?? []
    );
  }

  private isFollowingExists(user: UserEntity): boolean {
    return 0 <= this.findFollowing(user);
  }

  private findFollowing(user: UserEntity): number {
    return this._followings.value.findIndex((x) => x.id === user.id);
  }

  private setFollowings(value: Array<UserEntity>): void {
    this.localStorageService.setItem(STORAGE_KEY, value);
    this._followings.next(value);
  }
}
