import { Component, Input } from '@angular/core';
import { PresenceEntity } from '../../ms-graph-api';

@Component({
    selector: 'app-availability',
    templateUrl: './availability.component.html',
    styleUrls: ['./availability.component.scss'],
    standalone: false
})
export class AvailabilityComponent {
  @Input()
  presence?: PresenceEntity;
}
