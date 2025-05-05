import { Player } from "@/core/entities/player";
import { ActionNotPermittedError } from "@/core/errors/action-not-permitted-error";
import { ResourceNotFoundError } from "@/core/errors/resource-not-found-error";
import { IExpelPlayerUseCase } from "@/core/interfaces/expel-player-use-case";
import { ITablesRepository } from "@/repositories/tables-repository";

export class ExpelPlayerUseCase {
  constructor(private tablesRepository: ITablesRepository) {}

  async execute({ playerName, token }: IExpelPlayerUseCase): Promise<{
    players: Player[];
  }> {
    const response = await this.tablesRepository.findByToken({ token });

    if (!response) {
      throw new ResourceNotFoundError("Table not found");
    }

    const table = response.table;

    if (table.isLocked) {
      throw new ActionNotPermittedError(
        "Cannot expel players after the game has started"
      );
    }

    const playerIndex = table.players.findIndex(
      (player) => player.name === playerName
    );

    if (playerIndex === -1) {
      throw new ResourceNotFoundError("Player not found");
    }

    table.players.splice(playerIndex, 1);
    await this.tablesRepository.save({ table });

    return { players: table.players };
  }
}
