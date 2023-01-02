import { Pipe, PipeTransform } from '@angular/core';
import { PresenceEntity } from '../ms-graph-api';

// ステータスメッセージのみにする
@Pipe({
  name: 'statusMessage',
})
export class StatusMessagePipe implements PipeTransform {
  transform(value?: PresenceEntity, ...args: unknown[]): string | undefined {
    return value?.statusMessage?.message?.content?.replace(
      /<pinnednote><\/pinnednote>$/,
      ''
    );
  }
}
