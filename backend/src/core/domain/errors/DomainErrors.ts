export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}

export class InsufficientBankBalanceError extends DomainError {
  constructor(shipId: string, available: number, requested: number) {
    super(
      `Ship ${shipId} has insufficient banked balance. Available: ${available}, Requested: ${requested}`
    );
    this.name = 'InsufficientBankBalanceError';
  }
}

export class NegativeBankingError extends DomainError {
  constructor(shipId: string) {
    super(`Cannot bank negative compliance balance for ship ${shipId}`);
    this.name = 'NegativeBankingError';
  }
}

export class InvalidPoolError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidPoolError';
  }
}
