const UNITS = ["б", "Б", "КБ", "МБ", "ГБ", "ТБ", "ПБ", "ЭБ", "ЗБ", "ЙБ"];

export function convertBits(bits: number): string {
  let value = bits;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < UNITS.length - 1) {
    value /= unitIndex === 0 ? 8 : 1024;
    unitIndex++;
  }

  return `${value.toFixed(2)} ${UNITS[unitIndex]}`;
}
