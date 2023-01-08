import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take, Observable, tap } from 'rxjs';
import {
  StatusMessageEntity,
  StatusMessageTransform,
  UserService,
} from '../ms-graph-api';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserStatusMessageService {
  private statusMessage = new BehaviorSubject<StatusMessageEntity | undefined>(
    undefined
  );

  statusMessage$ = this.statusMessage.asObservable();

  constructor(private userService: UserService) {}

  public load(): void {
    this.userService
      .getPresence()
      .pipe(take(1))
      .pipe(map(StatusMessageTransform.presence2statusMessage))
      .subscribe((x) => {
        this.statusMessage.next(x);
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
