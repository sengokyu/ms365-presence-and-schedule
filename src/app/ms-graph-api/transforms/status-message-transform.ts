import { ExtendedPresence } from '../entities/presence.entity';
import { StatusMessageEntity } from '../entities/status-message.entity';

export class StatusMessageTransform {
  public static presence2statusMessage(
    src: ExtendedPresence | null
  ): StatusMessageEntity {
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
  }
}
