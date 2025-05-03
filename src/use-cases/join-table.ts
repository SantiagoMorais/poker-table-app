// src/use-cases/join-table.ts
import { Player } from "@/core/entities/player";
import {
  JoinTableUseCaseRequest,
  JoinTableUseCaseResponse,
} from "@/core/interfaces/join-table-use-case";
import { ITablesRepository } from "@/repositories/tables-repository";

export class JoinTableUseCase {
  constructor(private tablesRepository: ITablesRepository) {}

  async execute({
    token,
    playerName,
  }: JoinTableUseCaseRequest): Promise<JoinTableUseCaseResponse> {
    const table = await this.tablesRepository.findByToken(token);

    if (!table) {
      throw new Error("Table not found");
    }

    const playerAlreadyExists = table.players.some(
      (player) => player.name === playerName
    );

    if (playerAlreadyExists) {
      throw new Error("Player with this name already exists in the table");
    }

    const player = new Player(playerName);
    table.addPlayer(player);

    return {
      tableId: table.id,
      playerId: player.id,
    };
  }
}
