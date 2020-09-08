const ColorHash = require("color-hash");

export function getColor(text) {
  const colorHash = new ColorHash({ lightness: 0.6 });
  const str = text.slice(text.length - 4);
  const color = colorHash.hex(str);
  return color;
}
