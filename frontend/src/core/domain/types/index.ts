export interface RouteComparison {
  baseline: any;
  comparisons: Array<{
    route: any;
    baselineIntensity: number;
    comparisonIntensity: number;
    percentDiff: number;
    compliant: boolean;
  }>;
  targetIntensity: number;
}
