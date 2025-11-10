/**
 * Base interface for all use cases
 * Use cases represent application-specific business rules
 */
export interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}

/**
 * For use cases without input parameters
 */
export interface UseCaseWithoutInput<TOutput> {
  execute(): Promise<TOutput>;
}
