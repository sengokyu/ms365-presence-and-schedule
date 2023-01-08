import { ExtendedPresence, PresenceEntity } from '../entities/presence.entity';
import { StatusMessageTransform } from './status-message-transform';

export class PresenceTransform {
  public static presence2entity(
    src: ExtendedPresence | null
  ): PresenceEntity | null {
    return src === null
      ? null
      : {
          ...src,
          statusMessage: StatusMessageTransform.presence2statusMessage(src),
        };
  }
}
