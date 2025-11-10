export class ComplianceBalance {
  private readonly value: number;

  constructor(value: number) {
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  isDeficit(): boolean {
    return this.value < 0;
  }

  isSurplus(): boolean {
    return this.value > 0;
  }

  isCompliant(): boolean {
    return this.value >= 0;
  }

  add(other: ComplianceBalance): ComplianceBalance {
    return new ComplianceBalance(this.value + other.getValue());
  }

  subtract(other: ComplianceBalance): ComplianceBalance {
    return new ComplianceBalance(this.value - other.getValue());
  }
}
