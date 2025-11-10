export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface FilterParams {
  [key: string]: string | number | boolean | undefined;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
