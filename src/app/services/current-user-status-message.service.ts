import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { StatusMessageEntity, UserService } from '../ms-graph-api';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserStatusMessageService {
  private statusMessage = new BehaviorSubject<
    StatusMessageEntity | null | undefined
  >(undefined);

  statusMessage$ = this.statusMessage.asObservable();

  constructor(private userService: UserService) {}

  public load(): void {
    this.userService
      .getPresence()
      .pipe(take(1))
      .subscribe((x) => {
        this.statusMessage.next(x?.statusMessage);
      });
  }

  public save(statusMessage: StatusMessageEntity): Observable<any> {
    return this.userService.setStatusMessage(statusMessage).pipe(
      take(1),
      tap(() => {
        this.load();
      })
    );
  }
}
