import { Presence } from '@microsoft/microsoft-graph-types-beta';
import { AvailabilityType } from './availability.type';

export interface PresenceEntity extends Presence {
  availability?: AvailabilityType;
  statusMessage?: null | {
    publishedDateTime: string;
    message: {
      content: string;
      contentType: string;
    };
    expiryDateTime: {
      dateTime: string;
      timeZone: string;
    };
  };
}
