import { Presence } from '@microsoft/microsoft-graph-types-beta';
import { PresenceEntity } from '../entities/presence.entity';
import { presence2statusMessageEntity } from './status-message-transform';

export const presence2presenceEntity = (
  src: Presence | null,
): PresenceEntity | null =>
  src
    ? {
        activity: src.activity,
        availability: src.availability,
        outOfOfficeSettings: src.outOfOfficeSettings,
        statusMessage: presence2statusMessageEntity(src),
      }
    : null;
