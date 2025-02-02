import { Presence } from '@microsoft/microsoft-graph-types-beta';
import { StatusMessageEntity } from './status-message.entity';

// // beta版の戻り値
// export interface ExtendedPresence extends Presence {
//
//   // statusMessage?: null | {
//   //   publishedDateTime: string;
//   //   message: {
//   //     content: string;
//   //     contentType: string;
//   //   };
//   //   expiryDateTime: {
//   //     dateTime: string;
//   //     timeZone: string;
//   //   };
//   // };
// }

export interface PresenceEntity
  extends Pick<Presence, 'activity' | 'availability' | 'outOfOfficeSettings'> {
  statusMessage: StatusMessageEntity | null;
}
