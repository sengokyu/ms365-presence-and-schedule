import { Component, Input } from '@angular/core';
import { PresenceEntity } from '../../ms-graph-api';

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.scss'],
})
export class StatusMessageComponent {
  @Input()
  presence?: PresenceEntity;

  get statusMessage(): string | undefined {
    return this.presence?.statusMessage?.message.content.replace(
      /<pinnednote><\/pinnednote>$/,
      ''
    );
  }
}
