import { Presence } from '@microsoft/microsoft-graph-types-beta';
import { AvailabilityType } from './availability.type';
import { StatusMessageEntity } from './status-message.entity';

// beta版の戻り値
export interface ExtendedPresence extends Presence {
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

export interface PresenceEntity extends Presence {
  availability?: AvailabilityType;
  statusMessage?: null | StatusMessageEntity;
}
