import {
  Presence,
  PresenceStatusMessage,
} from '@microsoft/microsoft-graph-types-beta';
import { StatusMessageEntity } from '../entities/status-message.entity';

export const presence2statusMessageEntity = (
  src: Presence | null,
): StatusMessageEntity => {
  const publishedDateTime = src?.statusMessage?.publishedDateTime
    ? new Date(src.statusMessage.publishedDateTime)
    : undefined;
  const content = src?.statusMessage?.message?.content ?? '';
  const pinned = content.endsWith('<pinnednote></pinnednote>');
  const message = content.replace(/<pinnednote><\/pinnednote>$/, '') ?? '';
  const expiryDate =
    src?.statusMessage?.expiryDateTime?.timeZone === 'UTC'
      ? new Date(src.statusMessage.expiryDateTime.dateTime! + 'Z')
      : null;

  return { publishedDateTime, message, pinned, expiryDate };
};

export const statusMessageEntity2PresenceStatusMessage = (
  src: StatusMessageEntity,
): PresenceStatusMessage => {
  const content = src.message + (src.pinned ? '<pinnednote></pinnednote>' : '');
  const expiryDateTime = src.expiryDate
    ? { dateTime: src.expiryDate.toISOString(), timeZone: 'UTC' }
    : null;

  return {
    message: { content, contentType: 'text' },
    expiryDateTime,
  };
};
