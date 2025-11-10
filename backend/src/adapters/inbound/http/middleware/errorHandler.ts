import { Request, Response, NextFunction } from 'express';
import {
  DomainError,
  ValidationError,
  NotFoundError,
} from '../../../../core/domain/errors/DomainErrors';

export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error:', error);

  if (error instanceof ValidationError) {
    res.status(400).json({
      error: 'Validation Error',
      message: error.message,
    });
    return;
  }

  if (error instanceof NotFoundError) {
    res.status(404).json({
      error: 'Not Found',
      message: error.message,
    });
    return;
  }

  if (error instanceof DomainError) {
    res.status(422).json({
      error: error.name,
      message: error.message,
    });
    return;
  }

  res.status(500).json({
    error: 'Internal Server Error',
    message: error.message,
  });
}
