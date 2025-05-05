import { Player } from "@/core/entities/player";
import { PlayerAlreadyExistsError } from "@/core/errors/player-already-exists-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { TableFullError } from "@/core/errors/table-full-error";
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
    const response = await this.tablesRepository.findByToken({ token });

    if (!response) {
      throw new ResourceNotFoundError("Table not found");
    }

    const table = response.table;

    if (table.players.length >= 8) {
      throw new TableFullError(8);
    }

    const playerAlreadyExists = table.players.some(
      (player) => player.name === playerName
    );

    if (playerAlreadyExists) {
      throw new PlayerAlreadyExistsError();
    }

    const player = new Player(playerName, false, token);
    table.addPlayer(player);

    return {
      tableId: table.id,
      playerId: player.id,
    };
  }
}
