import { Injectable } from '@angular/core';
import { LocalStorageService } from '@practical-angular/local-storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../models/user.model';

const STORAGE_KEY = 'followings';

// フォロー中のユーザ
@Injectable({
  providedIn: 'root',
})
export class FollowingService {
  private readonly _followings = new BehaviorSubject<Array<UserModel>>([]);

  public get followings$(): Observable<Array<UserModel>> {
    return this._followings.asObservable();
  }

  constructor(private localStorageService: LocalStorageService) {
    this._followings.next(this.getFollowings());
  }

  public addFollowing(user: UserModel): void {
    if (!this.isFollowingExists(user)) {
      const followings = this.getFollowings();
      followings.push(user);
      this.setFollowings(followings);
    }
  }

  public removeFollowing(user: UserModel): void {}

  private getFollowings(): Array<UserModel> {
    return this.localStorageService.getItem(STORAGE_KEY, []) ?? [];
  }

  private isFollowingExists(user: UserModel): boolean {
    return 0 <= this.findFollowing(user);
  }

  private findFollowing(user: UserModel): number {
    const followings = this.getFollowings();
    return followings.findIndex((x) => x.id === user.id);
  }

  private setFollowings(value: Array<UserModel>): void {
    this.localStorageService.setItem(STORAGE_KEY, value);
    this._followings.next(value);
  }
}
