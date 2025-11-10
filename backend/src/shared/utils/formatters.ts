export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

export function formatCurrency(value: number): string {
  return `${value.toFixed(2)} gCO₂e`;
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatDate(date: Date): string {
  return date.toISOString();
}
