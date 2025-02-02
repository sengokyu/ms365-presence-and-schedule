import { ScheduleItem } from '@microsoft/microsoft-graph-types-beta';

export const scheduleItem2ScheduleItemEntity = (src: ScheduleItem) => ({
  ...src,
  startDateTime: src.start?.dateTime
    ? new Date(src.start?.dateTime)
    : undefined,
  endDateTime: src.end?.dateTime ? new Date(src.end?.dateTime) : undefined,
});
