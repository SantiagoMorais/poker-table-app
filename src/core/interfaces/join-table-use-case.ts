export interface JoinTableUseCaseRequest {
  token: string;
  playerName: string;
}

export interface JoinTableUseCaseResponse {
  tableId: string;
  playerId: string;
}
