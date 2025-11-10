export interface ComplianceBalance {
  shipId: string;
  year: number;
  actualIntensity: number;
  targetIntensity: number;
  energyMJ: number;
  complianceBalance: number;
}

export interface AdjustedCB {
  originalCb: number;
  bankedAmount: number;
  adjustedCb: number;
}
