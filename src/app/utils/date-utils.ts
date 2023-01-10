const calcTime = (hours: number, minutes?: number, seconds?: number): number =>
  hours * 60 * 60 * 1000 + (minutes ?? 0) * 60 * 1000 + (seconds ?? 0) * 1000;

// 1時間(msec)
export const A_HOUR_IN_MM = 60 * 60 * 1000;

export const newDateTime = (
  src: Date,
  hours?: number,
  minutes?: number,
  seconds?: number
): Date => {
  const newDate = new Date(src.getFullYear(), src.getMonth(), src.getDate());

  if (hours !== undefined) {
    newDate.setHours(hours);
  }
  if (minutes !== undefined) {
    newDate.setMinutes(minutes);
  }
  if (seconds !== undefined) {
    newDate.setSeconds(seconds);
  }

  return newDate;
};

// 週末はスキップして次の日を返す
export const nextBusinessDate = (src: Date): Date => {
  const day = src.getDay();
  const inc = day < 5 ? 1 : 8 - day;

  return new Date(src.getFullYear(), src.getMonth(), src.getDate() + inc);
};

// 平日かどうかを返す
export const isBusinessDay = (src: Date): boolean => src.getDay() % 6 !== 0;
