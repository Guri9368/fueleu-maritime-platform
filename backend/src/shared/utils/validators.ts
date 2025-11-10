export function isPositiveNumber(value: number): boolean {
  return value > 0;
}

export function isValidYear(year: number): boolean {
  const currentYear = new Date().getFullYear();
  return year >= 2020 && year <= currentYear + 10;
}

export function isValidShipId(shipId: string): boolean {
  return shipId.length > 0 && shipId.length <= 100;
}

export function isNonEmptyString(value: string): boolean {
  return typeof value === 'string' && value.trim().length > 0;
}
