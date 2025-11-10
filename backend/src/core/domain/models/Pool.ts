export interface Pool {
  id: number;
  year: number;
  createdAt: Date;
}

export interface PoolMember {
  id: number;
  poolId: number;
  shipId: string;
  cbBefore: number;
  cbAfter: number;
}

export interface PoolCreationRequest {
  year: number;
  members: PoolMemberInput[];
}

export interface PoolMemberInput {
  shipId: string;
  cbBefore: number;
}

export interface PoolResult {
  poolId: number;
  year: number;
  members: PoolMember[];
  isValid: boolean;
  totalCbBefore: number;
  totalCbAfter: number;
}

