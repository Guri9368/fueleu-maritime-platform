export interface ShipCompliance {
  id: number;
  shipId: string;
  year: number;
  cbGco2eq: number;
}

export interface ComplianceResult {
  shipId: string;
  year: number;
  actualIntensity: number;
  targetIntensity: number;
  energyMJ: number;
  complianceBalance: number;
}
