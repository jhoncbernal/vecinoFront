export function checkEmptyFields(obj: {
  [key: string]: any;
}): { [key: string]: boolean } {
  const result: { [key: string]: boolean } = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key] = value === undefined || value === "";
  }
  return result;
}

export function createNumberRangeRegex(min: number, max: number): RegExp {
  return new RegExp(`^(${min}|[1-9]\\d{0,2}|[1-9]\\d{0,2}\\d{0,2}|${max})$`);
}

export function isAnyFieldEmpty(obj: { [key: string]: any }): boolean {
  for (const key in obj) {
    if (!obj[key] || obj[key].toString().trim() === "") {
      return true;
    }
  }
  return false;
}