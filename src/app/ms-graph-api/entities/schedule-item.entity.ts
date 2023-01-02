import { ScheduleItem } from 'microsoft-graph';

export interface ScheduleItemEntity extends ScheduleItem {
  endDateTime?: Date;
  startDateTime?: Date;
}
