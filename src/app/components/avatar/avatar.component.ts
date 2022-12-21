import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { text2Color } from 'src/app/utils/text2color';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../ms-graph-api';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input()
  user!: UserModel;

  // revokeObjectURLへ渡すため、オリジナルのobjectURLも持っていく
  imgSrc$?: Observable<{ safeUrl: SafeUrl; objectUrl: string } | null>;

  constructor(
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {}

  get displayName(): string {
    return this.user.displayName;
  }

  get textStyle(): string {
    // 名前から色を決める
    const colors = text2Color(this.user.displayName);

    return `background-color: ${colors.color}; color: ${colors.oppositeColor};`;
  }

  ngOnInit(): void {
    // 画像があれば画像を表示、なければ名前を表示
    this.imgSrc$ = this.userService.getProfilePhoto(this.user.id).pipe(
      map((x) => {
        if (x === null) {
          return null;
        }
        const objectUrl = URL.createObjectURL(x);
        return {
          safeUrl: this.sanitizer.bypassSecurityTrustUrl(objectUrl),
          objectUrl,
        };
      })
    );
  }

  revokeObjectURL(objectUrl: string): void {
    URL.revokeObjectURL(objectUrl);
  }
}
