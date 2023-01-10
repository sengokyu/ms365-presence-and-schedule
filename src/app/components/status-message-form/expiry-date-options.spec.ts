import { generateExpiryDateOptions } from './expiry-date-options';

describe('ExpiryDateOptions', () => {
  it('土曜日の場合は翌月曜日を返す', () => {
    // Given
    const now = new Date('2022-06-04T00:00:00');

    // When
    const actual = generateExpiryDateOptions(now);

    // Then
    const expected = [
      { value: new Date(2022, 5, 6, 9), label: '6/6 09:00' },
      { value: new Date(2022, 5, 6, 10), label: '6/6 10:00' },
      { value: new Date(2022, 5, 6, 11), label: '6/6 11:00' },
      { value: new Date(2022, 5, 6, 12), label: '6/6 12:00' },
      { value: new Date(2022, 5, 6, 13), label: '6/6 13:00' },
      { value: new Date(2022, 5, 6, 14), label: '6/6 14:00' },
      { value: new Date(2022, 5, 6, 15), label: '6/6 15:00' },
      { value: new Date(2022, 5, 6, 16), label: '6/6 16:00' },
      { value: new Date(2022, 5, 6, 17), label: '6/6 17:00' },
      { value: new Date(2022, 5, 6, 18), label: '6/6 18:00' },
    ];
    expect(actual).toEqual(expected);
  });

  it('日曜日の場合も翌月曜日を返す', () => {
    // Given
    const now = new Date('2022-06-05T00:00:00');

    // When
    const actual = generateExpiryDateOptions(now);

    // Then
    expect(actual).toHaveSize(10);
    expect(actual[0]).toEqual({
      value: new Date(2022, 5, 6, 9),
      label: '6/6 09:00',
    });
  });

  it('平日は営業時間内の1時間後以降を返す', () => {
    // Given
    const now = new Date('2022-06-03T09:00:00');

    // When
    const actual = generateExpiryDateOptions(now);

    // Then
    expect(actual).toHaveSize(9 + 10);
    expect(actual[0]).toEqual({
      value: new Date(2022, 5, 3, 10),
      label: '10:00',
    });
    expect(actual[18]).toEqual({
      value: new Date(2022, 5, 6, 18),
      label: '6/6 18:00',
    });
  });
});
