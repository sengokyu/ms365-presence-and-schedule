import { BUSINESS_END_TIME, BUSINESS_START_TIME } from '../../app-const';
import { newDateTime, nextBusinessDate } from '../../utils/date-utils';

const TIME_FORMAT = new Intl.DateTimeFormat('default', {
  hour: '2-digit',
  minute: '2-digit',
});
const DATE_FORMAT = new Intl.DateTimeFormat('default', {
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const generateExpiryDateOptions = (
  now: Date
): Array<{ value: Date; label: string }> => {
  const result: Array<{ value: Date; label: string }> = [];

  // 週末はスキップ
  if (now.getDay() % 6 !== 0) {
    const start = Math.max(now.getHours() + 1, BUSINESS_START_TIME.hour);

    for (let i = start; i <= BUSINESS_END_TIME.hour; i++) {
      const value = newDateTime(now, i);
      result.push({ value, label: TIME_FORMAT.format(value) });
    }
  }

  // const nextDay = nextBusinessDate(now);
  // for (let i = BUSINESS_START_TIME.hour; i <= BUSINESS_END_TIME.hour; i++) {
  //   const value = newDateTime(nextDay, i);
  //   result.push({ value, label: dateFormat.format(value) });
  // }

  return result;
};
