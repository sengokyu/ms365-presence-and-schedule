import { generateExpiryDateOptions } from './expiry-date-options';

describe('ExpiryDateOptions', () => {
  it('有効期間の選択肢を返す', () => {
    // Given
    const now = new Date('2022-06-04T00:00:00');

    // When
    const actual = generateExpiryDateOptions(now);

    // Then
    expect(actual).toBe([]);
  });
});
