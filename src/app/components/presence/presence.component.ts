import { Component, Input } from '@angular/core';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-presence',
  templateUrl: './presence.component.html',
  styleUrls: ['./presence.component.scss'],
})
export class PresenceComponent {
  @Input()
  user!: UserModel;
}
