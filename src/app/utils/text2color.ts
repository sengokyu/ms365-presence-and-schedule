interface colors {
  color: string;
  oppositeColor: string;
}

const first3bytes = (src: string): Array<number> =>
  src
    .split('')
    .map((c) => c.charCodeAt(0) % 256)
    .concat(0, 0, 0) // 足りないとき用
    .slice(0, 3);

const increaseBrightness = (src: Array<number>): Array<number> => {
  const max = Math.max(...src);
  const rate = 255 / max;
  return src.map((x) => Math.floor(x * rate));
};

const increaseSaturation = (src: Array<number>): Array<number> => {
  // RGB最大値はそのまま、他は3倍にする
  const max = Math.max(...src);
  return src.map((x) => (x === max || x > 85 ? x : x * 3));
};

const oppositeColor = (src: Array<number>): Array<number> =>
  src.map((x) => 255 - x);

const format = (src: Array<number>): string => 'rgb(' + src.join(',') + ')';

export const text2Color = (src: string): colors => {
  // 文字列から色を決める
  const rgb = increaseSaturation(increaseBrightness(first3bytes(src)));
  const oppRgb = oppositeColor(rgb);

  return {
    color: format(rgb),
    oppositeColor: format(oppRgb),
  };
};
