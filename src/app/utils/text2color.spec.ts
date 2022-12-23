import { text2Color } from './text2color';

describe('text2color', () => {
  it('適当な文字列から、rgb()の表現を生成する', () => {
    // Given
    const src = 'abcdefgi';

    // When
    const actual = text2Color(src);

    // Then
    // [97, 98, 99] <- charcode of a,b,c
    const expected = {
      color: 'rgb(249,252,254)',
      oppositeColor: 'rgb(6,3,1)',
    };

    expect(actual).toBe(expected);
  });
});
